---
title: bnSuspension - Configuração
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuração

O arquivo `config.lua` é o coração do script. Confira cada seção abaixo.

## 1. Idioma e itens

```lua
Config.Locale = 'pt' -- Idioma ('pt' ou 'en')
Config.Items = {
    StanceKit = 'stance_kit',        -- Nome do item de instalação
    Controller = 'stance_controller' -- Nome do item de controle remoto
}
```

## 2. Configurações de gameplay

```lua
Config.InstallTime = 5000            -- Tempo (ms) pra instalar o kit
Config.RemoteControlRadius = 25.0    -- Distância máxima pra usar o controle fora do veículo
Config.DisplayStatusHud = false      -- Se true, mostra um HUD pequeno quando ativo
```

## 3. Animação do controle

Personalize a animação tocada ao usar o controle remoto.

```lua
Config.Animation = {
    Enable = true,
    Dict = "cellphone@",
    Anim = "cellphone_text_in",
    Prop = {
        Model = "prop_amb_phone",    -- Modelo do prop (celular/controle)
        Bone = 28422,                -- Bone da mão direita
        Pos = {0.0, 0.0, 0.0},       -- Offset de posição
        Rot = {0.0, 0.0, 0.0}        -- Offset de rotação
    }
}
```

## 4. Interface (UI)

Adapte cores e textos pra identidade visual do seu servidor.

```lua
Config.UI = {
    Title = "Suspension",
    Brand = "Bn",                    -- Texto curto da marca (logo)
    Colors = {
        Primary = "#f98416ff",       -- Cor de destaque
        Background = "#111111",      -- Fundo
        Border = "#1a1a1a"           -- Bordas
    },
    Labels = {                       -- Rótulos dos botões de preset
        Preset1 = "1",
        Preset2 = "2",
        Preset3 = "3"
    }
}
```

## 5. Permissões

Define quem tem permissão pra **INSTALAR** o kit. Usar o controle é livre para qualquer jogador.

```lua
Config.Permissions = {
    ['god'] = true,       -- Permissão ACE (admin)
    ['mechanic'] = true,  -- Job
    -- ['police'] = true  -- Exemplo: liberar pra polícia
}
```

## 6. Inventário e notificações

```lua
Config.Inventory = 'ox' -- Opções: 'ox', 'esx', 'qb', 'custom'

-- Função de notificação totalmente editável, pra integrar com o seu sistema
Config.Notify = function(data)
    if lib and lib.notify then
        lib.notify(data) -- Usa o ox_lib por padrão
    else
        -- Adicione aqui o export do seu sistema de notificação
    end
end
```

<Alert type="info">
Desde a atualização de 06/2026, essas opções passaram a ficar divididas em vários arquivos dentro de <code>config/</code> (<code>settings.lua</code>, <code>suspension.lua</code>, <code>permissions.lua</code>, <code>compatibility.lua</code>, <code>animation.lua</code>, <code>notify.lua</code>, <code>ui.lua</code>). Veja o Changelog pra a lista completa das novas opções (perfis de suspensão, ferramenta de remoção, comandos de admin, etc).
</Alert>
