---
title: bnExhaust - Configuração
---

# Configuração

Todas as configurações editáveis ficam em `shared/` e `shared/config/`. Confira esses arquivos primeiro. A maioria dos donos de servidor nunca precisa mexer direto na lógica client/server.

| Arquivo | Controla |
| --- | --- |
| `shared/config.lua` | Inicialização da tabela `Config` base. |
| `shared/config/core.lua` | Debug, idioma, keybind, inventário, comandos, jobs de admin e efeitos simultâneos. |
| `shared/config/notifications.lua` | Bridge de notificação. |
| `shared/config/permissions.lua` | Permissões de job/gang, bypass de admin e webhook do Discord. |
| `shared/config/effects.lua` | Pops, shift bang, 2-Step, Launch Control, Valet, ALS, Downpipe, sons ambientes e limites de intensidade. |
| `shared/config/ui.lua` | Branding do tablet, cores da UI e cores de overlay. |
| `shared/config/performance.lua` | Estágios, stress mecânico e multiplicadores de efeito por item. |
| `shared/sounds.lua` | Volumes de som, limiares de intensidade, presets nativos e seleção de som padrão. |

Veja [UI e Integrações](/pt/docs/bnExhaust/integracoes) pro tablet, notificações, webhook, banco e idiomas; [Desempenho e Som](/pt/docs/bnExhaust/desempenho) pros estágios, efeitos e presets de som; e [Comandos e Permissões](/pt/docs/bnExhaust/comandos) pros comandos, controle de acesso e peças instaladas.
