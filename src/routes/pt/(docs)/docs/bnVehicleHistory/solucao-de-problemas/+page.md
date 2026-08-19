---
title: bnVehicleHistory - Solução de Problemas
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Solução de Problemas

## "This vehicle has no registered owner" (vehicle_not_found)

A placa nunca foi vista pelo bnVehicleHistory: ninguém dirigiu, ela nunca foi registrada via export, e não existe linha de propriedade no framework pra ela ainda (veja [sincronização automática de propriedade](/pt/docs/bnVehicleHistory/recursos#sincronização-automática-de-propriedade)). Peça pro dono dirigir uma vez, ou registre manualmente com `exports.bnVehicleHistory:RegisterVehicle(...)`.

## "You are not authorized to view this history" (not_authorized)

Quem está pedindo não é nem o dono da placa nem está em `Config.MechanicJobs` / `Config.PoliceJobs`. Confira o job atual do jogador e a grafia exata do nome do job no `config.lua`. Veja a matriz completa de acesso em [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos).

## Ação falha com "too_fast"

Comportamento esperado, não é bug: `server/netguard.lua` limita ações repetidas de reparo/acidente/inspeção/revisão de spec/documento por jogador (de 1 a 3 segundos dependendo da ação). Espere um instante e tente de novo.

## Ação falha com "not_near_vehicle"

Reparos, acidentes, inspeções e revisões de spec exigem uma leitura ao vivo de `GetVehicleProperties` da placa exata a até 5 metros. Chegue mais perto do veículo (ou confirme que não está mirando numa placa diferente da que está na tela) e tente de novo.

## A foto de um veículo nunca carrega no painel de histórico

A URL da foto é montada a partir do nome de exibição do veículo, e alguns veículos do GTA reportam um nome de exibição que não bate com o spawn code real. Descubra o que o jogo reporta:

```lua
print(GetDisplayNameFromVehicleModel(GetEntityModel(vehicle)):lower())
```

Depois adicione a correção no `cars.lua`:

```lua
Config.VehicleModelFixes = {
    ['nome-errado-aqui'] = 'spawn-code-correto',
    -- ...
}
```

Variantes numeradas que compartilham o mesmo nome de exibição do modelo base (ex: `bison2`/`bison3`) não dá pra diferenciar por essa native, então elas continuam mostrando o ícone genérico de qualquer forma.

## O webhook do Discord não posta nada

- `Config.DiscordWebhook` em `server/webhook.lua` está vazio, isso desabilita o log inteiramente, não é bug.
- Confira se a URL do webhook é válida e se o canal/webhook não foi apagado no Discord.
- `server/webhook.lua` está listado em `escrow_ignore` no `fxmanifest.lua` de propósito, pra você poder editar com segurança depois de uma compra com Keymaster/escrow. Se parecer travado, você pode estar editando o arquivo errado.

## Erro de Keymaster/entitlement ao iniciar

Não é específico deste script, veja [Primeiros Passos: Erros de Escrow do FiveM](/pt/primeiros-passos/erros-de-escrow). A causa mais comum é iniciar um resource com escrow sem dar um restart completo no servidor.

## Limitações do modo Standalone

Se `Config.Framework` não for `'esx'`, `'qbcore'` nem `'qbox'`, o bnVehicleHistory roda silenciosamente em modo standalone (veja [Instalação](/pt/docs/bnVehicleHistory/instalacao#escolhendo-um-framework)):

- Sem sistema de job: todo mundo resolve pro job `unemployed`, então `Config.MechanicJobs`/`Config.PoliceJobs` nunca conseguem dar match em ninguém. Só a propriedade concede acesso.
- Sem sincronização automática de propriedade (não existe tabela de veículos do framework pra ler), a propriedade só vem dos exports.
- Sem inventário: usar o item `vehicle_document` só reabre o card do documento na hora, em vez de dar um item de verdade.

<Alert type="warning" title="Confira o Config.Framework primeiro">
A maioria dos relatos de "permissão não funciona" ou "ninguém consegue acessar nada" num servidor QBCore/ESX/Qbox acaba sendo um erro de digitação no <code>Config.Framework</code>, caindo silenciosamente pro standalone.
</Alert>
