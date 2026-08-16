---
title: bnExhaust - Itens de Inventário
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# Itens de Inventário

Defina o bridge de inventário em `shared/config/core.lua`:

```lua
Config.Inventory = 'ox' -- 'ox' | 'qb' | 'esx'
```

Se o `ox_inventory` estiver rodando, o bnPopBang pode usá-lo automaticamente pra checagem de itens. `custom` usa os placeholders de bridge em `server/framework.lua`.

<TabGroup tabs={[{ id: 'ox', label: 'ox_inventory' }, { id: 'qbcore', label: 'QBCore' }, { id: 'esx', label: 'ESX' }]}>
{#snippet children(active)}
{#if active === 'ox'}
Adicione estes blocos ao `ox_inventory/data/items.lua`. O campo `client.export` permite usar o item direto pela interface do inventário.

```lua
{
    ['bnpops_ecu'] = {
        label = 'Sport ECU Chip',
        weight = 200,
        stack = false,
        close = true,
        description = 'Unlocks the ECU menu and Stage 1 remap.',
        client = { export = 'bnPopBang.useECU' }
    },
    ['bnpops_als'] = {
        label = 'Anti-Lag Valve',
        weight = 500,
        stack = false,
        close = true,
        description = 'Enables Anti-Lag / 2-Step.',
        client = { export = 'bnPopBang.useALS' }
    },
    ['bnpops_downpipe'] = {
        label = 'High Flow Downpipe',
        weight = 3000,
        stack = false,
        close = true,
        description = 'Unlocks Stage 2, higher exhaust flow and more final speed.',
        client = { export = 'bnPopBang.useDownpipe' }
    },
    ['bnpops_bov'] = {
        label = 'Blow-off Valve (BOV)',
        weight = 800,
        stack = false,
        close = true,
        description = 'Amplifies turbo valve sounds on shifts and lift-off. Requires ECU.',
        client = { export = 'bnPopBang.useBov' }
    },
    ['bnpops_catdelete'] = {
        label = 'Cat Delete',
        weight = 2000,
        stack = false,
        close = true,
        description = 'Removes catalytic converter. Higher volume cap. Requires Downpipe.',
        client = { export = 'bnPopBang.useCatDelete' }
    },
    ['bnpops_straightpipe'] = {
        label = 'Straight Pipe',
        weight = 4000,
        stack = false,
        close = true,
        description = 'Straight exhaust. Maximum absolute volume. Requires Cat Delete.',
        client = { export = 'bnPopBang.useStraightPipe' }
    },
    ['bnpops_headers'] = {
        label = 'Sport Headers',
        weight = 3500,
        stack = false,
        close = true,
        description = 'Deeper, heavier exhaust tone on all pops. Requires Downpipe.',
        client = { export = 'bnPopBang.useHeaders' }
    },
    ['bnpops_wastegate'] = {
        label = 'External Wastegate',
        weight = 1200,
        stack = false,
        close = true,
        description = 'Amplifies wastegate ambient sound and turbo chatter. Requires ALS.',
        client = { export = 'bnPopBang.useWastegate' }
    },
    ['bnpops_intake'] = {
        label = 'Sport Intake',
        weight = 1500,
        stack = false,
        close = true,
        description = 'More pops per burst and faster lift-off response. Requires ECU.',
        client = { export = 'bnPopBang.useIntake' }
    },
    ['bnpops_injectors'] = {
        label = 'Racing Injectors',
        weight = 600,
        stack = false,
        close = true,
        description = 'Higher chance of BANG in bursts and larger flames. Requires ECU.',
        client = { export = 'bnPopBang.useInjectors' }
    },
    ['bnpops_sparkplugs'] = {
        label = 'Racing Spark Plugs',
        weight = 200,
        stack = false,
        close = true,
        description = 'Cleaner, more rhythmic pops with consistent timing. Requires ECU.',
        client = { export = 'bnPopBang.useSparkPlugs' }
    },
    ['bnpops_flexfuel'] = {
        label = 'Flex Fuel Kit (E85)',
        weight = 900,
        stack = false,
        close = true,
        description = 'Globally larger flames and higher volume. Requires Intake.',
        client = { export = 'bnPopBang.useFlexFuel' }
    },
    ['bnpops_turbo'] = {
        label = 'Turbo Upgrade',
        weight = 5000,
        stack = false,
        close = true,
        description = 'Much more aggressive ALS and stronger throttle response. Required for Stage 3. Requires ALS.',
        client = { export = 'bnPopBang.useTurbo' }
    },
    ['bnpops_intercooler'] = {
        label = 'Intercooler',
        weight = 4000,
        stack = false,
        close = true,
        description = 'Reduces heat under high boost and improves launch traction. Requires Turbo.',
        client = { export = 'bnPopBang.useIntercooler' }
    },
    ['bnpops_sequential'] = {
        label = 'Sequential Gearbox',
        weight = 6000,
        stack = false,
        close = true,
        description = 'Louder shift bangs and faster clutch response on gear changes. Requires ECU.',
        client = { export = 'bnPopBang.useSequential' }
    },
    ['bnpops_lsd'] = {
        label = 'LSD Differential',
        weight = 5000,
        stack = false,
        close = true,
        description = 'Major traction upgrade: better grip, less low-speed wheelspin and stabler launches. Requires LC Module.',
        client = { export = 'bnPopBang.useLSD' }
    },
    ['bnpops_lcmodule'] = {
        label = 'Launch Control Module',
        weight = 300,
        stack = false,
        close = true,
        description = 'Unlocks the Launch Control system in the ECU. Requires ECU.',
        client = { export = 'bnPopBang.useLCModule' }
    },
    ['bn_diagnostic_tablet'] = {
        label = 'Diagnostic Tablet',
        weight = 1000,
        stack = false,
        close = true,
        consume = 0,
        client = { export = 'bnPopBang.useDiagnosticTablet' }
    },
}
```
{:else if active === 'qbcore'}
Adicione a `qb-core/shared/items.lua`:

```lua
['bnpops_ecu']           = { name = 'bnpops_ecu',           label = 'Sport ECU Chip',        weight = 200,  type = 'item', image = 'bnpops_ecu.png',           unique = true, useable = true, shouldClose = true, description = 'Unlocks the ECU menu and Stage 1 remap.' },
['bnpops_als']           = { name = 'bnpops_als',           label = 'Anti-Lag Valve',        weight = 500,  type = 'item', image = 'bnpops_als.png',           unique = true, useable = true, shouldClose = true, description = 'Enables Anti-Lag / 2-Step.' },
['bnpops_downpipe']      = { name = 'bnpops_downpipe',      label = 'High Flow Downpipe',    weight = 3000, type = 'item', image = 'bnpops_downpipe.png',      unique = true, useable = true, shouldClose = true, description = 'Unlocks Stage 2, higher exhaust flow and more final speed.' },
['bnpops_bov']           = { name = 'bnpops_bov',           label = 'Blow-off Valve (BOV)',  weight = 800,  type = 'item', image = 'bnpops_bov.png',           unique = true, useable = true, shouldClose = true, description = 'Amplifies turbo valve sounds on shifts and lift-off. Requires ECU.' },
['bnpops_catdelete']     = { name = 'bnpops_catdelete',     label = 'Cat Delete',            weight = 2000, type = 'item', image = 'bnpops_catdelete.png',     unique = true, useable = true, shouldClose = true, description = 'Removes catalytic converter. Higher volume cap. Requires Downpipe.' },
['bnpops_straightpipe']  = { name = 'bnpops_straightpipe',  label = 'Straight Pipe',         weight = 4000, type = 'item', image = 'bnpops_straightpipe.png',  unique = true, useable = true, shouldClose = true, description = 'Straight exhaust. Maximum absolute volume. Requires Cat Delete.' },
['bnpops_headers']       = { name = 'bnpops_headers',       label = 'Sport Headers',         weight = 3500, type = 'item', image = 'bnpops_headers.png',       unique = true, useable = true, shouldClose = true, description = 'Deeper, heavier exhaust tone on all pops. Requires Downpipe.' },
['bnpops_wastegate']     = { name = 'bnpops_wastegate',     label = 'External Wastegate',    weight = 1200, type = 'item', image = 'bnpops_wastegate.png',     unique = true, useable = true, shouldClose = true, description = 'Amplifies wastegate ambient sound and turbo chatter. Requires ALS.' },
['bnpops_intake']        = { name = 'bnpops_intake',        label = 'Sport Intake',          weight = 1500, type = 'item', image = 'bnpops_intake.png',        unique = true, useable = true, shouldClose = true, description = 'More pops per burst and faster lift-off response. Requires ECU.' },
['bnpops_injectors']     = { name = 'bnpops_injectors',     label = 'Racing Injectors',      weight = 600,  type = 'item', image = 'bnpops_injectors.png',     unique = true, useable = true, shouldClose = true, description = 'Higher chance of BANG in bursts and larger flames. Requires ECU.' },
['bnpops_sparkplugs']    = { name = 'bnpops_sparkplugs',    label = 'Racing Spark Plugs',    weight = 200,  type = 'item', image = 'bnpops_sparkplugs.png',    unique = true, useable = true, shouldClose = true, description = 'Cleaner, more rhythmic pops with consistent timing. Requires ECU.' },
['bnpops_flexfuel']      = { name = 'bnpops_flexfuel',      label = 'Flex Fuel Kit (E85)',   weight = 900,  type = 'item', image = 'bnpops_flexfuel.png',      unique = true, useable = true, shouldClose = true, description = 'Globally larger flames and higher volume. Requires Intake.' },
['bnpops_turbo']         = { name = 'bnpops_turbo',         label = 'Turbo Upgrade',         weight = 5000, type = 'item', image = 'bnpops_turbo.png',         unique = true, useable = true, shouldClose = true, description = 'Much more aggressive ALS and stronger throttle response. Required for Stage 3. Requires ALS.' },
['bnpops_intercooler']   = { name = 'bnpops_intercooler',   label = 'Intercooler',           weight = 4000, type = 'item', image = 'bnpops_intercooler.png',   unique = true, useable = true, shouldClose = true, description = 'Reduces heat under high boost and improves launch traction. Requires Turbo.' },
['bnpops_sequential']    = { name = 'bnpops_sequential',    label = 'Sequential Gearbox',    weight = 6000, type = 'item', image = 'bnpops_sequential.png',    unique = true, useable = true, shouldClose = true, description = 'Louder shift bangs and faster clutch response on gear changes. Requires ECU.' },
['bnpops_lsd']           = { name = 'bnpops_lsd',           label = 'LSD Differential',      weight = 5000, type = 'item', image = 'bnpops_lsd.png',           unique = true, useable = true, shouldClose = true, description = 'Major traction upgrade: better grip, less low-speed wheelspin and stabler launches. Requires LC Module.' },
['bnpops_lcmodule']      = { name = 'bnpops_lcmodule',      label = 'Launch Control Module', weight = 300,  type = 'item', image = 'bnpops_lcmodule.png',      unique = true, useable = true, shouldClose = true, description = 'Unlocks the Launch Control system in the ECU. Requires ECU.' },
['bn_diagnostic_tablet'] = { name = 'bn_diagnostic_tablet', label = 'Diagnostic Tablet',     weight = 1000, type = 'item', image = 'bn_diagnostic_tablet.png', unique = true, useable = true, shouldClose = true, description = 'Mechanic diagnostic tablet.' },
```

<Alert type="info">
Não esqueça de adicionar as imagens <code>.png</code> correspondentes na pasta de imagens do seu inventário.
</Alert>
{:else}
Insira os itens na tabela `items` do seu banco de dados:

```sql
INSERT INTO `items` (`name`, `label`, `weight`) VALUES
('bnpops_ecu',           'Sport ECU Chip',        200),
('bnpops_als',           'Anti-Lag Valve',        500),
('bnpops_downpipe',      'High Flow Downpipe',    3000),
('bnpops_bov',           'Blow-off Valve (BOV)',  800),
('bnpops_catdelete',     'Cat Delete',            2000),
('bnpops_straightpipe',  'Straight Pipe',         4000),
('bnpops_headers',       'Sport Headers',         3500),
('bnpops_wastegate',     'External Wastegate',    1200),
('bnpops_intake',        'Sport Intake',          1500),
('bnpops_injectors',     'Racing Injectors',      600),
('bnpops_sparkplugs',    'Racing Spark Plugs',    200),
('bnpops_flexfuel',      'Flex Fuel Kit (E85)',   900),
('bnpops_turbo',         'Turbo Upgrade',         5000),
('bnpops_intercooler',   'Intercooler',           4000),
('bnpops_sequential',    'Sequential Gearbox',    6000),
('bnpops_lsd',           'LSD Differential',      5000),
('bnpops_lcmodule',      'Launch Control Module', 300),
('bn_diagnostic_tablet', 'Diagnostic Tablet',     1000);
```
{/if}
{/snippet}
</TabGroup>
