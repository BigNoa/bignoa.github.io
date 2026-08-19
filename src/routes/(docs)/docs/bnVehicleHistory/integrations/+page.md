---
title: bnVehicleHistory - UI & Integrations
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# UI & Integrations

## Vehicle document item

The "Print" button on the Documents tab gives the player a `vehicle_document` item (metadata carries the plate) instead of doing a browser print. Using the item shows a compact document card in the corner of the screen (no tablet UI, no NUI focus) for `Config.DocumentDisplaySeconds`, then it auto-hides.

Add the item to your inventory once. These files are reference only, copy the relevant one into your own inventory resource:

<TabGroup tabs={[{ id: 'ox', label: 'ox_inventory' }, { id: 'qbcore', label: 'QBCore' }, { id: 'esx', label: 'ESX' }]}>
{#snippet children(active)}
{#if active === 'ox'}
Auto-detected and preferred if `ox_inventory` is running. Add to `ox_inventory/data/items.lua`:

```lua
['vehicle_document'] = {
    label = 'Vehicle document',
    weight = 10,
    stack = false,
    close = true,
},
```
{:else if active === 'qbcore'}
Used as a fallback when `ox_inventory` isn't running. Add to `qb-core/shared/items.lua` (or qbx-core's items table):

```lua
['vehicle_document'] = { name = 'vehicle_document', label = 'Vehicle document', weight = 10, type = 'item', image = 'document.png', unique = false, useable = true, shouldClose = true },
```
{:else}
Legacy ESX has no `shared/items.lua`. Items are registered in the `items` MySQL table instead. Run once against your database:

```sql
INSERT INTO `items` (`name`, `label`) VALUES ('vehicle_document', 'Vehicle document');
```
{/if}
{/snippet}
</TabGroup>

<Alert type="info" title="ESX and Standalone limitations">
ESX without <code>ox_inventory</code> has no per-item metadata, so it falls back to remembering only the most recently printed plate per player (a FIFO queue), fine for one document at a time, not for holding several at once. Standalone has no inventory at all, so printing just reopens the document immediately.
</Alert>

## ox_target

```lua
Config.EnableTarget = true
```

Adds an interaction option ("View vehicle history") on every vehicle in addition to the `/vehiclehistory` command. Purely a convenience shortcut, access is still decided server-side exactly the same way as the command (see [Commands & Permissions](/docs/bnVehicleHistory/commands)). Ignored automatically if `ox_target` isn't running, it's not a hard dependency.

## Tablet-checking animation

```lua
Config.EnableTabletAnimation = true
```

Plays a visible-to-others "checking a tablet" animation with a clipboard prop while the history panel is open. Skipped automatically if you're inside a vehicle (it would fight the driving task).

## Discord webhook

Kept out of `config.lua` on purpose. It's server-only, so the URL never ships to the client. Edit `server/webhook.lua`:

```lua
-- Discord webhook for the audit log (spec review, accident, repair, inspection,
-- ownership transfer, document print). Leave blank to disable.
Config.DiscordWebhook = ''

-- Avatar/footer icon for the log embed. Leave blank for Discord's default avatar.
Config.DiscordWebhookAvatarUrl = 'https://iili.io/CYdA2ou.png'
```

Every log embed includes the plate, the acting player's name/identifier and job (or "System / external script" for trusted export calls with no `source`), plus action-specific fields. Denied attempts (a player without permission trying to use a command) are logged too, in red.

## Database

Tables are created and migrated automatically, see [Installation](/docs/bnVehicleHistory/installation) for the MySQL 8 upgrade note.

| Table | Purpose |
| --- | --- |
| `bn_vh_vehicles` | One row per plate: owner, mileage, last known model/health, and the declared spec JSON. |
| `bn_vh_owners` | Ownership change log (previous owner, new owner, timestamp). |
| `bn_vh_mileage_log` | Mileage snapshots over time, drives the Mileage tab's history. |
| `bn_vh_accidents` | Accident log: location, description, damage, involved party, reporter. |
| `bn_vh_repairs` | Repair log: service type, category, parts, cost, mechanic. |
| `bn_vh_inspections` | Inspection results and validity window. |
| `bn_vh_spec_reviews` | Spec review outcomes with the recorded diff (JSON) and reviewer. |

All child tables reference `bn_vh_vehicles.plate` with `ON DELETE CASCADE`, deleting a vehicle's row clears its full history.
