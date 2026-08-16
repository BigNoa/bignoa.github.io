---
title: bnSuspension - Installation
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Installation

Standalone air ride suspension system for FiveM, with peer-to-peer sync between players via `StateBags` and `Decorators`.

<Alert type="warning" title="Dependencies">
Before installing, make sure <a href="https://github.com/overextended/ox_lib">ox_lib</a> and <a href="https://github.com/overextended/oxmysql">oxmysql</a> are on the latest version.
</Alert>

1. Extract the `bnSuspension` folder to `resources/`.
2. Add to `server.cfg` (after the dependencies):

```cfg
ensure ox_lib
ensure oxmysql
ensure bnSuspension
```

3. Restart the server. The `bnsuspension_settings` table is created automatically in the database.

<Alert type="info">
Start order matters: <code>bnSuspension</code> must start <b>after</b> <code>ox_lib</code> and <code>oxmysql</code>.
</Alert>

## What's editable

The script is protected, but keeps flexibility where it matters:

| File | Status | Description |
| --- | --- | --- |
| `config.lua` | Open | Full configuration |
| `locales/*` | Open | Translations |
| `inventory/*` | Open | Item configuration |
| `web/*` | Open | Full UI source code (React) |
| `client/airride.lua` | Locked | Physics and sync logic |
| `server/main.lua` | Locked | Database and validation logic |
