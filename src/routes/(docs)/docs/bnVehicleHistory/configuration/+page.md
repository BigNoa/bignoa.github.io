---
title: bnVehicleHistory - Configuration
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuration

Everything lives in a single `config.lua`.

```lua
Config = {}

-- 'esx' | 'qbcore' | 'qbox' | 'standalone'. Leave 'standalone' if unsure, bridge/standalone.lua
-- auto-falls-back to it when the configured framework isn't running.
Config.Framework = 'qbox'

-- Script language: 'pt' or 'en'
Config.Locale = 'en'

-- Distance unit shown in the NUI (odometer, mileage tab, printed document): 'km' or 'mi'.
-- Storage is always km. This only affects display.
Config.MileageUnit = 'mi'

-- Job names allowed to record repairs/inspections and view service history for any vehicle.
Config.MechanicJobs = {
    'mechanic'
}

-- Job names allowed to record accidents, view full owner history for any vehicle, and record inspections.
Config.PoliceJobs = {
    'police'
}

-- Buffered driving distance (km) before the client pushes a mileage update to the server.
Config.MileageSyncThresholdKm = 0.5

-- Minimum distance (km) between mileage log snapshots, keeps bn_vh_mileage_log from growing on every sync.
Config.MileageLogIntervalKm = 10

-- Engine health drop (0-1000 scale) within one 1s check interval that counts as a reportable accident.
Config.AccidentHealthDropThreshold = 200

-- Days an inspection stays valid after being recorded.
Config.DefaultInspectionValidDays = 90

-- Adds an ox_target option on every vehicle to open its history (in addition to /vehiclehistory).
-- No job restriction here, same as the command: access is decided server-side per vehicle/plate.
Config.EnableTarget = true

-- Plays a "checking a tablet" animation (visible to nearby players) while the history panel
-- is open. Skipped automatically if the player is inside a vehicle.
Config.EnableTabletAnimation = true

-- How long the compact document card (shown when using the vehicle_document item) stays
-- on screen before auto-hiding, in seconds.
Config.DocumentDisplaySeconds = 15
```

<Alert type="info" title="ox_target is optional">
<code>Config.EnableTarget</code> only takes effect if <code>ox_target</code> is actually running. It's not a hard dependency, the option is simply ignored otherwise.
</Alert>

## Discord webhook

Kept out of `config.lua` on purpose. It's server-only, so the URL never ships to the client. Edit `server/webhook.lua`:

```lua
-- Discord webhook for the audit log (spec review, accident, repair, inspection,
-- ownership transfer, document print). Leave blank to disable.
Config.DiscordWebhook = ''

-- Avatar/footer icon for the log embed. Leave blank for Discord's default avatar.
Config.DiscordWebhookAvatarUrl = 'https://iili.io/CYdA2ou.png'
```

Every log embed includes the plate, the acting player's name/identifier and job (or "system" for trusted export calls with no `source`), plus action-specific fields. Denied attempts (a player without permission trying to use a command) are logged too, in red.

## Repair categories

`/logrepair` and `RecordRepair` require one of a fixed set of categories, used to group service history in the NUI:

`performance`, `estetica`, `suspensao`, `motor`, `outro`

Omitting a category on a trusted export call (no `source`) defaults to `outro`.

## Automatic ownership sync

`RegisterVehicle`/`TransferOwnership` (see [Exports](/docs/bnVehicleHistory/exports)) are optional pushes. On every lookup (`/vehiclehistory`, `/reportaccident`, `/logrepair`, `/loginspection`, mileage sync), bnVehicleHistory also reads the framework's own live vehicle table (`player_vehicles.citizenid` on QBCore/Qbox, `owned_vehicles.owner` on ESX) and self-heals `bn_vh_vehicles` if it disagrees or the plate has never been seen before.

This covers dealership/marketplace scripts that write ownership directly (e.g. `qbx_vehiclesales`, `esx_vehicleshop`) without you having to hook every one of them individually. Standalone mode has no such table, so it relies entirely on the manual exports.
