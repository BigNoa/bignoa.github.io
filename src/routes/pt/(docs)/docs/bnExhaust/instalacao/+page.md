---
title: bnExhaust - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Instalação

Presets de áudio de alta qualidade, efeitos de chama, persistência por veículo, roleplay de mecânico, estágios de tuning, uma NUI estilo tablet e um painel de histórico de diagnóstico.

<Alert type="warning" title="Nome da pasta do resource">
A pasta do resource precisa se chamar <code>bnPopBang</code>, não <code>bnExhaust</code>: os exports dos itens e as referências internas dependem exatamente desse nome.
</Alert>

1. Extraia o resource para `resources/[bignoa]/`, mantendo a pasta com o nome `bnPopBang`.
2. Adicione ao `server.cfg`, respeitando a ordem de carregamento:

```lua
ensure ox_lib
ensure oxmysql
ensure ox_inventory -- opcional
ensure bnPopBang
```

<Alert type="info" title="Detecção automática de framework">
O bnPopBang detecta o framework automaticamente, nesta ordem: <code>qbx_core</code>, <code>qb-core</code>, depois <code>es_extended</code> (referenciados internamente como <code>QBX</code>, <code>QB</code> e <code>ESX</code>). Se nenhum estiver rodando, um erro crítico aparece ao iniciar. Não existe modo Standalone.
</Alert>

3. Registre os itens de inventário pro seu framework (veja [Itens de Inventário](/pt/docs/bnExhaust/itens-de-inventario)), depois copie as imagens de `inventory/images` pra pasta de imagens do seu inventário.
4. Configure o resource pelos arquivos em `shared/config/*.lua`. Veja [Configuração](/pt/docs/bnExhaust/configuracao).
5. Reinicie o resource:

```lua
restart bnPopBang
```

As tabelas do banco de dados são criadas e migradas automaticamente via `server/database.lua`. Também existe uma importação SQL manual em `server/bn_vehicle_popbang_settings.sql`, se precisar.
