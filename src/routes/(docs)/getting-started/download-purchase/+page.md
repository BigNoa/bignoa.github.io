---
title: Getting Started - Download Purchase
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import Package from '@lucide/svelte/icons/package';
  import Download from '@lucide/svelte/icons/download';
</script>

# Download Purchase

## 1. Check your server artifact

Keep your FiveM server artifact reasonably up to date. An old build is the most common cause of scripts misbehaving right after install. If something looks broken, updating it is the first thing to try.

<LinkCard href="https://runtime.fivem.net/artifacts" title="FiveM Artifacts" subtitle="runtime.fivem.net" icon={Package} />

## 2. Downloading your script

Purchases are made on the [Tebex Store](https://bignoa.tebex.io), but the actual files are delivered through the Cfx.re Keymaster system:

1. Log into the Cfx.re Portal below.
2. Open the **Assets** tab, then **Granted Assets**.
3. Find the product you bought (e.g. `bnTruck`, `bnMarket`).

<LinkCard href="https://portal.cfx.re" title="Cfx.re Portal" subtitle="portal.cfx.re" icon={Download} />

<Alert type="info" title="Delay after purchase">
It can take a few minutes for a new purchase to show up in your Cfx.re account. If it's not there yet, wait a bit before opening a support ticket.
</Alert>

## 3. Extracting the zip

Extract the downloaded zip. Inside you'll find the resource folder (e.g. `bnTruck`). Drop that folder into `resources/[bignoa]/` on your server. Don't drag the outer zip or an extra wrapper folder in directly.

## 4. Restart your server

Do a **full restart** of the server, not just `ensure <resource>` from the console or txAdmin while it's running. Starting an escrowed resource without a full restart is the most common cause of a Keymaster/entitlement error, see [FiveM Escrow Errors](/getting-started/escrow-errors) if you hit one.

## 5. Done

From here, follow the script's own **Installation** page in the sidebar for config and setup steps. Still stuck? Ask in the [BigNoa Discord](https://discord.gg/vmJzcj9NmJ) with your purchase proof handy.
