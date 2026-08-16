---
title: bnVehicleHistory - Configuração
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuração

Tudo fica em um único `config.lua`.

```lua
Config = {}

-- 'esx' | 'qbcore' | 'qbox' | 'standalone'. Deixe 'standalone' se estiver em dúvida, o
-- bridge/standalone.lua cai automaticamente pra ele se o framework configurado não estiver rodando.
Config.Framework = 'qbox'

-- Idioma do script: 'pt' ou 'en'
Config.Locale = 'en'

-- Unidade de distância mostrada na NUI (odômetro, aba de quilometragem, documento impresso): 'km' ou 'mi'.
-- O armazenamento é sempre em km. Isso só afeta a exibição.
Config.MileageUnit = 'mi'

-- Jobs autorizados a registrar reparos/inspeções e ver o histórico de serviço de qualquer veículo.
Config.MechanicJobs = {
    'mechanic'
}

-- Jobs autorizados a registrar acidentes, ver o histórico completo de donos de qualquer veículo, e registrar inspeções.
Config.PoliceJobs = {
    'police'
}

-- Distância percorrida (km) acumulada antes do client enviar uma atualização de quilometragem pro servidor.
Config.MileageSyncThresholdKm = 0.5

-- Distância mínima (km) entre snapshots do log de quilometragem, evita que bn_vh_mileage_log cresça a cada sync.
Config.MileageLogIntervalKm = 10

-- Queda de saúde do motor (escala 0-1000) dentro de um intervalo de checagem de 1s que conta como acidente reportável.
Config.AccidentHealthDropThreshold = 200

-- Dias que uma inspeção continua válida depois de registrada.
Config.DefaultInspectionValidDays = 90

-- Adiciona uma opção no ox_target em todo veículo pra abrir o histórico dele (além do /vehiclehistory).
-- Sem restrição de job aqui, igual ao comando: o acesso é decidido no servidor por veículo/placa.
Config.EnableTarget = true

-- Toca uma animação de "checando um tablet" (visível pra jogadores próximos) enquanto o painel
-- de histórico está aberto. Pulado automaticamente se o jogador estiver dentro de um veículo.
Config.EnableTabletAnimation = true

-- Quanto tempo o card compacto do documento (mostrado ao usar o item vehicle_document) fica
-- na tela antes de sumir sozinho, em segundos.
Config.DocumentDisplaySeconds = 15
```

<Alert type="info" title="ox_target é opcional">
<code>Config.EnableTarget</code> só faz efeito se o <code>ox_target</code> estiver realmente rodando. Não é uma dependência obrigatória, a opção simplesmente é ignorada caso contrário.
</Alert>

## Webhook do Discord

Fica de propósito fora do `config.lua`. É server-only, então a URL nunca vai pro client. Edite o `server/webhook.lua`:

```lua
-- Webhook do Discord pro log de auditoria (revisão de spec, acidente, reparo, inspeção,
-- transferência de propriedade, impressão de documento). Deixe vazio pra desabilitar.
Config.DiscordWebhook = ''

-- Ícone de avatar/rodapé do embed de log. Deixe vazio pro avatar padrão do Discord.
Config.DiscordWebhookAvatarUrl = 'https://iili.io/CYdA2ou.png'
```

Todo embed de log inclui a placa, o nome/identificador e job do jogador que fez a ação (ou "system" pra chamadas de export confiáveis sem `source`), mais campos específicos da ação. Tentativas negadas (jogador sem permissão tentando usar um comando) também são logadas, em vermelho.

## Categorias de reparo

`/logrepair` e `RecordRepair` exigem uma categoria de um conjunto fixo, usada pra agrupar o histórico de serviço na NUI:

`performance`, `estetica`, `suspensao`, `motor`, `outro`

Omitir a categoria numa chamada de export confiável (sem `source`) usa `outro` como padrão.

## Sincronização automática de propriedade

`RegisterVehicle`/`TransferOwnership` (veja [Exports](/pt/docs/bnVehicleHistory/exports)) são envios opcionais. Em toda consulta (`/vehiclehistory`, `/reportaccident`, `/logrepair`, `/loginspection`, sync de quilometragem), o bnVehicleHistory também lê a tabela de veículos ao vivo do próprio framework (`player_vehicles.citizenid` no QBCore/Qbox, `owned_vehicles.owner` no ESX) e se autocorrige na `bn_vh_vehicles` caso ela esteja divergente ou a placa nunca tenha sido vista antes.

Isso cobre scripts de concessionária/marketplace que escrevem a propriedade diretamente (ex: `qbx_vehiclesales`, `esx_vehicleshop`) sem você precisar conectar cada um deles manualmente. O modo Standalone não tem essa tabela, então depende inteiramente dos exports manuais.
