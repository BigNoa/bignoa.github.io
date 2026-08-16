---
title: bnExhaust - Comandos e Permissões
---

# Comandos e Permissões

## Comandos

| Comando | Padrão | Descrição |
| --- | --- | --- |
| Keybind do tablet | `F7` | Abre o tablet/UI do bnExhaust. |
| Remover peças | `/removepart` | Abre o menu de remoção de peças do veículo próximo (só no modo menu). |
| Painel do mecânico | `/popbangdiag` | Abre o painel de diagnóstico e histórico do veículo. |
| Instalar tudo (admin) | `/popbangall` | Instala todas as peças suportadas no veículo próximo, sem precisar dos itens. |
| Histórico de modificações | `/popbanglog` | Abre o log completo de modificações do veículo mais próximo. Defina `false`/`''` pra desabilitar. |

O painel do mecânico também pode ser aberto pelo item:

```lua
Config.MechanicPanelItem = 'bn_diagnostic_tablet' -- false/nil pra desabilitar
```

## Permissões

```lua
Config.Permissions = {
    Enabled = true,
    AdminBypass = true,
    Jobs = {
        ['mechanic'] = 0,
        ['tuner'] = 0
    },
    -- Nome da gang => grade mínima (só Qbox/QB). Independente de Jobs.
    Gangs = {
        ['ballas'] = 0,
    }
}

Config.AdminJobs = {
    admin = true,
    god = true,
    support = true
}
```

Com `Config.Permissions.Enabled` ativado, só os jobs/gangs configurados (na grade mínima) podem instalar ou remover peças. `AdminBypass` deixa admins do framework pularem essa checagem; `AdminJobs` controla quem pode usar os comandos exclusivos de admin.

## Modos de interação

```lua
Config.InteractionMode = 'menu' -- 'target' | 'menu' | 'both'
```

| Valor | Descrição |
| --- | --- |
| `target` | Usa só a interação de veículo do `ox_target`. |
| `menu` | Usa o comando configurado e um context menu do `ox_lib`. |
| `both` | Habilita os dois fluxos. |

## Peças instaladas

As funcionalidades são desbloqueadas instalando peças físicas, cada uma salva na placa do veículo. A remoção respeita dependências: por exemplo, a ECU não pode ser removida enquanto ALS, Downpipe, BOV, Intake, Injectors, Spark Plugs, Sequential Gearbox ou o LC Module ainda dependerem dela.

| Item | Rótulo | Desbloqueia | Requer |
| --- | --- | --- | --- |
| `bnpops_ecu` | Sport ECU Chip | Menu da ECU e Stage 1. | Nenhum |
| `bnpops_als` | Anti-Lag Valve | Anti-Lag / 2-Step. | `bnpops_ecu` |
| `bnpops_downpipe` | High Flow Downpipe | Stage 2 e mudanças no fluxo de escape. | `bnpops_ecu` |
| `bnpops_bov` | Blow-off Valve | Sons de válvula do turbo amplificados. | `bnpops_ecu` |
| `bnpops_catdelete` | Cat Delete | Limite de volume mais alto. | `bnpops_downpipe` |
| `bnpops_straightpipe` | Straight Pipe | Volume máximo de escape. | `bnpops_catdelete` |
| `bnpops_headers` | Sport Headers | Tom mais grave, menos stress de calor. | `bnpops_downpipe` |
| `bnpops_wastegate` | External Wastegate | Wastegate/turbo chatter mais alto. | `bnpops_als` |
| `bnpops_intake` | Sport Intake | Mais pops, resposta de lift-off mais rápida. | `bnpops_ecu` |
| `bnpops_injectors` | Racing Injectors | Mais chance de BANG, chamas maiores. | `bnpops_ecu` |
| `bnpops_sparkplugs` | Racing Spark Plugs | Timing de pop mais consistente. | `bnpops_ecu` |
| `bnpops_flexfuel` | Flex Fuel Kit | Chamas maiores, som mais alto, menos calor. | `bnpops_intake` |
| `bnpops_turbo` | Turbo Upgrade | ALS/resposta mais fortes. Necessário pro Stage 3. | `bnpops_als` |
| `bnpops_intercooler` | Intercooler | Menos calor, largada mais consistente. | `bnpops_turbo` |
| `bnpops_sequential` | Sequential Gearbox | Shift bangs mais altos, embreagem mais rápida. | `bnpops_ecu` |
| `bnpops_lcmodule` | Launch Control Module | Launch Control na ECU. | `bnpops_ecu` |
| `bnpops_lsd` | LSD Differential | Melhor tração de largada, menos wheelspin. | `bnpops_lcmodule` |
| `bn_diagnostic_tablet` | Diagnostic Tablet | Painel de diagnóstico do mecânico. | Config. de permissão/job |

Também dá pra bloquear modelos específicos ou classes inteiras de veículo:

```lua
-- Bloqueia modelos específicos (nome do modelo em minúsculo).
Config.VehicleBlacklist = {
    -- 'bmx',
    -- 'faggio',
}

-- Bloqueia classes inteiras de veículo do GTA por ID.
-- 8 = Motos  13 = Bicicletas  14 = Barcos  15 = Helicópteros  16 = Aviões
Config.ClassBlacklist = {
    8, -- Motos
    -- 14, -- Barcos
}
```

As duas listas também são respeitadas pelo `/popbangall`. A checagem de classe roda no client antes da barra de progresso da instalação começar, então jogadores bloqueados recebem rejeição instantânea.

```lua
-- Limite de presets de som customizados por jogador. 0 = ilimitado.
Config.MaxPresetsPerPlayer = 10

-- Conecta o multiplicador FuelDrain do stress de estágio a um resource de combustível real.
-- Opções: 'auto', 'native', 'LegacyFuel', 'qs-fuel', 'ox_fuel', 'ps-fuel', 'esx_fuel'
Config.FuelResource = 'auto'
```
