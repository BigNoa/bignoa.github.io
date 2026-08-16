---
title: bnTruck - Inventory Items
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# Inventory Items

bnTruck needs four items registered in your inventory resource:

| Item | Label | Purpose |
|------|-------|---------|
| `truck_device` | Truck Tablet | Opens the main logistics menu (company, cargo, assignments) |
| `mft_device` | MFT Device | Transport inspection module, for authorized officers only |
| `nota_fiscal` | Invoice | Cargo document checked during inspections |
| `false_note` | Forged Invoice | Deceptive document to fool inspectors |

<TabGroup tabs={[{ id: 'ox', label: 'ox_inventory' }, { id: 'qbcore', label: 'QBCore' }, { id: 'esx', label: 'ESX / Legacy' }]}>
{#snippet children(active)}
{#if active === 'ox'}
Add the item definitions to `ox_inventory/data/items.lua`, with `client.export` pointing at the exports below and weights `100`, `200`, `0`, `0` respectively.
{:else if active === 'qbcore'}
Add entries to `qb-core/shared/items.lua` (or the qbx-core items table) with matching names, labels, and weights.
{:else}
Insert the four records into your `items` database table with the matching names, labels, and weights.
{/if}
{/snippet}
</TabGroup>

<Alert type="info">
Copy the images from the resource's <code>inventory/images/</code> folder into your inventory system's image directory so they render correctly.
</Alert>
