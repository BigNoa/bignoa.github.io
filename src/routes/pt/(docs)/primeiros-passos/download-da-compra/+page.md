---
title: Primeiros Passos - Download da Compra
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import Package from '@lucide/svelte/icons/package';
  import Download from '@lucide/svelte/icons/download';
</script>

# Download da Compra

## 1. Confira o artifact do seu servidor

Mantenha o artifact do FiveM razoavelmente atualizado. Um build antigo é a causa mais comum de script "bugado" logo após instalar. Se algo parecer errado, atualizar o artifact é a primeira coisa a tentar.

<LinkCard href="https://runtime.fivem.net/artifacts" title="FiveM Artifacts" subtitle="runtime.fivem.net" icon={Package} />

## 2. Baixando seu script

As compras são feitas na [Loja Tebex](https://bignoa.tebex.io), mas os arquivos em si são liberados pelo sistema Keymaster da Cfx.re:

1. Faça login no Portal Cfx.re abaixo.
2. Abra a aba **Assets** e depois **Granted Assets**.
3. Procure o produto que você comprou (ex: `bnTruck`, `bnMarket`).

<LinkCard href="https://portal.cfx.re" title="Portal Cfx.re" subtitle="portal.cfx.re" icon={Download} />

<Alert type="info" title="Demora após a compra">
Pode levar alguns minutos até a compra aparecer na sua conta Cfx.re. Se ainda não apareceu, espere um pouco antes de abrir ticket de suporte.
</Alert>

## 3. Extraindo o zip

Extraia o zip baixado. Dentro dele está a pasta do resource (ex: `bnTruck`). Coloque essa pasta em `resources/[bignoa]/` no seu servidor. Não arraste o zip nem uma pasta extra de wrapper direto pra lá.

## 4. Reinicie seu servidor

Faça um **restart completo** do servidor, não apenas `ensure <resource>` pelo console ou txAdmin com o servidor rodando. Iniciar um resource com escrow sem restart completo é a causa mais comum de erro de Keymaster/entitlement, veja [Erros de Escrow do FiveM](/pt/primeiros-passos/erros-de-escrow) se acontecer com você.

## 5. Pronto

A partir daqui, siga a página de **Instalação** do próprio script na sidebar pra configuração e setup. Ainda com problema? Pergunte no [Discord da BigNoa](https://discord.gg/vmJzcj9NmJ) com o comprovante de compra em mãos.
