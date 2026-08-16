---
title: bnTruck - Configuração
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Configuração

As configurações ficam divididas em seis arquivos:

```lua
-- config.lua
Config.Framework = 'auto' -- 'auto' | 'qbx' | 'qbcore' | 'esx'
```

- **`config.lua`**: framework, identificador do job, localização da empresa, percentual de comissão dos motoristas, divisão das multas entre motorista e empresa, intervalo e níveis de salário, quais cargos podem usar o MFT, e probabilidade de detecção do K-9.
- **`cargos.lua`**: multiplicador de pagamento por kg de cada categoria de carga, peso máximo por veículo, compartimentos de fundo falso para carga ilegal, e quais tipos de carga cada veículo aceita.
- **`locations.lua`**: coordenadas e tamanho das zonas de entrega, cargas permitidas por local, e posições das balanças de pesagem com ícone/cor no mapa.

<Alert type="warning">
O campo <code>name</code> das zonas de entrega identifica a missão ativa. Não renomeie.
</Alert>

- **`ui.lua`**: URLs de logo da empresa/MFT e cores de destaque da interface.
- **`webhooks.lua`**: URLs de webhook do Discord e cores dos embeds dos logs.
- **`locale.lua`**: strings de tradução, padrão em português com fallback pra outros idiomas.
