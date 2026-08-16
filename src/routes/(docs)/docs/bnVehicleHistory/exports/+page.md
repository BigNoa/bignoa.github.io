---
title: bnVehicleHistory - Exports
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Exports

## Commands

| Command | Access | Description |
| --- | --- | --- |
| `/vehiclehistory [plate]` | Owner / mechanic / police | Opens the history UI for the given plate, or the vehicle you're driving if omitted. |
| `/reportaccident [plate] [description]` | Police only | Logs an accident on the vehicle's history. |
| `/logrepair [plate] [service type] [category] [cost] [parts]` | Mechanic only | Logs a repair. `category` is one of `performance`, `estetica`, `suspensao`, `motor`, `outro`. |
| `/loginspection [plate] [pass\|fail]` | Mechanic or police | Records an inspection result, valid for `Config.DefaultInspectionValidDays`. |

## Example roleplay flow

A police officer pulls a car over on a routine stop:

1. `/vehiclehistory ABC1234`: the plate isn't the driver's own, so the command only works because the officer's job is on `Config.PoliceJobs`. The panel opens showing the full owner history, not just the current one.
2. The owner history shows two prior transfers and the current owner doesn't match the driver's ID. Worth a follow-up question in character.
3. The officer notices the front bumper doesn't match the declared spec and opens the **spec review** tab. The diff shows an undeclared `modFrontBumper` change. Rejecting it leaves the mismatch on record for later.
4. Back at the station, the officer runs `/reportaccident ABC1234 rear-ended at the pier`: logged with their location, timestamped, and (if `Config.DiscordWebhook` is set) posted to the server's audit channel.

A mechanic shop handles a walk-in:

1. `/vehiclehistory ABC1234` at the lift: the mechanic's job is on `Config.MechanicJobs`, so this works on any plate, not just their own vehicles.
2. Service history shows the last inspection expired 12 days ago (`Config.DefaultInspectionValidDays` had lapsed).
3. `/logrepair ABC1234 "suspension rebuild" suspensao 3500 "coilovers, bushings"`: logged with the mechanic's identifier attached.
4. `/loginspection ABC1234 pass`: resets the inspection validity window.

## Vehicle spec review

Mechanics and police can review a vehicle's current tuning against its last **declared** spec (color, wheels, window tint, neon, body-kit mods, and similar cosmetic/tuning fields; engine wear and fuel level are excluded, those drift on their own). The first time a vehicle is inspected with no declared spec yet, the live reading is auto-baselined as the declared one.

Approving a review with changes pending automatically logs a repair entry for the diff, categorized as `suspensao`, `performance`, or `estetica` depending on which fields changed. Rejecting a review leaves the declared spec untouched, which is useful for catching undeclared/illegal tuning.

## Integrating with other resources

```lua
-- Register a vehicle when it's first purchased/spawned (model is optional, a
-- spawn-code string like 'schafter2'; if omitted it's captured automatically
-- the first time someone drives the vehicle)
exports.bnVehicleHistory:RegisterVehicle(plate, ownerIdentifier, initialMileageKm, model)

-- Transfer ownership (e.g. on a dealership sale)
exports.bnVehicleHistory:TransferOwnership(plate, newOwnerIdentifier)

-- Read the full history bundle (e.g. for an insurance quote script)
local history = exports.bnVehicleHistory:GetVehicleHistory(plate)

-- Log a repair from another script (trusted call, bypasses job checks).
-- category is one of performance|estetica|suspensao|motor|outro; omitting it defaults to 'outro'.
exports.bnVehicleHistory:RecordRepair(plate, { serviceType = 'engine rebuild', category = 'motor', parts = 'pistons', cost = 4000, mechanic = 'system' })

-- Log an accident from another script (trusted call, bypasses job checks)
exports.bnVehicleHistory:RecordAccident(plate, { description = 'insurance claim', location = 'n/a', damage = 'n/a', involved = 'n/a', reportedBy = 'system' })

-- Log an inspection result from another script (trusted call, bypasses job checks)
exports.bnVehicleHistory:RecordInspection(plate, { result = 'pass' })
```

<Alert type="warning" title="ReviewVehicleSpec needs a live reading">
<code>exports.bnVehicleHistory:ReviewVehicleSpec(plate, liveSpec, result)</code> exists for advanced integrations, but it requires a real <code>liveSpec</code> table captured from the vehicle's current <code>GetVehicleProperties</code>. There's no meaningful way to call it without the player actually near the vehicle. Prefer the in-UI review flow unless you know exactly what you're doing.
</Alert>
