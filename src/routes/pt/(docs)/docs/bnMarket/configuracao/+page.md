---
title: bnMarket - Configuração
---

# Configuração

```lua
Config.Locale = 'pt-br' -- 'en' | 'pt-br'
Config.DefaultGarage = 'garage'
Config.AdminCommand = 'bnmarket'
```

## Compras

- `Config.PurchaseCooldown`: ms entre tentativas de compra (padrão `3000`)
- `Config.MaxPerPlayer`: unidades do mesmo veículo por jogador, `0` = ilimitado (padrão `1`)
- `Config.RestockInterval`: minutos entre reposições de estoque, `0` = desativado (padrão `0`)
- `Config.PersistStock`: mantém o estoque entre restarts (padrão `true`)
- `Config.CustomPlate.enabled` / `.prefix`: geração de placa personalizada (padrão desativado, prefixo `'BNM'`)

## Test-drive

- `Config.TestDrive.enabled` (padrão `true`)
- `Config.TestDrive.durationSeconds` (padrão `120`)
- `Config.TestDrive.cooldownSeconds` (padrão `300`)
- `Config.TestDrive.controlId`: controle do FiveM que aciona o test-drive (padrão `47`, tecla **G**)

## Financiamento

- `Config.Financing.enabled` (padrão `true`)
- `Config.Financing.downPaymentPercent` (padrão `20`)
- `Config.Financing.installmentsMin` / `.installmentsMax` / `.installmentsDefault` (padrão `2` / `12` / `6`)
- `Config.Financing.intervalHours`: intervalo de cobrança (padrão `24`)
- `Config.Financing.maxMissedPayments`: limite antes da retomada (padrão `5`)
- `Config.Financing.checkIntervalMinutes`: frequência de checagem no servidor (padrão `5`)
- `Config.FinancingCommand` (padrão `'financing'`)

## Tuning

- `Config.Tuning.enabled` (padrão `true`)
- `Config.Tuning.weights`: distribuição de probabilidade entre factory/partial/full
- `Config.Tuning.partialPriceIncrease` / `.fullPriceIncrease`: acréscimo % (padrão `10` / `25`)
- `Config.Tuning.partialPartsMin` / `.partialPartsMax` (padrão `1` / `3`)

## Webhooks do Discord

- `Config.Webhook.url` / `Config.Webhook.errors.url`: logs de compras e atividade suspeita
- `Config.Webhook.errors.enabled` (padrão `true`), `.color` (padrão `15158332`)
- `Config.Webhook.username` (padrão `'bnMarket'`), `.avatar`, `.color` (padrão `3066993`)

## Catálogo de veículos (`shared/vehs.lua`)

Obrigatório por entrada: `model`, `coords` (vector4, posição no showroom + heading), `price`.

Preenchido automaticamente a partir do jogo, se omitido: `name`, `brand`, `class`, `drivetrain`, `stats` (speed/handling/accel/launch/braking/offroad, 0–10).

Ajustes opcionais: `discount` (%), `stock` (padrão ilimitado), `camOffset`, `blip` (visibilidade no mapa).
