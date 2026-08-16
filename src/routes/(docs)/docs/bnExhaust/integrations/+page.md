---
title: bnExhaust - UI & Integrations
---

# UI & Integrations

## UI (Tablet)

```lua
Config.UI = {
    Title = "bnOS",
    Subtitle = "ECU IGNITION CONTROL // FX MODULE",
    Description = "ENGINE MANAGEMENT SYSTEM"
}
```

Customizable: title, subtitle, description, primary/secondary/tertiary colors, background/surface/case colors, overlay colors for 2-Step/Pops/ALS/Valet, and footer branding.

The tablet UI includes: Engineering, Telemetry/preview, Presets, Settings, Export, Dyno, ALS & Pops, Engine Audio, Air Ride, and Nitro controller modules.

## Notifications

```lua
Config.Notify = function(data)
    if lib and lib.notify then
        lib.notify(data)
    else
        print('[bnPopBang] [' .. (data.type or 'info') .. '] ' .. data.description)
    end
end
```

`data` carries `description` and `type` (`success`, `error`, or `info`). Replace the function body to integrate QBCore, ESX, or any other notification resource.

## Discord Webhook

```lua
Config.Webhook = {
    URL = "",
    BotName = "BigNoa",
    Avatar = "https://i.postimg.cc/cHP9HNG2/menor.png",
    Color = 3066993
}
```

Leave `URL` empty to disable Discord logging. Logs are sent when a part is installed, a part is removed, or an admin installs every part at once.

## Database

Tables are created and migrated automatically:

| Table | Purpose |
| --- | --- |
| `bn_vehicle_popbang_settings` | Vehicle settings: installed parts, selected sounds, intensity, flame preset, and current stage. |
| `bn_vehicle_popbang_history` | Diagnostic history for installs, removals, preset applications, and stage changes. |
| `bn_player_presets` | Player-created sound presets. |

Saved vehicle fields include `plate`, `effect_intensity`, `flame_color_preset`, `selected_sounds`, `current_stage`, `last_preset_name`, and a `has_*` boolean per installed part (`has_ecu`, `has_als`, `has_downpipe`, `has_bov`, `has_catdelete`, `has_straightpipe`, `has_headers`, `has_wastegate`, `has_intake`, `has_injectors`, `has_sparkplugs`, `has_flexfuel`, `has_turbo`, `has_intercooler`, `has_sequential`, `has_lsd`, `has_lcmodule`).

## Localization

Lua locale files live in `locales/`: `ar`, `cs`, `da`, `de`, `en`, `es`, `fr`, `it`, `ko`, `nl`, `pl`, `pt-br`, `ru`, `tr`, `zh-cn`, `zh-tw` are included.

```lua
Config.Locale = 'en'
```

The NUI also ships web locales at `web/locales/en.ts` and `web/locales/pt.ts`.
