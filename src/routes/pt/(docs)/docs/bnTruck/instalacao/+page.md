---
title: bnTruck - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Instalação

Ecossistema completo de logística de transportadora: transporte de cargas, fiscalização (MFT), risco de sonegação no peso/nota fiscal e detecção de contrabando com K-9, em uma UI Vite/React. Detecta automaticamente Qbox, QBCore e ESX.

<Alert type="warning" title="Dependências obrigatórias">
O bnTruck requer <code>ox_lib</code> e <code>oxmysql</code> instalados e iniciados <b>antes</b> dele na <code>server.cfg</code>. O <code>ox_target</code> é opcional, mas recomendado.
</Alert>

1. Baixe a versão mais recente e extraia `bnTruck` para `resources/[bignoa]/`.
2. Adicione ao `server.cfg`, respeitando a ordem:

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_target
ensure bnTruck
```

<Alert type="info" title="Tabelas do banco de dados">
As tabelas são criadas automaticamente no primeiro start do script. Não precisa importar SQL manualmente.
</Alert>

3. Defina `Config.Framework` em `config.lua` como `'auto'`, `'qbx'`, `'qbcore'` ou `'esx'`. Veja [Configuração](/pt/docs/bnTruck/configuracao).
4. Reinicie o resource:

```lua
restart bnTruck
```
