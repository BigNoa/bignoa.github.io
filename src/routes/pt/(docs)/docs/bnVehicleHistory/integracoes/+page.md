---
title: bnVehicleHistory - UI e Integrações
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# UI e Integrações

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
ESX sem <code>ox_inventory</code> não tem metadata por item, então o sistema cai pra lembrar só a última placa impressa por jogador (uma fila FIFO), funciona pra um documento por vez, não pra guardar vários. Standalone não tem inventário nenhum, então imprimir só reabre o documento na hora.
</Alert>

## ox_target

```lua
Config.EnableTarget = true
```

Adiciona uma opção de interação ("View vehicle history") em todo veículo, além do comando `/vehiclehistory`. É só um atalho de conveniência, o acesso continua sendo decidido no servidor exatamente da mesma forma que o comando (veja [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos)). Ignorado automaticamente se o `ox_target` não estiver rodando, não é uma dependência obrigatória.

## Animação de checar tablet

```lua
Config.EnableTabletAnimation = true
```

Toca uma animação visível pra outros jogadores de "checando um tablet" com um prop de prancheta enquanto o painel de histórico está aberto. Pulada automaticamente se você estiver dentro de um veículo (ela entraria em conflito com a task de dirigir).

## Webhook do Discord

Fica de propósito fora do `config.lua`. É server-only, então a URL nunca vai pro client. Edite o `server/webhook.lua`:

```lua
-- Webhook do Discord pro log de auditoria (revisão de spec, acidente, reparo, inspeção,
-- transferência de propriedade, impressão de documento). Deixe vazio pra desabilitar.
Config.DiscordWebhook = ''

-- Ícone de avatar/rodapé do embed de log. Deixe vazio pro avatar padrão do Discord.
Config.DiscordWebhookAvatarUrl = 'https://iili.io/CYdA2ou.png'
```

Todo embed de log inclui a placa, o nome/identificador e job do jogador que fez a ação (ou "System / external script" pra chamadas de export confiáveis sem `source`), mais campos específicos da ação. Tentativas negadas (jogador sem permissão tentando usar um comando) também são logadas, em vermelho.

## Banco de dados

As tabelas são criadas e migradas automaticamente, veja [Instalação](/pt/docs/bnVehicleHistory/instalacao) pro aviso de atualização em MySQL 8.

| Tabela | Propósito |
| --- | --- |
| `bn_vh_vehicles` | Uma linha por placa: dono, quilometragem, último modelo/saúde conhecidos e o JSON da spec declarada. |
| `bn_vh_owners` | Log de mudança de propriedade (dono anterior, dono novo, timestamp). |
| `bn_vh_mileage_log` | Snapshots de quilometragem ao longo do tempo, alimenta o histórico da aba Quilometragem. |
| `bn_vh_accidents` | Log de acidentes: localização, descrição, dano, envolvido, quem reportou. |
| `bn_vh_repairs` | Log de reparos: tipo de serviço, categoria, peças, custo, mecânico. |
| `bn_vh_inspections` | Resultados de inspeção e janela de validade. |
| `bn_vh_spec_reviews` | Resultados de revisão de spec com o diff registrado (JSON) e o revisor. |

Todas as tabelas filhas referenciam `bn_vh_vehicles.plate` com `ON DELETE CASCADE`, apagar a linha de um veículo limpa todo o histórico dele.
