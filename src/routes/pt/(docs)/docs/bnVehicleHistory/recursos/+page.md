---
title: bnVehicleHistory - Sistemas e Recursos
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Sistemas e Recursos

## O painel de histórico

`/vehiclehistory`, a opção do `ox_target` e o item `vehicle_document` abrem a mesma NUI em Svelte, restrita ao que quem está vendo tem permissão de ver (veja [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos)). Ela tem sete abas:

| Aba | Mostra |
| --- | --- |
| Resumo | Linha do tempo recente (reparos, acidentes, revisões de spec) e status da inspeção num relance. |
| Modificações | Histórico completo de diffs de spec: toda mudança de tuning declarado vs. ao vivo, quem mudou e quando. |
| Reparos | Log completo de reparos: tipo de serviço, categoria, custo, peças, mecânico. |
| Acidentes | Log completo de acidentes: descrição, dano, localização, quem se envolveu e quem reportou. |
| Quilometragem | Quilometragem atual, distância percorrida desde o registro, média mensal e o log bruto. |
| Donos | Histórico de propriedade (só visível pro dono atual e pra polícia, veja a matriz de acesso em Comandos e Permissões). |
| Documentos | Histórico de aprovação/reprovação de inspeção e os controles de aprovar/rejeitar revisão de spec. |

## Rastreamento de quilometragem

`client/mileage.lua` amostra o veículo a cada segundo enquanto você dirige, mas só envia dados pro servidor em lotes:

```lua
Config.MileageSyncThresholdKm = 0.5   -- envia pro servidor depois de acumular essa distância
Config.MileageLogIntervalKm = 10      -- intervalo mínimo entre snapshots logados (bn_vh_mileage_log)
```

A distância só conta enquanto o veículo está no chão (`IsVehicleOnAllWheels`), então voar, dar noclip ou cair não soma quilometragem. Trocar de veículo zera o buffer em vez de carregar a distância sobrando pra placa nova. `current_mileage` na `bn_vh_vehicles` atualiza a cada envio; uma linha só entra em `bn_vh_mileage_log` (o gráfico de histórico) quando a distância acumulada passa `Config.MileageLogIntervalKm`, assim o log não cresce a cada sync.

O servidor também rejeita deltas implausíveis por conta própria (mais de 50km num único pacote, ou velocidade média acima de 400km/h desde o último sync aceito), então um client modificado não consegue simplesmente reportar quilometragem arbitrária.

## Detecção de acidente

Duas formas de um acidente entrar no histórico de um veículo:

- **Automática**: `client/damage.lua` verifica a saúde do motor a cada segundo. Uma queda num único tick de `Config.AccidentHealthDropThreshold` (padrão `200`, numa escala de 0-1000 do motor) ou mais registra um acidente automaticamente com suas coordenadas atuais.
- **Manual**: a polícia roda `/reportaccident [placa] [descrição]`, ou usa o botão no painel enquanto está perto do veículo.

Os dois caminhos escrevem na mesma tabela `bn_vh_accidents` e postam no Discord da mesma forma.

## Revisão de especificação do veículo

Mecânicos e policiais podem comparar o tuning atual de um veículo com a última especificação **declarada** (cor, rodas, película, neon, livery, extras e slots de mods de kit de carroceria/performance, veja `shared/spec.lua` pra lista exata de campos). Desgaste de motor e nível de combustível ficam de fora de propósito, eles variam sozinhos e nunca deixariam de mostrar um diff.

Na primeira vez que um veículo é revisado sem especificação declarada ainda, o que está no carro naquele momento vira a spec declarada automaticamente, sem precisar de um passo manual de "registrar". A partir daí:

- **Aprovar** com mudanças pendentes: a spec nova vira a declarada, *e* uma entrada de reparo é registrada automaticamente pro diff, categorizada como `suspensao`, `performance` ou `estetica` dependendo de quais campos mudaram (veja `SpecReview.CategorizeDiff`).
- **Rejeitar**: a spec declarada fica intacta. A divergência continua visível na aba Modificações, útil pra pegar tuning não declarado ou ilegal numa abordagem.

## Sincronização automática de propriedade

`RegisterVehicle`/`TransferOwnership` (veja [Exports](/pt/docs/bnVehicleHistory/exports)) são envios explícitos e opcionais. Independente disso, em toda consulta (`/vehiclehistory`, `/reportaccident`, `/logrepair`, `/loginspection`, sync de quilometragem) o bnVehicleHistory também lê a tabela de veículos ao vivo do próprio framework (`player_vehicles.citizenid` no QBCore/Qbox, `owned_vehicles.owner` no ESX) e se autocorrige na `bn_vh_vehicles` caso ela esteja divergente, ou a placa nunca tenha sido vista antes.

Isso cobre scripts de concessionária/marketplace que escrevem a propriedade diretamente (ex: `qbx_vehiclesales`, `esx_vehicleshop`) sem você precisar conectar cada um deles manualmente. O modo Standalone não tem essa tabela pra ler, então depende inteiramente dos exports manuais.

## Camada anti-spam e anti-cheat

`server/netguard.lua` protege toda escrita disparada por jogador:

- **Checagem de proximidade**: registrar reparo, acidente, inspeção ou revisão de spec exige uma leitura real de `GetVehicleProperties` de um veículo a até 5 metros com a placa exata em que você está agindo. Sem leitura ao vivo por perto, a ação falha com `not_near_vehicle`, isso não dá pra forjar por um client modificado, já que a checagem acontece no servidor contra a placa que o client alega estar perto.
- **Cooldowns**: cada tipo de ação (`mileage`, `accident`, `reportaccident`, `repair`, `inspection`, `specreview`, `document`) é limitado por jogador, de 1 segundo (sync de quilometragem) a 3 segundos (todo o resto). Spammar uma ação retorna `too_fast` em vez de gravar linhas duplicadas.
- **Checagem de direção**: a detecção automática de quilometragem/acidente também verifica se quem está reportando é de fato o motorista daquela placa exata (`NetGuard.IsDrivingPlate`), não só alguém parado por perto.

Nada disso é configurável, é uma base fixa contra clients modificados e não é pra ser afrouxada.
