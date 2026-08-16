---
title: bnSuspension - Configuration
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuration

The `config.lua` file is the heart of the script. Check each section below.

## 1. Language and items

```lua
Config.Locale = 'pt' -- Language ('pt' or 'en')
Config.Items = {
    StanceKit = 'stance_kit',        -- Install item name
    Controller = 'stance_controller' -- Remote controller item name
}
```

## 2. Gameplay settings

```lua
Config.InstallTime = 5000            -- Time (ms) to install the kit
Config.RemoteControlRadius = 25.0    -- Max distance to use the controller outside the vehicle
Config.DisplayStatusHud = false      -- If true, shows a small HUD when active
```

## 3. Controller animation

Customize the animation played when using the remote controller.

```lua
Config.Animation = {
    Enable = true,
    Dict = "cellphone@",
    Anim = "cellphone_text_in",
    Prop = {
        Model = "prop_amb_phone",    -- Prop model (phone/controller)
        Bone = 28422,                -- Right hand bone
        Pos = {0.0, 0.0, 0.0},       -- Position offset
        Rot = {0.0, 0.0, 0.0}        -- Rotation offset
    }
}
```

## 4. Interface (UI)

Adapt colors and text to your server's visual identity.

```lua
Config.UI = {
    Title = "Suspension",
    Brand = "Bn",                    -- Short brand text (logo)
    Colors = {
        Primary = "#f98416ff",       -- Accent color
        Background = "#111111",      -- Background
        Border = "#1a1a1a"           -- Borders
    },
    Labels = {                       -- Preset button labels
        Preset1 = "1",
        Preset2 = "2",
        Preset3 = "3"
    }
}
```

## 5. Permissions

Defines who is allowed to **INSTALL** the kit. Using the controller is free for any player.

```lua
Config.Permissions = {
    ['god'] = true,       -- ACE permission (admin)
    ['mechanic'] = true,  -- Job
    -- ['police'] = true  -- Example: allow for police
}
```

## 6. Inventory and notifications

```lua
Config.Inventory = 'ox' -- Options: 'ox', 'esx', 'qb', 'custom'

-- Fully editable notification function, to integrate with your system
Config.Notify = function(data)
    if lib and lib.notify then
        lib.notify(data) -- Uses ox_lib by default
    else
        -- Add your notification system's export here
    end
end
```

<Alert type="info">
Since the 06/2026 update, these options are now split across multiple files inside <code>config/</code> (<code>settings.lua</code>, <code>suspension.lua</code>, <code>permissions.lua</code>, <code>compatibility.lua</code>, <code>animation.lua</code>, <code>notify.lua</code>, <code>ui.lua</code>). See the Changelog for the full list of new options (suspension profiles, removal tool, admin commands, etc).
</Alert>
