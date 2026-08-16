---
title: bnTruck - Exports e Eventos
---

# Exports e Eventos

## Exports client-side

## `useTruckTablet`

Abre o Tablet do Caminhoneiro.

```lua
exports['bnTruck']:useTruckTablet()
```

## `useMFTItem`

Abre o Terminal Fiscal Móvel.

```lua
exports['bnTruck']:useMFTItem()
```

## State bags do veículo

| Chave | Tipo | Função |
|-------|------|--------|
| `bn_has_cargo` | boolean | Se o veículo está rastreando carga no momento |
| `bn_cargo_weight` | number | Peso atual da carga |
| `bn_trailer_plate` | string | Placa normalizada da carreta |

## Eventos

**Client-side**

- `truckjob:client:newFineNotification`: uma multa fiscal foi emitida
- `truckjob:client:cargoLoaded`: carga carregada no terminal
- `truckjob:client:cargoDelivered`: entrega concluída

**Server-side**

```lua
AddEventHandler('truckjob:server:AppealFine', function(fineId, text)
    -- fineId: number, text: string (recurso enviado por uma empresa)
end)

AddEventHandler('truckjob:server:mft:addBolo', function(data)
    -- BOLO manual registrado por um fiscal
end)
```
