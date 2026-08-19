---
title: bnVehicleHistory - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Installation

Full vehicle history tracking (owners, mileage, accidents, repairs, inspections, and spec/tuning review) with a searchable NUI gated by role (owner / mechanic / police).

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
ALTER TABLE bn_vh_vehicles ADD COLUMN `declared_spec` TEXT DEFAULT NULL;
ALTER TABLE bn_vh_repairs ADD COLUMN `category` VARCHAR(30) DEFAULT NULL;
```
</Alert>

3. Configure the resource through `config.lua`. See [Configuration](/docs/bnVehicleHistory/configuration).
4. Restart the resource:

```lua
restart bnVehicleHistory
```

## Choosing a framework

```lua
Config.Framework = 'qbox' -- 'esx' | 'qbcore' | 'qbox'
```

Only these three values are recognized. Anything else, including an empty string or `'standalone'`, makes `bridge/standalone.lua` take over automatically (it prints a warning to the server console when that happens). Standalone mode has no job/identity system and no native inventory, ownership then relies entirely on the exports in [Exports](/docs/bnVehicleHistory/exports) instead of the automatic framework sync described in [Systems & Features](/docs/bnVehicleHistory/features).

## Next steps

Once it's running, head to [Integrations](/docs/bnVehicleHistory/integrations) to register the `vehicle_document` item and wire up `ox_target`/Discord, and [Commands & Permissions](/docs/bnVehicleHistory/commands) to set who can do what.
