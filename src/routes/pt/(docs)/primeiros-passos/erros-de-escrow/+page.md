---
title: Primeiros Passos - Erros de Escrow do FiveM
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import AnswerBox from '$lib/components/AnswerBox.svelte';
  import KeyRound from '@lucide/svelte/icons/key-round';
</script>

# Erros de Escrow do FiveM

Todo script da BigNoa tem escrow da Cfx.re. É o próprio jogo, não nós, que descriptografa em tempo de execução usando a licença Keymaster do seu servidor. Esses três erros cobrem quase todos os casos.

<Alert type="warning" title="Antes de sair testando">
Dê até 30 minutos após a compra pro Keymaster registrar direito o entitlement, e sempre faça um <b>restart completo</b> do servidor (não <code>ensure</code>/<code>restart</code> pelo console) ao testar uma correção.
</Alert>

## "Error parsing script ... syntax error near `<\1>`"

<AnswerBox>

**Causa:** os arquivos do resource corromperam ou vieram incompletos na transferência pro servidor, geralmente por subir a pasta extraída arquivo por arquivo via FTP, ou um cliente FTP que corrompe dados binários.

**Correção:**
- Suba o resource completo como um único `.zip` e extraia direto no servidor/VPS. Não extraia localmente e arraste centenas de arquivos pequenos via FTP.
- Se está usando FileZilla e o problema persiste, tente o [WinSCP](https://winscp.net/).
- Confirme que o artifact do servidor não está muito antigo (veja [Download da Compra](/pt/primeiros-passos/download-da-compra)).

</AnswerBox>

## "Failed to verify protected resource"

<AnswerBox>

**Causa:** mesmo problema de base (transferência corrompida/incompleta), ou falta o arquivo `.fxap` dentro da pasta do resource.

**Correção:** apague a pasta do resource inteira e extraia uma cópia nova do zip. Não tente remendar uma instalação quebrada. Use WinSCP ou similar se o FileZilla continuar corrompendo a transferência.

</AnswerBox>

## "You lack the required entitlement"

<AnswerBox>

**Causa:** seu servidor não tem uma licença Keymaster vinculada à conta Cfx.re que comprou o script.

**Correção:**
- Gere uma chave de servidor no FiveM Keymaster usando a conta com que você comprou, e adicione no `server.cfg`:
  ```cfg
  sv_licenseKey "cfxk_xxxxxxxxxxxx"
  ```
- Vai trocar de conta Cfx.re? Use o recurso de **transferência** do Keymaster (limitado a uma transferência por script) em vez de comprar de novo.
- Na ZAP-Hosting, configure a license key pelo painel de controle deles, não direto no `server.cfg`.

</AnswerBox>

<LinkCard href="https://keymaster.fivem.net" title="FiveM Keymaster" subtitle="keymaster.fivem.net" icon={KeyRound} />

Ainda com problema depois disso? Abra um ticket no [Discord da BigNoa](https://discord.gg/vmJzcj9NmJ) com o comprovante de compra da Tebex.
