---
title: Getting Started - FiveM Escrow Errors
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import AnswerBox from '$lib/components/AnswerBox.svelte';
  import KeyRound from '@lucide/svelte/icons/key-round';
</script>

# FiveM Escrow Errors

All BigNoa scripts are escrowed by Cfx.re. It's the game engine, not us, that decrypts them at runtime using your server's Keymaster license. These three errors cover almost every case.

<Alert type="warning" title="Before troubleshooting">
Give it up to 30 minutes after purchase for Keymaster to fully register the entitlement, and always do a <b>full server restart</b> (not <code>ensure</code>/<code>restart</code> from the console) when testing a fix.
</Alert>

## "Error parsing script ... syntax error near `<\1>`"

<AnswerBox>

**Cause:** the resource files got corrupted or partial during transfer to your server, usually from uploading the extracted folder file-by-file over FTP, or an FTP client mangling binary data.

**Fix:**
- Re-upload the full resource as a single `.zip`, then extract it directly on the server/VPS. Don't extract locally and drag hundreds of small files over FTP.
- If you're on FileZilla and it keeps happening, try [WinSCP](https://winscp.net/) instead.
- Make sure your server artifact isn't ancient (see [Download Purchase](/getting-started/download-purchase)).

</AnswerBox>

## "Failed to verify protected resource"

<AnswerBox>

**Cause:** same root issue as above (corrupted/incomplete transfer), or a missing `.fxap` file inside the resource folder.

**Fix:** delete the resource folder entirely and re-extract a fresh copy of the zip. Don't patch a broken install. Use WinSCP or similar if FileZilla keeps corrupting transfers.

</AnswerBox>

## "You lack the required entitlement"

<AnswerBox>

**Cause:** your server doesn't have a Keymaster license tied to the Cfx.re account that purchased the script.

**Fix:**
- Generate a server key at FiveM Keymaster using the account you bought with, and add it to `server.cfg`:
  ```cfg
  sv_licenseKey "cfxk_xxxxxxxxxxxx"
  ```
- Moving to a different Cfx.re account? Use Keymaster's **transfer** feature (limited to one transfer per script) instead of buying again.
- On ZAP-Hosting, set the license key through their control panel, not directly in `server.cfg`.

</AnswerBox>

<LinkCard href="https://keymaster.fivem.net" title="FiveM Keymaster" subtitle="keymaster.fivem.net" icon={KeyRound} />

Still stuck after trying the above? Open a ticket in the [BigNoa Discord](https://discord.gg/vmJzcj9NmJ) with your Tebex purchase proof.
