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

-- 'esx' | 'qbcore' | 'qbox'. Anything else falls back automatically to standalone
-- mode (bridge/standalone.lua), see Installation > Choosing a framework.
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

## Repair categories

`/logrepair` and `RecordRepair` require one of a fixed set of categories, used to group service history in the NUI:

`performance`, `estetica`, `suspensao`, `motor`, `outro`

Omitting a category on a trusted export call (no `source`) defaults to `outro`.

## Where the rest lives

- Job lists here (`Config.MechanicJobs`, `Config.PoliceJobs`) decide *who*, see [Commands & Permissions](/docs/bnVehicleHistory/commands) for the full access matrix.
- Discord webhook, the `vehicle_document` item, and `ox_target` setup are covered in [Integrations](/docs/bnVehicleHistory/integrations).
- What actually happens with these settings (mileage sync math, accident detection, spec review, automatic ownership sync) is covered in [Systems & Features](/docs/bnVehicleHistory/features).
