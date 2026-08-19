---
title: bnVehicleHistory - Troubleshooting
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Troubleshooting

## "This vehicle has no registered owner" (vehicle_not_found)

The plate has never been seen by bnVehicleHistory, no one has driven it, registered it via export, and no framework ownership row exists for it yet (see [automatic ownership sync](/docs/bnVehicleHistory/features#automatic-ownership-sync)). Have the owner drive it once, or register it manually with `exports.bnVehicleHistory:RegisterVehicle(...)`.

## "You are not authorized to view this history" (not_authorized)

The requesting player is neither the plate's owner nor on `Config.MechanicJobs` / `Config.PoliceJobs`. Check the player's current job and the exact job name spelling in `config.lua`. See the full access matrix in [Commands & Permissions](/docs/bnVehicleHistory/commands).

## Action fails with "too_fast"

Expected behavior, not a bug: `server/netguard.lua` throttles repeated repair/accident/inspection/spec-review/document actions per player (1-3 seconds depending on the action). Wait a moment and retry.

## Action fails with "not_near_vehicle"

Repairs, accidents, inspections, and spec reviews all require a live `GetVehicleProperties` reading of the exact plate from within 5 meters. Get closer to the vehicle (or make sure you're not targeting a different plate than the one on screen) and try again.

## A vehicle's photo never loads on the history panel

The photo URL is built from the vehicle's display name, and a handful of GTA vehicles report a display name that doesn't match their real spawn code. Find out what the game reports:

```lua
print(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)):lower())
```

Then add the correction to `cars.lua`:

```lua
Config.VehicleModelFixes = {
    ['wrong-name-here'] = 'correct-spawn-code',
    -- ...
}
```

Numbered variants that share their base model's in-game label (e.g. `bison2`/`bison3`) can't be told apart by that native, so they'll keep showing the generic icon regardless.

## Discord webhook isn't posting anything

- `Config.DiscordWebhook` in `server/webhook.lua` is empty, this disables logging entirely, it's not a bug.
- Double check the webhook URL is valid and the channel/webhook wasn't deleted on the Discord side.
- `server/webhook.lua` is listed in `escrow_ignore` in `fxmanifest.lua` on purpose, so you can safely edit it after a Keymaster/escrow purchase. If it looks locked, you may be editing the wrong file.

## Getting a Keymaster/entitlement error on start

Not specific to this script, see [Getting Started: FiveM Escrow Errors](/getting-started/escrow-errors). The most common cause is starting an escrowed resource without a full server restart.

## Standalone mode limitations

If `Config.Framework` isn't `'esx'`, `'qbcore'`, or `'qbox'`, bnVehicleHistory silently runs in standalone mode (see [Installation](/docs/bnVehicleHistory/installation#choosing-a-framework)):

- No job system: everyone resolves to job `unemployed`, so `Config.MechanicJobs`/`Config.PoliceJobs` can never match anyone. Only ownership grants access.
- No automatic ownership sync (no framework vehicle table to read), ownership only ever comes from the exports.
- No inventory: using the `vehicle_document` item just reopens the document card immediately instead of giving a real item.

<Alert type="warning" title="Check Config.Framework first">
Most "permissions don't work" or "nobody can access anything" reports on a QBCore/ESX/Qbox server turn out to be a typo in <code>Config.Framework</code>, silently falling back to standalone.
</Alert>
