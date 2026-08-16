---
title: bnTruck - Exports & Events
---

# Exports & Events

## Client exports

## `useTruckTablet`

Opens the Logistics Tablet.

```lua
exports['bnTruck']:useTruckTablet()
```

## `useMFTItem`

Opens the Mobile Fiscal Terminal.

```lua
exports['bnTruck']:useMFTItem()
```

## Vehicle state bags

| Key | Type | Purpose |
|-----|------|---------|
| `bn_has_cargo` | boolean | Whether the vehicle is currently tracking cargo |
| `bn_cargo_weight` | number | Current cargo weight |
| `bn_trailer_plate` | string | Normalized trailer plate |

## Events

**Client-side**

- `truckjob:client:newFineNotification`: a fiscal fine was issued
- `truckjob:client:cargoLoaded`: cargo was loaded at the terminal
- `truckjob:client:cargoDelivered`: delivery completed

**Server-side**

```lua
AddEventHandler('truckjob:server:AppealFine', function(fineId, text)
    -- fineId: number, text: string (appeal submitted by a company)
end)

AddEventHandler('truckjob:server:mft:addBolo', function(data)
    -- manual BOLO registered by an inspector
end)
```
