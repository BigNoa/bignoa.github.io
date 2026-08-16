---
title: bnSuspension - Changelog
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Changelog

## 06/2026 - Major update

Complete rewrite of the internal architecture: modular configuration system, new UI controls, vehicle exclusion logic, per-model height limits, admin commands, and significant sound improvements.

### Breaking changes

**Configuration structure rebuilt.** The single `config.lua` was split into several focused files inside `config/`. If you have a customized v1 `config.lua`, you need to migrate the values to the new files:

- `config/settings.lua`: general settings (items, install time, inventory, controller binding)
- `config/suspension.lua`: height limits, camber, profiles, show modes, sound, auto-lift, enter/exit
- `config/permissions.lua`: job/group permissions and admin permissions
- `config/compatibility.lua`: vehicle class/model blacklist and decorator-based exclusions
- `config/animation.lua`: install animation settings
- `config/notify.lua`: notification system settings
- `config/ui.lua`: UI display settings

### New item: `suspension_tool`

Added the **Removal Tool** (`suspension_tool`), required to uninstall the air ride from a vehicle (when `Config.Uninstall.RequireTool = true`).

**How to register the item in your inventory**

`ox_inventory`: add to your `items.lua` (or equivalent):

```lua
['suspension_tool'] = {
    label = 'Removal Tool',
    weight = 500,
    stack = false,
    close = true,
    description = 'Tool used to remove the air ride suspension system.'
},
```

`QBCore`: add to `qb-core/shared/items.lua`:

```lua
['suspension_tool'] = {
    name = 'suspension_tool',
    label = 'Removal Tool',
    weight = 500,
    type = 'item',
    image = 'suspension_tool.png',
    unique = false,
    useable = true,
    shouldClose = true,
    description = 'Tool used to remove the air ride suspension system.'
},
```

`ESX`: via SQL on your database:

```sql
INSERT INTO `items` (`name`, `label`, `weight`) VALUES ('suspension_tool', 'Removal Tool', 500);
```

<Alert type="info">
The script registers the item as usable automatically on startup. There's no need to call <code>RegisterUsableItem</code> manually.
</Alert>

**Removal system configuration**

In `config/settings.lua`:

```lua
Config.Uninstall = {
    Enabled = true,               -- Enables or disables removal
    RequireTool = true,           -- Requires the removal tool to uninstall
    ToolItem = 'suspension_tool', -- Inventory item name
    RemoveToolOnUse = false,      -- Consumes the tool on use
    Duration = 4500,              -- Removal animation duration (ms)
    Refund = {
        Enabled = true,           -- Returns the stance_kit after removal
        Item = 'stance_kit',
        Count = 1,
        Chance = 50               -- 50% chance to return the item
    }
}
```

### What's new

**Modular configuration**: the whole config is now split into dedicated files, making it easier to find and edit specific options without touching the rest.

**Per-model height limits (`config/minheight.lua`)**: set minimum and maximum height per vehicle model to prevent the tire from clipping on specific cars.

```lua
Config.Suspension.MinHeightByModel = {
    -- ['adder'] = -0.05  -- lower limit for this model
}

Config.Suspension.MaxHeightByModel = {
    ['adder'] = 0.05,     -- this car already sits higher by default, so it's capped
    ['banshee3'] = 0.08,
}
```

**Removal tool system**: players can now uninstall the air ride using a configurable removal item, with a configurable chance of returning the stance kit.

**Admin install command**: admins can install the air ride on any vehicle without needing the item, via `/suspinstall`. Controlled by `Config.AdminPermissions`.

```lua
Config.Admin = {
    InstallCommand = 'suspinstall'  -- change the command name here if you want
}

Config.AdminPermissions = {
    ['god'] = true,
    ['admin'] = true
}
```

**Separate admin permissions list**: `Config.AdminPermissions` is now separate from `Config.Permissions`, letting you control who can use admin commands separately from who can install the kit normally.

**Decorator-based vehicle exclusion (`config/compatibility.lua`)**: if another script already manages a vehicle's suspension (e.g. `jgmechanic`), you can tell bnSuspension to ignore those vehicles by listing the decorators.

```lua
Config.Compatibility = {
    -- the /bndecorators command lists all decorators on a vehicle
    -- bnSuspension ignores any vehicle that has one of these decorators
    ExcludeByDecors = { 'jg_airride_active', 'stance_managed' }
}
```

**Per-axle control**: the UI now lets you adjust front/rear axle height independently, in addition to the unified control.

**Suspension profiles**: six ready-made profiles: **Low**, **Medium**, **High**, **Show**, **Race**, and **Drift**, each with preset height, front/rear offsets, and camber. Configurable in `config/suspension.lua`.

```lua
Config.Suspension.Profiles = {
    low    = { height = 0.15, camberFront = 0.10, camberRear = 0.12 },
    medium = { height = 0.0,  camberFront = 0.0,  camberRear = 0.0  },
    high   = { height = -0.12 },
    show   = { height = 0.0,  showMode = "stance" },
    race   = { height = -0.04, front = -0.05, rear = -0.02, camberFront = 0.04, camberRear = 0.03 },
    drift  = { height = 0.02,  front = 0.0,   rear = 0.05,  camberFront = 0.08, camberRear = 0.05 }
}
```

**Customizable camber**: fully configurable camber per profile, persisted per vehicle, adjustable from the controller UI.

**Proximity sync**: when a player enters or approaches a vehicle with an active air ride, the system announces the state to nearby players, keeping everything in sync.

**Expanded show modes**: six modes: **Stance**, **Bounce**, **Wave**, **Front**, **Rear**, and **F/R** (alternating), each with configurable range, speed, correction speed, and body force.

**Controller binding**: the controller item can now be bound to a specific vehicle by plate. With `ControllerBinding.Enabled = true`, a player's controller is paired to one vehicle at a time, with an option to rebind without leaving the vehicle.

```lua
Config.ControllerBinding = {
    Enabled = true,
    AllowRebindInVehicle = true  -- allows rebinding without leaving the vehicle
}
```

**Sound improvements**

- `pendingFadeOut` timeout management, avoiding audio glitches when sounds overlap
- Sound references are no longer deleted prematurely during fade-out
- Fully configurable sounds per event (`compressor`, `relief`, `up`, `down`)

### Improvements

- Redesigned controller UI, with a cleaner layout and more controls
- Refactored NUI events for better performance
- Improved persistence module: camber values are now correctly saved and restored per vehicle
- Added server-side utility functions to sanitize suspension profiles and camber on load
- `ExcludeByDecors` avoids conflicts with external stance scripts without needing a manual blacklist

### Fixes

- Fixed show mode not resetting body force correctly on exit
- Fixed camber not being applied after switching profiles in some cases
- Fixed controller opening incorrectly for vehicles without air ride installed
- Fixed sound playing after the air ride system was removed
