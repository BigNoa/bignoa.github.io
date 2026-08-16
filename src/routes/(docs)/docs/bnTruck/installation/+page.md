---
title: bnTruck - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Installation

Full trucking company logistics ecosystem: cargo hauling, fiscal inspections (MFT), weight/invoice fraud risk, and K-9 smuggling detection, on a Vite/React tablet UI. Auto-detects Qbox, QBCore, and ESX.

<Alert type="warning" title="Required dependencies">
bnTruck requires <code>ox_lib</code> and <code>oxmysql</code> installed and started <b>before</b> it in <code>server.cfg</code>. <code>ox_target</code> is optional but recommended.
</Alert>

1. Get the latest release and extract `bnTruck` into `resources/[bignoa]/`.
2. Add to `server.cfg`, keeping the order:

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_target
ensure bnTruck
```

<Alert type="info" title="Database tables">
Tables are created automatically on the first script startup. No manual SQL import needed.
</Alert>

3. Set `Config.Framework` in `config.lua` to `'auto'`, `'qbx'`, `'qbcore'`, or `'esx'`. See [Configuration](/docs/bnTruck/configuration).
4. Restart the resource:

```lua
restart bnTruck
```
