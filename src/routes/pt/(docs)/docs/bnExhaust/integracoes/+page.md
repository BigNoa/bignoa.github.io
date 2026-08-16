---
title: bnExhaust - UI e Integrações
---

# UI e Integrações

## UI (Tablet)

```lua
Config.UI = {
    Title = "bnOS",
    Subtitle = "ECU IGNITION CONTROL // FX MODULE",
    Description = "ENGINE MANAGEMENT SYSTEM"
}
```

Personalizável: título, subtítulo, descrição, cores primária/secundária/terciária, cores de fundo/superfície/case, cores de overlay pra 2-Step/Pops/ALS/Valet e branding do rodapé.

A UI do tablet inclui os módulos: Engineering, Telemetria/preview, Presets, Configurações, Export, Dyno, ALS & Pops, Engine Audio, Air Ride e controlador de Nitro.

## Notificações

```lua
Config.Notify = function(data)
    if lib and lib.notify then
        lib.notify(data)
    else
        print('[bnPopBang] [' .. (data.type or 'info') .. '] ' .. data.description)
    end
end
```

`data` traz `description` e `type` (`success`, `error` ou `info`). Substitua o corpo da função pra integrar com QBCore, ESX ou qualquer outro sistema de notificação.

## Webhook do Discord

```lua
Config.Webhook = {
    URL = "",
    BotName = "BigNoa",
    Avatar = "https://i.postimg.cc/cHP9HNG2/menor.png",
    Color = 3066993
}
```

Deixe `URL` vazio pra desabilitar o log no Discord. Os logs são enviados quando uma peça é instalada, removida, ou quando um admin instala todas as peças de uma vez.

## Banco de dados

As tabelas são criadas e migradas automaticamente:

| Tabela | Finalidade |
| --- | --- |
| `bn_vehicle_popbang_settings` | Configurações do veículo: peças instaladas, sons selecionados, intensidade, preset de chama e estágio atual. |
| `bn_vehicle_popbang_history` | Histórico de diagnóstico de instalações, remoções, aplicações de preset e mudanças de estágio. |
| `bn_player_presets` | Presets de som criados pelos jogadores. |

Os campos salvos do veículo incluem `plate`, `effect_intensity`, `flame_color_preset`, `selected_sounds`, `current_stage`, `last_preset_name` e um booleano `has_*` por peça instalada (`has_ecu`, `has_als`, `has_downpipe`, `has_bov`, `has_catdelete`, `has_straightpipe`, `has_headers`, `has_wastegate`, `has_intake`, `has_injectors`, `has_sparkplugs`, `has_flexfuel`, `has_turbo`, `has_intercooler`, `has_sequential`, `has_lsd`, `has_lcmodule`).

## Localização

Os arquivos de idioma em Lua ficam em `locales/`: estão inclusos `ar`, `cs`, `da`, `de`, `en`, `es`, `fr`, `it`, `ko`, `nl`, `pl`, `pt-br`, `ru`, `tr`, `zh-cn`, `zh-tw`.

```lua
Config.Locale = 'pt-br'
```

A NUI também tem locales web em `web/locales/en.ts` e `web/locales/pt.ts`.
