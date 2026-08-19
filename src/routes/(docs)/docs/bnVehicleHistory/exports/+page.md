---
title: bnVehicleHistory - Exports
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Exports

For the `/vehiclehistory`, `/logrepair`, `/reportaccident`, and `/loginspection` commands, see [Commands & Permissions](/docs/bnVehicleHistory/commands). For how spec review, mileage tracking, and ownership sync actually behave, see [Systems & Features](/docs/bnVehicleHistory/features).

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
