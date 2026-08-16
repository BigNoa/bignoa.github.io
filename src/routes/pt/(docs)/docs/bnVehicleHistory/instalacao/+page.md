---
title: bnVehicleHistory - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# Instalação

Histórico completo de veículos (donos, quilometragem, acidentes, reparos e inspeções) com uma NUI pesquisável restrita por papel (dono / mecânico / polícia).

1. Copie o `bnVehicleHistory` pra sua pasta `resources`, mantendo o nome da pasta como está.
2. Adicione ao `server.cfg`, respeitando a ordem de carregamento:

```lua
ensure ox_lib
ensure oxmysql
ensure bnVehicleHistory
```

<Alert type="info" title="Tabelas do banco de dados">
As tabelas são criadas automaticamente no primeiro start (<code>server/database.lua</code> roda o schema via <code>MySQL.ready</code>). Sem precisar de importação manual de SQL. O <code>sql/install.sql</code> fica só como cópia de referência.
</Alert>

<Alert type="warning" title="Atualizando uma instalação existente em MySQL 8 puro">

As migrações de schema usam <code>ALTER TABLE ... ADD COLUMN IF NOT EXISTS</code>, uma extensão exclusiva do MariaDB (o padrão típico do FiveM/txAdmin). Uma instalação nova não é afetada de qualquer forma. Se você está atualizando uma instalação <b>existente</b> rodando MySQL 8 puro (não MariaDB), adicione essas colunas manualmente:

```sql
ALTER TABLE bn_vh_vehicles ADD COLUMN `model` VARCHAR(50) DEFAULT NULL;
ALTER TABLE bn_vh_vehicles ADD COLUMN `last_known_health` FLOAT DEFAULT NULL;
ALTER TABLE bn_vh_repairs ADD COLUMN `category` VARCHAR(30) DEFAULT NULL;
```
</Alert>

3. Configure o resource pelo `config.lua`. Veja [Configuração](/pt/docs/bnVehicleHistory/configuracao).
4. Reinicie o resource:

```lua
restart bnVehicleHistory
```

## Item de documento do veículo

O botão "Imprimir" na aba Documentos dá ao jogador um item `vehicle_document` (a metadata carrega a placa) em vez de fazer um print pelo navegador. Usar o item mostra um card compacto do documento no canto da tela (sem UI de tablet, sem foco de NUI) por `Config.DocumentDisplaySeconds`, depois some sozinho.

Adicione o item ao seu inventário uma vez. Esses arquivos são só referência, copie o que for relevante pro seu resource de inventário:

<TabGroup tabs={[{ id: 'ox', label: 'ox_inventory' }, { id: 'qbcore', label: 'QBCore' }, { id: 'esx', label: 'ESX' }]}>
{#snippet children(active)}
{#if active === 'ox'}
Detectado e preferido automaticamente se o `ox_inventory` estiver rodando. Adicione ao `ox_inventory/data/items.lua`:

```lua
['vehicle_document'] = {
    label = 'Documento do veículo',
    weight = 10,
    stack = false,
    close = true,
},
```
{:else if active === 'qbcore'}
Usado como fallback quando o `ox_inventory` não está rodando. Adicione ao `qb-core/shared/items.lua` (ou à tabela de itens do qbx-core):

```lua
['vehicle_document'] = { name = 'vehicle_document', label = 'Documento do veículo', weight = 10, type = 'item', image = 'document.png', unique = false, useable = true, shouldClose = true },
```
{:else}
O ESX legado não tem `shared/items.lua`. Itens são registrados na tabela `items` do MySQL. Rode uma vez no seu banco:

```sql
INSERT INTO `items` (`name`, `label`) VALUES ('vehicle_document', 'Documento do veículo');
```
{/if}
{/snippet}
</TabGroup>

<Alert type="info" title="Limitações no ESX e Standalone">
ESX sem <code>ox_inventory</code> não tem metadata por item, então o sistema cai pra lembrar só a última placa impressa por jogador, funciona pra um documento por vez, não pra guardar vários. Standalone não tem inventário nenhum, então imprimir só reabre o documento na hora.
</Alert>
