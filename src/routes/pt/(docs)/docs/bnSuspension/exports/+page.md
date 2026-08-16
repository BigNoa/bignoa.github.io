---
title: bnSuspension - Exports
---

# Exports

Funções expostas para integração com outros resources.

## `useStanceKit`

Executa a lógica de instalação no veículo atual (client-side).

```lua
exports['bnSuspension']:useStanceKit()
```

## `useStanceController`

Abre o menu do controle remoto. Se o jogador estiver a pé, busca automaticamente o veículo instalado mais próximo.

```lua
exports['bnSuspension']:useStanceController()
```
