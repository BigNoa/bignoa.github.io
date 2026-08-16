---
title: bnSuspension - Changelog
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Changelog

## 06/2026 - Atualização major

Reescrita completa da arquitetura interna: sistema de configuração modular, novos controles de UI, lógica de exclusão de veículos, limites de altura por modelo, comandos de admin e melhorias significativas de som.

### Breaking changes

**Estrutura de configuração refeita.** O `config.lua` único foi dividido em vários arquivos focados dentro de `config/`. Se você tem um `config.lua` customizado da v1, precisa migrar os valores pros novos arquivos:

- `config/settings.lua`: configurações gerais (itens, tempo de instalação, inventário, vínculo de controle)
- `config/suspension.lua`: limites de altura, camber, perfis, modos de show, som, auto-lift, entrada/saída
- `config/permissions.lua`: permissões de job/grupo e permissões de admin
- `config/compatibility.lua`: blacklist de classe/modelo de veículo e exclusões por decorator
- `config/animation.lua`: configurações da animação de instalação
- `config/notify.lua`: configurações do sistema de notificação
- `config/ui.lua`: configurações de exibição da UI

### Novo item: `suspension_tool`

Adicionada a **Ferramenta de Remoção** (`suspension_tool`), necessária pra desinstalar o air ride de um veículo (quando `Config.Uninstall.RequireTool = true`).

**Como registrar o item no seu inventário**

`ox_inventory`: adicione ao seu `items.lua` (ou equivalente):

```lua
['suspension_tool'] = {
    label = 'Removal Tool',
    weight = 500,
    stack = false,
    close = true,
    description = 'Tool used to remove the air ride suspension system.'
},
```

`QBCore`: adicione a `qb-core/shared/items.lua`:

```lua
['suspension_tool'] = {
    name = 'suspension_tool',
    label = 'Removal Tool',
    weight = 500,
    type = 'item',
    image = 'suspension_tool.png',
    unique = false,
    useable = true,
    shouldClose = true,
    description = 'Tool used to remove the air ride suspension system.'
},
```

`ESX`: via SQL no seu banco:

```sql
INSERT INTO `items` (`name`, `label`, `weight`) VALUES ('suspension_tool', 'Removal Tool', 500);
```

<Alert type="info">
O script registra o item como usável automaticamente na inicialização. Não é necessário chamar <code>RegisterUsableItem</code> manualmente.
</Alert>

**Configuração do sistema de remoção**

Em `config/settings.lua`:

```lua
Config.Uninstall = {
    Enabled = true,               -- Habilita ou desabilita a remoção
    RequireTool = true,           -- Exige a ferramenta de remoção pra desinstalar
    ToolItem = 'suspension_tool', -- Nome do item no inventário
    RemoveToolOnUse = false,      -- Consome a ferramenta ao usar
    Duration = 4500,              -- Duração da animação de remoção (ms)
    Refund = {
        Enabled = true,           -- Devolve o stance_kit após a remoção
        Item = 'stance_kit',
        Count = 1,
        Chance = 50               -- 50% de chance de devolver o item
    }
}
```

### Novidades

**Configuração modular**: todo o config agora é dividido em arquivos dedicados, facilitando achar e editar opções específicas sem mexer no resto.

**Limites de altura por modelo (`config/minheight.lua`)**: defina altura mínima e máxima por modelo de veículo pra evitar que o pneu "clipe" em carros específicos.

```lua
Config.Suspension.MinHeightByModel = {
    -- ['adder'] = -0.05  -- limite inferior pra esse modelo
}

Config.Suspension.MaxHeightByModel = {
    ['adder'] = 0.05,     -- esse carro já senta mais alto por padrão, então limita
    ['banshee3'] = 0.08,
}
```

**Sistema de ferramenta de remoção**: jogadores agora podem desinstalar o air ride usando um item de remoção configurável, com chance configurável de devolver o stance kit.

**Comando de instalação para admin**: admins podem instalar o air ride em qualquer veículo sem precisar do item, via `/suspinstall`. Controlado por `Config.AdminPermissions`.

```lua
Config.Admin = {
    InstallCommand = 'suspinstall'  -- troque o nome do comando aqui se quiser
}

Config.AdminPermissions = {
    ['god'] = true,
    ['admin'] = true
}
```

**Lista de permissões de admin separada**: `Config.AdminPermissions` agora é separada de `Config.Permissions`, permitindo controlar quem usa comandos de admin separadamente de quem instala o kit normalmente.

**Exclusão de veículo por decorator (`config/compatibility.lua`)**: se outro script já gerencia a suspensão de um veículo (ex: `jgmechanic`), dá pra dizer pro bnSuspension ignorar esses veículos listando os decorators.

```lua
Config.Compatibility = {
    -- o comando /bndecorators lista todos os decorators de um veículo
    -- bnSuspension ignora qualquer veículo que tenha um desses decorators
    ExcludeByDecors = { 'jg_airride_active', 'stance_managed' }
}
```

**Controle por eixo**: a UI agora permite ajustar a altura do eixo dianteiro/traseiro de forma independente, além do controle unificado.

**Perfis de suspensão**: seis perfis prontos: **Low**, **Medium**, **High**, **Show**, **Race** e **Drift**, cada um com altura, offsets dianteiro/traseiro e camber pré-definidos. Configuráveis em `config/suspension.lua`.

```lua
Config.Suspension.Profiles = {
    low    = { height = 0.15, camberFront = 0.10, camberRear = 0.12 },
    medium = { height = 0.0,  camberFront = 0.0,  camberRear = 0.0  },
    high   = { height = -0.12 },
    show   = { height = 0.0,  showMode = "stance" },
    race   = { height = -0.04, front = -0.05, rear = -0.02, camberFront = 0.04, camberRear = 0.03 },
    drift  = { height = 0.02,  front = 0.0,   rear = 0.05,  camberFront = 0.08, camberRear = 0.05 }
}
```

**Camber customizável**: camber totalmente configurável por perfil e persistido por veículo, ajustável pela UI do controle.

**Sincronização ao se aproximar**: quando um jogador entra ou se aproxima de um veículo com air ride ativo, o sistema anuncia o estado pros jogadores próximos, mantendo tudo sincronizado.

**Modos de show ampliados**: seis modos: **Stance**, **Bounce**, **Wave**, **Front**, **Rear** e **F/R** (alternado), cada um com alcance, velocidade, velocidade de correção e força de corpo configuráveis.

**Vínculo de controle**: o item de controle agora pode ser vinculado a um veículo específico pela placa. Com `ControllerBinding.Enabled = true`, o controle de um jogador fica pareado a um veículo por vez, com opção de revincular sem sair do veículo.

```lua
Config.ControllerBinding = {
    Enabled = true,
    AllowRebindInVehicle = true  -- permite revincular sem sair do veículo
}
```

**Melhorias de som**

- Gerenciamento de timeout `pendingFadeOut`, evitando falhas de áudio quando sons se sobrepõem
- Referências de som não são mais deletadas prematuramente durante o fade-out
- Sons totalmente configuráveis por evento (`compressor`, `relief`, `up`, `down`)

### Melhorias

- UI do controle redesenhada, com layout mais limpo e mais controles
- Eventos NUI refatorados pra melhor performance
- Módulo de persistência aprimorado: valores de camber agora são salvos e restaurados corretamente por veículo
- Funções utilitárias adicionadas no server-side pra sanitizar perfis de suspensão e camber ao carregar
- `ExcludeByDecors` evita conflitos com scripts de stance externos sem precisar de blacklist manual

### Correções

- Corrigido modo show não resetando a força de corpo corretamente ao sair
- Corrigido camber não sendo aplicado após troca de perfil em alguns casos
- Corrigido controle abrindo incorretamente pra veículos sem air ride instalado
- Corrigido som tocando após a remoção do sistema de air ride
