---
title: bnMarket - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Instalação

Showroom de veículos ao vivo, espalhado pelo mapa. Sem navegação por menu. Compra à vista ou financiada, test-drive antes de comprar, e tuning aleatório por unidade. Detecta automaticamente ESX, QBCore e QBox.

<Alert type="warning" title="Dependência obrigatória">
O bnMarket requer <code>oxmysql</code> instalado e iniciado <b>antes</b> dele, além de um framework entre ESX, QBCore ou QBox (as compras ficam desativadas sem um framework suportado).
</Alert>

<Alert type="info" title="Integrações opcionais">
Um script de garagem (<code>rhd_garage</code>, <code>qs-advancedgarages</code>, <code>qb-garages</code> ou <code>ox_garage</code>) é opcional. Os veículos são salvos mesmo sem ele, só sem a UI de garagem personalizada. Um resource de chaves de veículo (<code>mri_Qcarkeys</code>, <code>qb-vehiclekeys</code>, <code>renewed-vehiclekeys</code> ou <code>qs-vehiclekeys</code>) ativa a entrega automática das chaves.
</Alert>

1. Extraia `bnMarket` para `resources/[bignoa]/`.
2. Adicione ao `server.cfg`:

```cfg
ensure oxmysql
ensure bnMarket
```

3. Reinicie o servidor. A tabela `bnmarket_financing` é criada automaticamente no primeiro start.
4. Edite `shared/vehs.lua` e troque os veículos de exemplo pelo seu catálogo (modelo, coordenadas de spawn, preço e outros campos; veja [Configuração](/pt/docs/bnMarket/configuracao)).
5. Pra liberar os comandos de admin (padrão `/bnmarket`), conceda a permissão no `server.cfg`:

```cfg
add_ace group.admin command.bnmarket allow
```
