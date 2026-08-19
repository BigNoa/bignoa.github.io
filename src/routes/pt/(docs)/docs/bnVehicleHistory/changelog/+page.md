---
title: bnVehicleHistory - Changelog
---

# Changelog

## 1.0.0 - Lançamento inicial

- Histórico completo de veículos: donos, quilometragem, acidentes, reparos, inspeções e revisão de spec/tuning, numa NUI Svelte pesquisável com 7 abas (Resumo, Modificações, Reparos, Acidentes, Quilometragem, Donos, Documentos), restrita por papel (dono / mecânico / polícia).
- Rastreamento e log automático de quilometragem, com limiar de sync e granularidade de snapshot configuráveis, checagens de plausibilidade no servidor rejeitam deltas forjados/impossíveis.
- Registro automático de acidente em quedas bruscas de saúde do motor, além do `/reportaccident` manual.
- Registro de reparo e inspeção (`/logrepair`, `/loginspection`) com lista fixa de categorias de reparo, espelhado por botões no painel.
- Revisão de especificação do veículo: compara o tuning atual com a última especificação declarada, autobaseia na primeira inspeção e registra automaticamente um reparo categorizado quando um revisor aprova as mudanças.
- Sincronização automática de propriedade contra a própria tabela de veículos do framework (QBCore/Qbox/ESX), autocorrigindo a cada consulta, cobre scripts de concessionária/marketplace que escrevem propriedade diretamente.
- Camada nativa anti-spam e anti-cheat: cooldowns por ação e checagem de proximidade/placa no servidor em toda ação registrada.
- Item `vehicle_document` imprimível, com card de documento compacto na tela.
- Integração opcional com `ox_target` e animação de "checando um tablet" pra abrir o histórico de um veículo sem digitar comando.
- Logs no Discord via webhook pra transferências de propriedade, acidentes, reparos, inspeções, revisões de spec e impressões de documento, incluindo tentativas negadas.
- Suporte multi-framework: ESX, QBCore, Qbox, com fallback automático pra Standalone em qualquer outro caso.
