---
title: bnExhaust - Changelog
---

# Changelog

## 06/2026

Seis novas chaves de configuração foram adicionadas nos arquivos de config compartilhados. Instalações existentes não precisam de migração. Os campos são aditivos e todos têm valores padrão seguros.

### Novas opções de configuração

**Blacklist de veículo e classe** (`core.lua`): bloqueia modelos específicos ou classes inteiras de veículo do GTA de receberem peças. A checagem de classe roda no client antes da barra de progresso da instalação começar, então jogadores bloqueados recebem rejeição instantânea.

```lua
Config.VehicleBlacklist = {
    -- 'bmx',
    -- 'faggio',
}

-- 8 = Motos  13 = Bicicletas  14 = Barcos  15 = Helicópteros  16 = Aviões
Config.ClassBlacklist = {
    8, -- Motos
    -- 14, -- Barcos
}
```

As duas listas também são respeitadas pelo `/popbangall`.

**Comando de histórico de modificações** (`core.lua`): abre o log completo de modificações do veículo mais próximo via context menu do `ox_lib`. Cada entrada mostra a ação (instalação, remoção, mudança de estágio, preset aplicado), quem fez e quando.

```lua
Config.HistoryCommand = 'popbanglog' -- false/'' pra desabilitar
```

**Limite de presets por jogador** (`core.lua`): evita que jogadores acumulem presets de som customizados indefinidamente. Quando o limite é atingido, o servidor rejeita o salvamento e o client recebe uma notificação de erro mostrando o teto.

```lua
Config.MaxPresetsPerPlayer = 10 -- 0 = ilimitado
```

**Bridge de combustível** (`core.lua`): conecta o multiplicador `FuelDrain` do stress de estágio a um resource de combustível real. Use `'auto'` pra deixar o script detectar automaticamente o resource rodando.

```lua
-- Opções: 'auto', 'native', 'LegacyFuel', 'qs-fuel', 'ox_fuel', 'ps-fuel', 'esx_fuel'
Config.FuelResource = 'auto'
```

**Permissões de gang** (`permissions.lua`): instalação e remoção de peças agora suportam controle de acesso por gang (só Qbox/QB). A tabela segue a mesma estrutura de `Jobs` e é totalmente independente dela.

```lua
Config.Permissions = {
    Jobs = {
        ['mechanic'] = 0,
    },
    Gangs = {
        ['ballas'] = 0,
    }
}
```

### Telas redesenhadas

**Painel do mecânico (diagnóstico)**: reformulação visual completa. Uma barra de resumo no topo mostra o Estágio (indicadores em bolinha), quantidade de peças instaladas, quantidade bloqueada com ícone de aviso, e o nome do preset ativo, tudo sem precisar rolar a tela. As peças são agrupadas por categoria com linhas colapsáveis, ícones de cadeado por linha e bolinhas de status coloridas. Um novo botão de Histórico abre o log de modificações direto do painel; o rodapé mostra status de conexão, total de peças e versão do script.

**Configuração de som**: redesenhada sob o subtítulo "Playback · Presets · Intensity". O slider de Intensidade de Efeito agora mostra o valor atual ao vivo (ex: `1.5x`), com âncoras de escala rotuladas (`0.1 - Soft`, `1.0 - Default`, `Extreme - 2.0`). O toggle de RPM Overlay fica inline logo abaixo. Os pacotes de som aparecem em grid de cards, o preset ativo é destacado com borda colorida e um selo `✓ Active`.

### Correções

- **`ClassBlacklist` bloqueando todos os veículos**: `GetVehicleClass` chamado no server retornava valores incorretos, fazendo todo veículo parecer bloqueado. Corrigido passando a classe do client, onde a native funciona corretamente.
- **`Config.AdminJobs` indefinido**: `IsAdmin()` referenciava uma chave que faltava em todos os arquivos de config. Agora definida em `shared/config/core.lua`, com exemplos comentados.
- **`installAllParts` sem await**: o `INSERT` no banco era fire-and-forget. Convertido pra `MySQL.query.await` com verificação de resultado antes de notificar o admin.
- **`removeTuningPart` sem anti-spam**: o evento de remoção não tinha um lock contra duplicidade como o evento de instalação. Adicionada uma tabela `pendingRemoves` espelhando o comportamento de `pendingInstalls`.
- **Multiplicador de intensidade aplicado duas vezes**: `effect_intensity` estava sendo aplicado tanto na lógica de pop quanto na cadeia de playback. Corrigido: aplicado uma única vez, antes da cadeia de efeitos.
