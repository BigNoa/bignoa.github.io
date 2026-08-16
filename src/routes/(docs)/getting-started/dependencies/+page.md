---
title: Getting Started - Dependencies
---

<script>
  import LinkCard from '$lib/components/LinkCard.svelte';
  import Package from '@lucide/svelte/icons/package';
  import Database from '@lucide/svelte/icons/database';
  import Target from '@lucide/svelte/icons/target';
</script>

# Dependencies

Most BigNoa scripts are built on top of the Overextended libraries below. Check the script's own **Installation** page for the exact list it needs, not every script uses all three.

<LinkCard href="https://github.com/overextended/ox_lib/releases/latest" title="ox_lib" subtitle="github.com/overextended/ox_lib" icon={Package} />

Required by almost every BigNoa script. Shared utility library (UI components, callbacks, locales, and more).

<LinkCard href="https://github.com/overextended/oxmysql/releases/latest" title="oxmysql" subtitle="github.com/overextended/oxmysql" icon={Database} />

Required wherever a script stores data in the database. Used instead of mysql-async or ghmattimysql.

<LinkCard href="https://github.com/overextended/ox_target/releases/latest" title="ox_target" subtitle="github.com/overextended/ox_target" icon={Target} />

Used for targeted interactions in some scripts (e.g. bnTruck, bnVehicleHistory). Only needed if the script's installation page lists it.

Add them to `server.cfg` **before** the BigNoa script, in this order:

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_target
ensure <bignoa-script>
```
