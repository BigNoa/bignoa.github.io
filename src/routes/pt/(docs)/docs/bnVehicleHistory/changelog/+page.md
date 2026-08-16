---
title: bnVehicleHistory - Changelog
---

# Changelog

## 1.0.0 - Lançamento inicial

- Histórico completo de veículos: donos, quilometragem, acidentes, reparos e inspeções, numa NUI Svelte pesquisável restrita por papel (dono / mecânico / polícia).
- Rastreamento e log automático de quilometragem, com granularidade de sync e snapshot configurável.
- Registro automático de acidente em quedas bruscas de saúde do motor, além do `/reportaccident` manual.
- Registro de reparo e inspeção (`/logrepair`, `/loginspection`) com lista fixa de categorias de reparo.
- Revisão de especificação do veículo: compara o tuning atual com a última especificação declarada e registra automaticamente um reparo quando um revisor aprova as mudanças.
- Sincronização automática de propriedade contra a própria tabela de veículos do framework (QBCore/Qbox/ESX), autocorrigindo a cada consulta.
- Item `vehicle_document` imprimível, com card de documento compacto na tela.
- Integração opcional com `ox_target` pra abrir o histórico de um veículo sem digitar comando.
- Logs no Discord via webhook pra transferências de propriedade, acidentes, reparos e inspeções.
- Suporte multi-framework: ESX, QBCore, Qbox e Standalone.
