---
title: bnMarket - How to Use
---

# How to Use

## For players

- Walk up to any showroom vehicle and press **E** to open the market UI.
- **Buy outright** or choose **financing** with a custom installment plan.
- Press **G** near a vehicle for a free, timed test drive. The car returns automatically when it ends. While a unit is being tested, other players can't access it.
- Check active payment plans with `/meusfinanciamentos`. Installments are billed automatically from the player's bank account every `Config.Financing.intervalHours` hours; exceeding `Config.Financing.maxMissedPayments` triggers repossession.

## Admin commands

Gated by the `command.bnmarket` ACE permission (see [Installation](/docs/bnMarket/installation)):

| Subcommand | Purpose |
|------------|---------|
| `list` | Prints current vehicle inventory to console |
| `restock` | Forces a restock, for one vehicle or the whole catalog |
| `webhook` | Sends a test message to the configured Discord webhook |

Showroom vehicles display map blips when in stock, if `blip` is enabled for that entry.
