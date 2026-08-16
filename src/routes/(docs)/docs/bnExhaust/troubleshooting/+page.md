---
title: bnExhaust - Troubleshooting
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Troubleshooting

<Alert type="warning" title="Nothing happens on start">
Make sure a supported framework (<code>qbx_core</code>, <code>qb-core</code>, or <code>es_extended</code>) is already running before <code>bnPopBang</code> starts. There is no Standalone mode.
</Alert>

<Alert type="warning" title="An item doesn't do anything when used">
Usually caused by a missing inventory item entry, images that weren't copied over, a mismatched <code>Config.Inventory</code> value, or a job/gang that isn't covered by <code>Config.Permissions</code>.
</Alert>

<Alert type="warning" title="Can't install a part">
Dependency chains must be respected: e.g. the Turbo Upgrade requires the ECU to be installed first. Check the "Installed Parts" table on the <a href="/docs/bnExhaust/commands">Commands & Permissions</a> page for each item's requirement.
</Alert>

<Alert type="warning" title="Can't remove a part">
The system blocks removal while another installed part still depends on it. Uninstall the dependents first.
</Alert>

<Alert type="info" title="Stage isn't advancing">
Stage 1 requires ECU. Stage 2 requires ECU + Downpipe. Stage 3 requires ECU + ALS + Turbo + Downpipe.
</Alert>

<Alert type="info" title="Discord logs aren't showing up">
<code>Config.Webhook.URL</code> is empty by default, which disables logging. Set a valid webhook URL to enable it.
</Alert>
