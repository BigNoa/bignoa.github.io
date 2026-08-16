---
title: bnExhaust - Commands & Permissions
---

# Commands & Permissions

## Commands

| Command | Default | Description |
| --- | --- | --- |
| Tablet keybind | `F7` | Opens the bnExhaust tablet/UI. |
| Remove parts | `/removepart` | Opens the nearby vehicle part removal menu (menu mode only). |
| Mechanic panel | `/popbangdiag` | Opens the diagnostic and vehicle history panel. |
| Admin install all | `/popbangall` | Installs every supported part on the nearby vehicle without items. |
| Modification history | `/popbanglog` | Opens the full modification log for the nearest vehicle. Set to `false`/`''` to disable. |

The mechanic panel can also be opened via item:

```lua
Config.MechanicPanelItem = 'bn_diagnostic_tablet' -- false/nil to disable
```

## Permissions

```lua
Config.Permissions = {
    Enabled = true,
    AdminBypass = true,
    Jobs = {
        ['mechanic'] = 0,
        ['tuner'] = 0
    },
    -- Gang name => minimum grade (Qbox/QB only). Independent from Jobs.
    Gangs = {
        ['ballas'] = 0,
    }
}

Config.AdminJobs = {
    admin = true,
    god = true,
    support = true
}
```

When `Config.Permissions.Enabled` is on, only the configured jobs/gangs (minimum grade) can install or remove parts. `AdminBypass` lets framework admins skip that check; `AdminJobs` controls who can use admin-only commands.

## Interaction Modes

```lua
Config.InteractionMode = 'menu' -- 'target' | 'menu' | 'both'
```

| Value | Description |
| --- | --- |
| `target` | Uses `ox_target` vehicle interaction only. |
| `menu` | Uses the configured command and an `ox_lib` context menu. |
| `both` | Enables both workflows. |

## Installed Parts

Features are unlocked by installing physical parts, each saved to the vehicle's plate. Removal is dependency-aware: e.g. the ECU can't be removed while ALS, Downpipe, BOV, Intake, Injectors, Spark Plugs, Sequential Gearbox, or the LC Module still depend on it.

| Item | Label | Unlocks | Requires |
| --- | --- | --- | --- |
| `bnpops_ecu` | Sport ECU Chip | ECU menu and Stage 1. | None |
| `bnpops_als` | Anti-Lag Valve | Anti-Lag / 2-Step. | `bnpops_ecu` |
| `bnpops_downpipe` | High Flow Downpipe | Stage 2 and exhaust flow changes. | `bnpops_ecu` |
| `bnpops_bov` | Blow-off Valve | Amplified turbo valve sounds. | `bnpops_ecu` |
| `bnpops_catdelete` | Cat Delete | Higher exhaust volume cap. | `bnpops_downpipe` |
| `bnpops_straightpipe` | Straight Pipe | Maximum exhaust volume path. | `bnpops_catdelete` |
| `bnpops_headers` | Sport Headers | Deeper tone, lower heat stress. | `bnpops_downpipe` |
| `bnpops_wastegate` | External Wastegate | Louder wastegate/turbo chatter. | `bnpops_als` |
| `bnpops_intake` | Sport Intake | More pops, faster lift-off response. | `bnpops_ecu` |
| `bnpops_injectors` | Racing Injectors | Higher bang chance, larger flames. | `bnpops_ecu` |
| `bnpops_sparkplugs` | Racing Spark Plugs | More consistent pop timing. | `bnpops_ecu` |
| `bnpops_flexfuel` | Flex Fuel Kit | Larger flames, louder output, heat reduction. | `bnpops_intake` |
| `bnpops_turbo` | Turbo Upgrade | Stronger ALS/response. Required for Stage 3. | `bnpops_als` |
| `bnpops_intercooler` | Intercooler | Less heat, better launch consistency. | `bnpops_turbo` |
| `bnpops_sequential` | Sequential Gearbox | Louder shift bangs, faster clutch changes. | `bnpops_ecu` |
| `bnpops_lcmodule` | Launch Control Module | Launch Control in the ECU. | `bnpops_ecu` |
| `bnpops_lsd` | LSD Differential | Better launch traction, less wheelspin. | `bnpops_lcmodule` |
| `bn_diagnostic_tablet` | Diagnostic Tablet | Mechanic diagnostic panel. | Permission/job setup |

You can also block specific vehicle models or entire GTA vehicle classes from receiving parts:

```lua
-- Block specific vehicle models (lowercase model name).
Config.VehicleBlacklist = {
    -- 'bmx',
    -- 'faggio',
}

-- Block entire GTA vehicle classes by class ID.
-- 8 = Motorcycles  13 = Cycles  14 = Boats  15 = Helicopters  16 = Planes
Config.ClassBlacklist = {
    8, -- Motorcycles
    -- 14, -- Boats
}
```

Both lists are also respected by `/popbangall`. The class check runs client-side before the install progress bar starts, so blocked players get an instant rejection.

```lua
-- Per-player limit on custom sound presets. 0 = unlimited.
Config.MaxPresetsPerPlayer = 10

-- Connects the stage stress FuelDrain multiplier to a real fuel resource.
-- Options: 'auto', 'native', 'LegacyFuel', 'qs-fuel', 'ox_fuel', 'ps-fuel', 'esx_fuel'
Config.FuelResource = 'auto'
```
