---
title: bnTruck - Configuration
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuration

Settings are split across six files:

```lua
-- config.lua
Config.Framework = 'auto' -- 'auto' | 'qbx' | 'qbcore' | 'esx'
```

- **`config.lua`**: framework, job identifier, company location, driver commission rate, fine split between driver and company, salary interval and grades, which job roles can use the MFT, and K-9 detection probability.
- **`cargos.lua`**: payment multiplier per kg for each cargo category, per-vehicle max weight, false-bottom compartments for illegal cargo, and which cargo types each vehicle can carry.
- **`locations.lua`**: delivery zone coordinates and sizes, allowed cargo per location, and weigh-station positions with map icons/colors.

<Alert type="warning">
The <code>name</code> field on delivery zones tracks the active mission. Don't rename it.
</Alert>

- **`ui.lua`**: company/MFT logo URLs and interface accent colors.
- **`webhooks.lua`**: Discord webhook URLs and embed colors for activity logs.
- **`locale.lua`**: translation strings, defaults to Portuguese with fallback support for other languages.
