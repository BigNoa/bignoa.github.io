---
title: bnExhaust - Solução de Problemas
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Solução de Problemas

<Alert type="warning" title="Nada acontece ao iniciar">
Confirme que um framework suportado (<code>qbx_core</code>, <code>qb-core</code> ou <code>es_extended</code>) já está rodando antes do <code>bnPopBang</code> iniciar. Não existe modo Standalone.
</Alert>

<Alert type="warning" title="Um item não faz nada quando usado">
Geralmente é uma entrada de item de inventário faltando, imagens que não foram copiadas, um valor de <code>Config.Inventory</code> incompatível, ou um job/gang que não está coberto por <code>Config.Permissions</code>.
</Alert>

<Alert type="warning" title="Não consigo instalar uma peça">
As cadeias de dependência precisam ser respeitadas: por exemplo, o Turbo Upgrade exige a ECU instalada primeiro. Veja a tabela de "Peças instaladas" na página <a href="/pt/docs/bnExhaust/comandos">Comandos e Permissões</a> pra o requisito de cada item.
</Alert>

<Alert type="warning" title="Não consigo remover uma peça">
O sistema bloqueia a remoção enquanto outra peça instalada ainda depende dela. Desinstale as dependentes primeiro.
</Alert>

<Alert type="info" title="O estágio não avança">
Stage 1 exige ECU. Stage 2 exige ECU + Downpipe. Stage 3 exige ECU + ALS + Turbo + Downpipe.
</Alert>

<Alert type="info" title="Os logs do Discord não aparecem">
<code>Config.Webhook.URL</code> vem vazio por padrão, o que desabilita o log. Defina uma URL de webhook válida pra habilitar.
</Alert>
