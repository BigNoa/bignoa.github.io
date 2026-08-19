---
title: bnVehicleHistory - Systems & Features
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Systems & Features

## The history panel

`/vehiclehistory`, the `ox_target` option, and the `vehicle_document` item all open the same Svelte NUI, gated to what the viewer is allowed to see (see [Commands & Permissions](/docs/bnVehicleHistory/commands)). It has seven tabs:

| Tab | Shows |
| --- | --- |
| Summary | Recent timeline (repairs, accidents, spec reviews) and inspection status at a glance. |
| Modifications | Full spec diff history: every declared-vs-live tuning change, who changed it, and when. |
| Repairs | Full repair log: service type, category, cost, parts, mechanic. |
| Accidents | Full accident log: description, damage, location, who was involved and who reported it. |
| Mileage | Current mileage, distance driven since registration, monthly average, and the raw log. |
| Owners | Ownership history (only visible to the current owner and police, see the access matrix in Commands & Permissions). |
| Documents | Inspection pass/fail history and the spec review approve/reject controls. |

## Mileage tracking

`client/mileage.lua` samples the vehicle every second while you're driving it, but only sends data to the server in bursts:

```lua
Config.MileageSyncThresholdKm = 0.5   -- flush to the server after this much buffered distance
Config.MileageLogIntervalKm = 10      -- minimum gap between logged snapshots (bn_vh_mileage_log)
```

Distance only counts while the vehicle is grounded (`IsVehicleOnAllWheels`), so flying, no-clipping, or falling doesn't add mileage. Switching vehicles resets the buffer instead of carrying leftover distance onto the new plate. `current_mileage` on `bn_vh_vehicles` updates on every flush; a row only lands in `bn_vh_mileage_log` (the history graph) once accumulated distance clears `Config.MileageLogIntervalKm`, so the log doesn't grow on every single sync.

The server independently rejects implausible deltas (over 50km in one packet, or an average speed above 400km/h since the last accepted sync), so a modified client can't just report arbitrary mileage.

## Accident detection

Two ways an accident lands in a vehicle's history:

- **Automatic**: `client/damage.lua` polls engine health once a second. A single-tick drop of `Config.AccidentHealthDropThreshold` (default `200`, out of the engine's 0-1000 scale) or more auto-logs an accident with your current coordinates.
- **Manual**: police run `/reportaccident [plate] [description]`, or use the in-panel button while near the vehicle.

Both paths write to the same `bn_vh_accidents` table and post to Discord the same way.

## Vehicle spec review

Mechanics and police can review a vehicle's current tuning against its last **declared** spec (color, wheels, window tint, neon, livery, extras, and body-kit/performance mod slots, see `shared/spec.lua` for the exact field list). Engine wear and fuel level are excluded on purpose, those drift on their own and would never stop showing a diff.

The first time a vehicle is reviewed with no declared spec on file yet, whatever's currently on the car is auto-baselined as the declared spec, no manual "register" step needed. From then on:

- **Approve** with changes pending: the new spec becomes the declared one, *and* a repair entry is auto-logged for the diff, categorized as `suspensao`, `performance`, or `estetica` depending on which fields changed (see `SpecReview.CategorizeDiff`).
- **Reject**: the declared spec is left untouched. The mismatch stays visible on the Modifications tab, useful for catching undeclared or illegal tuning during a traffic stop.

## Automatic ownership sync

`RegisterVehicle`/`TransferOwnership` (see [Exports](/docs/bnVehicleHistory/exports)) are optional, explicit pushes. Independently of those, on every single lookup (`/vehiclehistory`, `/reportaccident`, `/logrepair`, `/loginspection`, mileage sync) bnVehicleHistory also reads the framework's own live vehicle table (`player_vehicles.citizenid` on QBCore/Qbox, `owned_vehicles.owner` on ESX) and self-heals `bn_vh_vehicles` if it disagrees, or if the plate has never been seen before.

This covers dealership/marketplace scripts that write ownership directly (e.g. `qbx_vehiclesales`, `esx_vehicleshop`) without you having to hook every one of them individually. Standalone mode has no such table to read, so it relies entirely on the manual exports.

## Anti-spam and anti-cheat layer

`server/netguard.lua` guards every player-triggered write:

- **Proximity check**: recording a repair, accident, inspection, or spec review requires a real `GetVehicleProperties` snapshot of a vehicle within 5 meters carrying the exact plate you're acting on. No live reading nearby means the action fails with `not_near_vehicle`, this can't be faked from a modified client since the check happens server-side against the plate the client claims to be near.
- **Cooldowns**: each action type (`mileage`, `accident`, `reportaccident`, `repair`, `inspection`, `specreview`, `document`) is throttled per player, from 1 second (mileage sync) to 3 seconds (everything else). Spamming an action returns `too_fast` instead of writing duplicate rows.
- **Driving check**: automatic mileage/accident detection additionally verifies the reporting player is actually the driver of that exact plate (`NetGuard.IsDrivingPlate`), not just standing nearby.

None of this is configurable, it's a fixed baseline against exploited clients and isn't meant to be loosened.
