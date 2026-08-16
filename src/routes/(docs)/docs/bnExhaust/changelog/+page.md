---
title: bnExhaust - Changelog
---

# Changelog

## 06/2026

Six new configuration keys were added across the shared config files. Existing installations require no migration. The fields are additive with safe defaults.

### New configuration options

**Vehicle & class blacklist** (`core.lua`): block specific vehicle models or entire GTA vehicle classes from receiving parts. The class check runs client-side before the install progress bar starts, so blocked players get an instant rejection.

```lua
Config.VehicleBlacklist = {
    -- 'bmx',
    -- 'faggio',
}

-- 8 = Motorcycles  13 = Cycles  14 = Boats  15 = Helicopters  16 = Planes
Config.ClassBlacklist = {
    8, -- Motorcycles
    -- 14, -- Boats
}
```

Both lists are also respected by `/popbangall`.

**Modification history command** (`core.lua`): opens the full modification log for the nearest vehicle via an `ox_lib` context menu. Each entry shows the action (install, remove, stage change, preset applied), who performed it, and when.

```lua
Config.HistoryCommand = 'popbanglog' -- false/'' to disable
```

**Per-player preset limit** (`core.lua`): caps how many custom sound presets a player can save. The server rejects the save and the client is notified of the cap once reached.

```lua
Config.MaxPresetsPerPlayer = 10 -- 0 = unlimited
```

**Fuel resource bridge** (`core.lua`): connects the stage stress `FuelDrain` multiplier to a real fuel resource.

```lua
-- Options: 'auto', 'native', 'LegacyFuel', 'qs-fuel', 'ox_fuel', 'ps-fuel', 'esx_fuel'
Config.FuelResource = 'auto'
```

**Gang permissions** (`permissions.lua`): part install/removal now supports gang-based access (Qbox/QB only), independent from `Jobs`.

```lua
Config.Permissions = {
    Jobs = {
        ['mechanic'] = 0,
    },
    Gangs = {
        ['ballas'] = 0,
    }
}
```

### Redesigned screens

**Mechanic panel (diagnostic)**: full visual overhaul. A summary bar shows Stage (dot indicators), installed part count, blocked count with a warning icon, and the active preset name, all without scrolling. Parts are grouped by category with collapsible rows, per-row lock icons, and colored status dots. A new History button opens the modification log directly from the panel; the footer shows connection status, total parts, and script version.

**Sound configuration**: redesigned under "Playback · Presets · Intensity". The Effect Intensity slider shows the live value (e.g. `1.5x`) with labelled anchors (`0.1 - Soft`, `1.0 - Default`, `Extreme - 2.0`). The RPM Overlay toggle sits inline below it. Sound packs render as a card grid, with the active preset highlighted and marked `✓ Active`.

### Bug fixes

- **`ClassBlacklist` blocking every vehicle**: `GetVehicleClass` called server-side returned incorrect values, making every vehicle look blacklisted. Fixed by passing the class from the client, where the native works correctly.
- **`Config.AdminJobs` undefined**: `IsAdmin()` referenced a key missing from every config file. Now defined in `shared/config/core.lua` with commented examples.
- **`installAllParts` without await**: the database `INSERT` was fire-and-forget. Converted to `MySQL.query.await` with result verification before notifying the admin.
- **`removeTuningPart` without anti-spam**: the removal event had no duplicate lock like the install event. Added a `pendingRemoves` table mirroring `pendingInstalls`.
- **Intensity multiplier applied twice**: `effect_intensity` was applied both in the pop logic and in the playback chain. Now applied once, before the effects chain.
