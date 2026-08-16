---
title: bnExhaust - Exports
---

# Exports

Each installed item calls a client export when used from the inventory. These are the same exports the item system triggers internally. You can call them yourself if you need to build a custom flow.

| Item | Export |
| --- | --- |
| `bnpops_ecu` | `exports['bnPopBang']:useECU()` |
| `bnpops_als` | `exports['bnPopBang']:useALS()` |
| `bnpops_downpipe` | `exports['bnPopBang']:useDownpipe()` |
| `bnpops_bov` | `exports['bnPopBang']:useBov()` |
| `bnpops_catdelete` | `exports['bnPopBang']:useCatDelete()` |
| `bnpops_straightpipe` | `exports['bnPopBang']:useStraightPipe()` |
| `bnpops_headers` | `exports['bnPopBang']:useHeaders()` |
| `bnpops_wastegate` | `exports['bnPopBang']:useWastegate()` |
| `bnpops_intake` | `exports['bnPopBang']:useIntake()` |
| `bnpops_injectors` | `exports['bnPopBang']:useInjectors()` |
| `bnpops_sparkplugs` | `exports['bnPopBang']:useSparkPlugs()` |
| `bnpops_flexfuel` | `exports['bnPopBang']:useFlexFuel()` |
| `bnpops_turbo` | `exports['bnPopBang']:useTurbo()` |
| `bnpops_intercooler` | `exports['bnPopBang']:useIntercooler()` |
| `bnpops_sequential` | `exports['bnPopBang']:useSequential()` |
| `bnpops_lsd` | `exports['bnPopBang']:useLSD()` |
| `bnpops_lcmodule` | `exports['bnPopBang']:useLCModule()` |
| `bn_diagnostic_tablet` | `exports['bnPopBang']:useDiagnosticTablet()` |

```lua
-- Example: manually open the mechanic diagnostic tablet without going through the inventory.
exports['bnPopBang']:useDiagnosticTablet()
```
