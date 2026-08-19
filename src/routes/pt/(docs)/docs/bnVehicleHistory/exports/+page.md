---
title: bnVehicleHistory - Exports
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Exports

Pros comandos `/vehiclehistory`, `/logrepair`, `/reportaccident` e `/loginspection`, veja [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos). Pra entender como revisão de spec, rastreamento de quilometragem e sincronização de propriedade funcionam de fato, veja [Sistemas e Recursos](/pt/docs/bnVehicleHistory/recursos).

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
