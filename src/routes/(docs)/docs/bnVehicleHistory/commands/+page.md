---
title: bnVehicleHistory - Commands & Permissions
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Commands & Permissions

## Commands

<Alert type="info" title="The UI is the main way to use bnVehicleHistory">
Day to day, everything should go through the NUI: open it with <code>/vehiclehistory</code> or the <code>ox_target</code> option, then use the buttons on the Documents/Modifications tabs to report an accident, log a repair, log an inspection, or review spec. The three action commands below (<code>/reportaccident</code>, <code>/logrepair</code>, <code>/loginspection</code>) exist as a chat-only backup, for when a player can't get NUI focus, is scripting a scenario, or you're troubleshooting without opening the panel. Both paths call the exact same server-side logic and permission checks, so nothing is lost by using one over the other.
</Alert>

| Command | Access | Description |
| --- | --- | --- |
| `/vehiclehistory [plate]` | Owner / mechanic / police | Opens the history UI for the given plate, or the vehicle you're driving if omitted. This is the main entry point. |
| `/reportaccident [plate] [description]` | Police only | Backup for the NUI's "Report accident" button. |
| `/logrepair [plate] [service type] [category] [cost] [parts]` | Mechanic only | Backup for the NUI's "Log repair" button. `category` is one of `performance`, `estetica`, `suspensao`, `motor`, `outro`. |
| `/loginspection [plate] [pass\|fail]` | Mechanic or police | Backup for the NUI's inspection pass/fail buttons, valid for `Config.DefaultInspectionValidDays`. |

## Who can do what

```lua
Config.MechanicJobs = { 'mechanic' }
Config.PoliceJobs = { 'police' }
```

| Action | Owner | Mechanic (`Config.MechanicJobs`) | Police (`Config.PoliceJobs`) |
| --- | --- | --- | --- |
| View own vehicle's history | Yes | Yes (any plate) | Yes (any plate) |
| View full owner history (previous owners) | Yes, own vehicle | No | Yes, any plate |
| Log a repair | No | Yes | No |
| Report an accident | No | No | Yes |
| Log an inspection | No | Yes | Yes |
| Review vehicle spec (approve/reject tuning) | No | Yes | Yes |

A player who's neither the owner nor on either job list gets `not_authorized` for someone else's plate. Mechanic and police access isn't limited to their own vehicles by design, that's what lets a shop or a traffic stop pull up any plate.

<Alert type="info" title="Why two different errors">
Looking up a plate nobody's ever registered returns <code>vehicle_not_found</code>, but only to mechanic/police. A civilian gets <code>not_authorized</code> either way, so a plate search can't be used to fingerprint which plates exist in the database.
</Alert>

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

<Alert type="warning" title="Repair, accident, inspection, and spec review all need you near the vehicle">
Recording any of those four through the command or the NUI requires a live reading of the actual vehicle: you (or the vehicle) must be within 5 meters and the plate has to match. Too far away and the action fails with <code>not_near_vehicle</code>, that's not a permission bug. Trusted export calls (no player <code>source</code>, see <a href="/docs/bnVehicleHistory/exports">Exports</a>) skip this check.
</Alert>
