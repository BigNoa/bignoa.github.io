---
title: bnExhaust - Configuration
---

# Configuration

All editable settings live under `shared/` and `shared/config/`. Review these files first. Most server owners never need to touch client/server logic directly.

| File | Controls |
| --- | --- |
| `shared/config.lua` | Base `Config` table initialization. |
| `shared/config/core.lua` | Debug, locale, keybind, inventory, commands, admin jobs, and simultaneous effects. |
| `shared/config/notifications.lua` | Notification bridge. |
| `shared/config/permissions.lua` | Job/gang permissions, admin bypass, and Discord webhook. |
| `shared/config/effects.lua` | Pops, shift bang, 2-Step, Launch Control, Valet, ALS, Downpipe, ambient sounds, and intensity limits. |
| `shared/config/ui.lua` | Tablet branding, UI colors, and overlay colors. |
| `shared/config/performance.lua` | Stages, mechanical stress, and item effect multipliers. |
| `shared/sounds.lua` | Sound volumes, intensity thresholds, built-in presets, and default sound selection. |

Most server owners only ever touch these files. Client and server logic shouldn't need changes. See [UI & Integrations](/docs/bnExhaust/integrations) for the tablet, notifications, webhook, database, and locales; [Performance & Sound](/docs/bnExhaust/performance) for stages, effects, and sound presets; and [Commands & Permissions](/docs/bnExhaust/commands) for commands, access control, and installed parts.
