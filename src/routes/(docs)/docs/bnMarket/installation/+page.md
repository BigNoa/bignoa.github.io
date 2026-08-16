---
title: bnMarket - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Installation

Live vehicle showroom spawned across the map. No menu browsing. Buy outright or finance, test drive before buying, and per-unit random tuning. Auto-detects ESX, QBCore, and QBox.

<Alert type="warning" title="Required dependency">
bnMarket requires <code>oxmysql</code> installed and started <b>before</b> it, plus one of ESX, QBCore, or QBox (purchases are disabled without a supported framework).
</Alert>

<Alert type="info" title="Optional integrations">
A garage script (<code>rhd_garage</code>, <code>qs-advancedgarages</code>, <code>qb-garages</code>, or <code>ox_garage</code>) is optional. Vehicles still save without one, just without the custom garage UI. A vehicle-keys resource (<code>mri_Qcarkeys</code>, <code>qb-vehiclekeys</code>, <code>renewed-vehiclekeys</code>, or <code>qs-vehiclekeys</code>) enables automatic key handoff.
</Alert>

1. Extract `bnMarket` into `resources/[bignoa]/`.
2. Add to `server.cfg`:

```cfg
ensure oxmysql
ensure bnMarket
```

3. Restart the server. The `bnmarket_financing` table is created automatically on first start.
4. Edit `shared/vehs.lua` and replace the example vehicles with your own catalog (model, spawn coordinates, price, and other fields; see [Configuration](/docs/bnMarket/configuration)).
5. To enable the admin commands (default `/bnmarket`), grant the permission in `server.cfg`:

```cfg
add_ace group.admin command.bnmarket allow
```
