---
title: bnVehicleHistory - Exports
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Exports

## Comandos

| Comando | Acesso | Descrição |
| --- | --- | --- |
| `/vehiclehistory [placa]` | Dono / mecânico / polícia | Abre a UI de histórico da placa informada, ou do veículo que você está dirigindo se omitida. |
| `/reportaccident [placa] [descrição]` | Só polícia | Registra um acidente no histórico do veículo. |
| `/logrepair [placa] [tipo de serviço] [categoria] [custo] [peças]` | Só mecânico | Registra um reparo. `categoria` é uma de `performance`, `estetica`, `suspensao`, `motor`, `outro`. |
| `/loginspection [placa] [pass\|fail]` | Mecânico ou polícia | Registra um resultado de inspeção, válido por `Config.DefaultInspectionValidDays`. |

## Exemplo de fluxo em RP

Um policial para um carro numa abordagem de rotina:

1. `/vehiclehistory ABC1234`: a placa não é do motorista, mas o comando funciona porque o job do policial está em `Config.PoliceJobs`. O painel abre mostrando o histórico completo de donos, não só o atual.
2. O histórico de donos mostra duas transferências anteriores e o dono atual não bate com o ID do motorista. Vale uma pergunta a mais no RP.
3. O policial repara que o para-choque dianteiro não bate com a especificação declarada e abre a aba de **revisão de spec**. O diff mostra uma troca de `modFrontBumper` não declarada. Rejeitar deixa essa divergência registrada pra depois.
4. De volta à delegacia, o policial roda `/reportaccident ABC1234 batida na traseira no cais`: registrado com a localização dele, com timestamp, e (se `Config.DiscordWebhook` estiver configurado) postado no canal de auditoria do servidor.

Uma oficina atende um cliente que chegou sem hora marcada:

1. `/vehiclehistory ABC1234` no elevador: o job do mecânico está em `Config.MechanicJobs`, então funciona em qualquer placa, não só nos veículos dele.
2. O histórico de serviço mostra que a última inspeção venceu há 12 dias (`Config.DefaultInspectionValidDays` já tinha passado).
3. `/logrepair ABC1234 "retífica da suspensão" suspensao 3500 "amortecedores, buchas"`: registrado com o identificador do mecânico anexado.
4. `/loginspection ABC1234 pass`: renova a janela de validade da inspeção.

## Revisão de especificação do veículo

Mecânicos e policiais podem comparar o tuning atual de um veículo com a última especificação **declarada** (cor, rodas, película, neon, mods de kit de carroceria e campos cosméticos/de tuning parecidos; desgaste de motor e nível de combustível ficam de fora, esses variam sozinhos). Na primeira vez que um veículo é inspecionado sem especificação declarada ainda, a leitura ao vivo vira a declarada automaticamente.

Aprovar uma revisão com mudanças pendentes registra automaticamente uma entrada de reparo pro diff, categorizada como `suspensao`, `performance` ou `estetica` dependendo de quais campos mudaram. Rejeitar uma revisão deixa a especificação declarada intacta, o que é útil pra pegar tuning não declarado/ilegal.

## Integrando com outros resources

```lua
-- Registra um veículo quando é comprado/spawnado pela primeira vez (model é opcional, uma
-- string de spawn-code tipo 'schafter2'; se omitido, é capturado automaticamente na primeira
-- vez que alguém dirigir o veículo)
exports.bnVehicleHistory:RegisterVehicle(plate, ownerIdentifier, initialMileageKm, model)

-- Transfere a propriedade (ex: numa venda de concessionária)
exports.bnVehicleHistory:TransferOwnership(plate, newOwnerIdentifier)

-- Lê o pacote completo de histórico (ex: pra um script de cotação de seguro)
local history = exports.bnVehicleHistory:GetVehicleHistory(plate)

-- Registra um reparo a partir de outro script (chamada confiável, pula a checagem de job).
-- category é uma de performance|estetica|suspensao|motor|outro; se omitida usa 'outro' como padrão.
exports.bnVehicleHistory:RecordRepair(plate, { serviceType = 'engine rebuild', category = 'motor', parts = 'pistons', cost = 4000, mechanic = 'system' })

-- Registra um acidente a partir de outro script (chamada confiável, pula a checagem de job)
exports.bnVehicleHistory:RecordAccident(plate, { description = 'insurance claim', location = 'n/a', damage = 'n/a', involved = 'n/a', reportedBy = 'system' })

-- Registra um resultado de inspeção a partir de outro script (chamada confiável, pula a checagem de job)
exports.bnVehicleHistory:RecordInspection(plate, { result = 'pass' })
```

<Alert type="warning" title="ReviewVehicleSpec precisa de uma leitura ao vivo">
<code>exports.bnVehicleHistory:ReviewVehicleSpec(plate, liveSpec, result)</code> existe pra integrações avançadas, mas exige uma tabela <code>liveSpec</code> real, capturada do <code>GetVehicleProperties</code> atual do veículo. Não tem como chamar isso com sentido sem o jogador estar realmente perto do veículo. Prefira o fluxo de revisão pela própria UI, a menos que você saiba exatamente o que está fazendo.
</Alert>
