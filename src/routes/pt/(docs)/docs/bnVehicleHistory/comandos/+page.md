---
title: bnVehicleHistory - Comandos e Permissões
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Comandos e Permissões

## Comandos

<Alert type="info" title="A UI é a forma principal de usar o bnVehicleHistory">
No dia a dia, tudo deve passar pela NUI: abra ela com <code>/vehiclehistory</code> ou pela opção do <code>ox_target</code>, depois use os botões nas abas Documentos/Modificações pra reportar acidente, registrar reparo, registrar inspeção ou revisar spec. Os três comandos de ação abaixo (<code>/reportaccident</code>, <code>/logrepair</code>, <code>/loginspection</code>) existem como backup pelo chat, pra quando um jogador não consegue foco de NUI, é um cenário scriptado, ou você está resolvendo um problema sem abrir o painel. Os dois caminhos chamam exatamente a mesma lógica no servidor e as mesmas checagens de permissão, então nada se perde usando um ou outro.
</Alert>

| Comando | Acesso | Descrição |
| --- | --- | --- |
| `/vehiclehistory [placa]` | Dono / mecânico / polícia | Abre a UI de histórico da placa informada, ou do veículo que você está dirigindo se omitida. É o ponto de entrada principal. |
| `/reportaccident [placa] [descrição]` | Só polícia | Backup do botão "Reportar acidente" da NUI. |
| `/logrepair [placa] [tipo de serviço] [categoria] [custo] [peças]` | Só mecânico | Backup do botão "Registrar reparo" da NUI. `categoria` é uma de `performance`, `estetica`, `suspensao`, `motor`, `outro`. |
| `/loginspection [placa] [pass\|fail]` | Mecânico ou polícia | Backup dos botões de aprovar/reprovar inspeção da NUI, válido por `Config.DefaultInspectionValidDays`. |

## Quem pode fazer o quê

```lua
Config.MechanicJobs = { 'mechanic' }
Config.PoliceJobs = { 'police' }
```

| Ação | Dono | Mecânico (`Config.MechanicJobs`) | Polícia (`Config.PoliceJobs`) |
| --- | --- | --- | --- |
| Ver histórico do próprio veículo | Sim | Sim (qualquer placa) | Sim (qualquer placa) |
| Ver histórico completo de donos (donos anteriores) | Sim, só do próprio veículo | Não | Sim, qualquer placa |
| Registrar reparo | Não | Sim | Não |
| Reportar acidente | Não | Não | Sim |
| Registrar inspeção | Não | Sim | Sim |
| Revisar spec do veículo (aprovar/rejeitar tuning) | Não | Sim | Sim |

Um jogador que não é nem dono nem está em nenhuma das listas de job recebe `not_authorized` pra placa de outra pessoa. O acesso de mecânico e polícia não fica limitado aos próprios veículos por design, é isso que permite que uma oficina ou uma abordagem de trânsito consulte qualquer placa.

<Alert type="info" title="Por que dois erros diferentes">
Consultar uma placa que nunca foi registrada retorna <code>vehicle_not_found</code>, mas só pra mecânico/polícia. Um civil recebe <code>not_authorized</code> em ambos os casos, assim uma busca de placa não pode ser usada pra descobrir quais placas existem no banco de dados.
</Alert>

## Exemplo de fluxo em RP

Um policial para um carro numa abordagem de rotina:

1. `/vehiclehistory ABC1234`: a placa não é do motorista, mas o comando funciona porque o job do policial está em `Config.PoliceJobs`. O painel abre mostrando o histórico completo de donos, não só o atual.
2. O histórico de donos mostra duas transferências anteriores e o dono atual não bate com o ID do motorista. Vale uma pergunta a mais no RP.
3. O policial repara que o para-choque dianteiro não bate com a especificação declarada e abre a aba de **revisão de spec**. O diff mostra uma troca de `modFrontBumper` não declarada. Rejeitar deixa essa divergência registrada pra depois.
4. De volta à delegacia, o policial roda `/reportaccident ABC1234 batida na traseira no cais`: registrado com a localização dele, com timestamp, e (se `Config.DiscordWebhook` estiver configurado) postado no canal de auditoria do servidor.

Uma oficina atende um cliente que chegou sem hora marcada:

1. `/vehiclehistory ABC1234` no elevador: o job do mecânico está em `Config.MechanicJobs`, então funciona em qualquer placa, não só nos veículos dele.
2. O histórico de serviço mostra que a última inspeção venceu há 12 dias (`Config.DefaultInspectionValidDays` já tinha passado).
3. `/logrepair ABC1234 "retífica da suspensão" suspensao 3500 "amortecedores, buchas"`: registrado com o identificador do mecânico anexado.
4. `/loginspection ABC1234 pass`: renova a janela de validade da inspeção.

<Alert type="warning" title="Reparo, acidente, inspeção e revisão de spec exigem estar perto do veículo">
Registrar qualquer uma dessas quatro ações, pelo comando ou pela NUI, exige uma leitura ao vivo do veículo real: você (ou o veículo) precisa estar a até 5 metros e a placa tem que bater. Longe demais e a ação falha com <code>not_near_vehicle</code>, isso não é bug de permissão. Chamadas de export confiáveis (sem <code>source</code> de jogador, veja <a href="/pt/docs/bnVehicleHistory/exports">Exports</a>) pulam essa checagem.
</Alert>
