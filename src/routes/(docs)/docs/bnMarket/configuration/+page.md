---
title: bnMarket - Configuration
---

# Configuration

```lua
Config.Locale = 'en' -- 'en' | 'pt-br'
Config.DefaultGarage = 'garage'
Config.AdminCommand = 'bnmarket'
```

## Purchases

- `Config.PurchaseCooldown`: ms between purchase attempts (default `3000`)
- `Config.MaxPerPlayer`: units of the same vehicle per player, `0` = unlimited (default `1`)
- `Config.RestockInterval`: minutes between stock resets, `0` = disabled (default `0`)
- `Config.PersistStock`: keep stock across restarts (default `true`)
- `Config.CustomPlate.enabled` / `.prefix`: custom plate generation (default off, prefix `'BNM'`)

## Test drive

- `Config.TestDrive.enabled` (default `true`)
- `Config.TestDrive.durationSeconds` (default `120`)
- `Config.TestDrive.cooldownSeconds` (default `300`)
- `Config.TestDrive.controlId`: FiveM control that triggers a test drive (default `47`, the **G** key)

## Financing

- `Config.Financing.enabled` (default `true`)
- `Config.Financing.downPaymentPercent` (default `20`)
- `Config.Financing.installmentsMin` / `.installmentsMax` / `.installmentsDefault` (default `2` / `12` / `6`)
- `Config.Financing.intervalHours`: billing interval (default `24`)
- `Config.Financing.maxMissedPayments`: before repossession (default `5`)
- `Config.Financing.checkIntervalMinutes`: server scan frequency (default `5`)
- `Config.FinancingCommand` (default `'financing'`)

## Tuning

- `Config.Tuning.enabled` (default `true`)
- `Config.Tuning.weights`: probability distribution across factory/partial/full
- `Config.Tuning.partialPriceIncrease` / `.fullPriceIncrease`: % markup (default `10` / `25`)
- `Config.Tuning.partialPartsMin` / `.partialPartsMax` (default `1` / `3`)

## Discord webhooks

- `Config.Webhook.url` / `Config.Webhook.errors.url`: purchase and suspicious-activity logs
- `Config.Webhook.errors.enabled` (default `true`), `.color` (default `15158332`)
- `Config.Webhook.username` (default `'bnMarket'`), `.avatar`, `.color` (default `3066993`)

## Vehicle catalog (`shared/vehs.lua`)

Required per entry: `model`, `coords` (vector4, showroom position + heading), `price`.

Auto-filled from game data if omitted: `name`, `brand`, `class`, `drivetrain`, `stats` (speed/handling/accel/launch/braking/offroad, 0–10).

Optional adjustments: `discount` (%), `stock` (default unlimited), `camOffset`, `blip` (map marker visibility).
