---
title: bnExhaust - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Installation

High-quality audio presets, flame effects, vehicle-specific persistence, mechanic roleplay, tuning stages, a tablet-style NUI, and a diagnostic history panel.

<Alert type="warning" title="Resource folder name">
The resource folder must be named <code>bnPopBang</code>, not <code>bnExhaust</code>: item exports and internal references depend on that exact name.
</Alert>

1. Extract the resource into `resources/[bignoa]/`, keeping the folder name as `bnPopBang`.
2. Add to `server.cfg`, respecting the load order:

```lua
ensure ox_lib
ensure oxmysql
ensure bnPopBang
```

<Alert type="info" title="Framework auto-detection">
bnPopBang detects your framework automatically, in this order: <code>qbx_core</code>, <code>qb-core</code>, then <code>es_extended</code> (internally referenced as <code>QBX</code>, <code>QB</code>, and <code>ESX</code>). If none is running, a critical error is shown on start. There's no Standalone mode.
</Alert>

3. Register the inventory items for your framework (see [Inventory Items](/docs/bnExhaust/inventory-items)), then copy the item images from `inventory/images` into your inventory's image folder.
4. Configure the resource through the files in `shared/config/*.lua`. See [Configuration](/docs/bnExhaust/configuration).
5. Restart the resource:

```lua
restart bnPopBang
```

Database tables are created and migrated automatically via `server/database.lua`. A manual SQL import is also available at `server/bn_vehicle_popbang_settings.sql` if you need it.
