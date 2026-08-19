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

-- 'esx' | 'qbcore' | 'qbox'. Qualquer outro valor cai automaticamente pro modo
-- standalone (bridge/standalone.lua), veja Instalação > Escolhendo um framework.
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

## Categorias de reparo

`/logrepair` e `RecordRepair` exigem uma categoria de um conjunto fixo, usada pra agrupar o histórico de serviço na NUI:

`performance`, `estetica`, `suspensao`, `motor`, `outro`

Omitir a categoria numa chamada de export confiável (sem `source`) usa `outro` como padrão.

## Onde fica o resto

- As listas de job aqui (`Config.MechanicJobs`, `Config.PoliceJobs`) decidem *quem*, veja [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos) pra matriz completa de acesso.
- Webhook do Discord, item `vehicle_document` e configuração do `ox_target` estão em [Integrações](/pt/docs/bnVehicleHistory/integracoes).
- O que de fato acontece com essas configurações (matemática do sync de quilometragem, detecção de acidente, revisão de spec, sincronização automática de propriedade) está em [Sistemas e Recursos](/pt/docs/bnVehicleHistory/recursos).
