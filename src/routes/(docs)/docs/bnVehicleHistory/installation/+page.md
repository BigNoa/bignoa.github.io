---
title: bnVehicleHistory - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# Installation

Full vehicle history tracking (owners, mileage, accidents, repairs, and inspections) with a searchable NUI gated by role (owner / mechanic / police).

1. Copy `bnVehicleHistory` into your `resources` folder, keeping the folder name as-is.
2. Add to `server.cfg`, respecting the load order:

```lua
ensure ox_lib
ensure oxmysql
ensure bnVehicleHistory
```

<Alert type="info" title="Database tables">
Tables are created automatically on first start (<code>server/database.lua</code> runs the schema via <code>MySQL.ready</code>). No manual SQL import needed. <code>sql/install.sql</code> is kept only as a reference copy.
</Alert>

<Alert type="warning" title="Upgrading an existing vanilla MySQL 8 install">

Schema migrations use <code>ALTER TABLE ... ADD COLUMN IF NOT EXISTS</code>, a MariaDB-only extension (the typical FiveM/txAdmin default). A fresh install is unaffected either way. If you're upgrading an <b>existing</b> install running vanilla MySQL 8 (not MariaDB), add these columns manually:

```sql
ALTER TABLE bn_vh_vehicles ADD COLUMN `model` VARCHAR(50) DEFAULT NULL;
ALTER TABLE bn_vh_vehicles ADD COLUMN `last_known_health` FLOAT DEFAULT NULL;
ALTER TABLE bn_vh_repairs ADD COLUMN `category` VARCHAR(30) DEFAULT NULL;
```
</Alert>

3. Configure the resource through `config.lua`. See [Configuration](/docs/bnVehicleHistory/configuration).
4. Restart the resource:

```lua
restart bnVehicleHistory
```

## Vehicle document item

The "Print" button on the Documentos tab gives the player a `vehicle_document` item (metadata carries the plate) instead of doing a browser print. Using the item shows a compact document card in the corner of the screen (no tablet UI, no NUI focus) for `Config.DocumentDisplaySeconds`, then it auto-hides.

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
ESX without <code>ox_inventory</code> has no per-item metadata, so it falls back to remembering only the most recently printed plate per player, fine for one document at a time, not for holding several at once. Standalone has no inventory at all, so printing just reopens the document immediately.
</Alert>
