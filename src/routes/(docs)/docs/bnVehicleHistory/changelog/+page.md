---
title: bnVehicleHistory - Changelog
---

# Changelog

## 1.0.0 - Initial release

- Full vehicle history: owners, mileage, accidents, repairs, inspections, and spec/tuning review, in a searchable Svelte NUI with 7 tabs (Summary, Modifications, Repairs, Accidents, Mileage, Owners, Documents), gated by role (owner / mechanic / police).
- Automatic mileage tracking and logging, with configurable sync threshold and snapshot granularity, server-side plausibility checks reject spoofed/impossible deltas.
- Accident auto-logging on sudden engine health drops, plus manual `/reportaccident`.
- Repair and inspection logging (`/logrepair`, `/loginspection`) with a fixed repair-category list, mirrored by in-panel buttons.
- Vehicle spec review: diffs a vehicle's current tuning against its last declared spec, auto-baselines on first inspection, and auto-logs a categorized repair entry when a reviewer approves changes.
- Automatic ownership sync against the framework's own vehicle table (QBCore/Qbox/ESX), self-healing on every lookup, covers dealership/marketplace scripts that write ownership directly.
- Built-in anti-spam and anti-cheat layer: per-action cooldowns and a server-side proximity/plate check on every recorded action.
- Printable `vehicle_document` item with a compact on-screen document card.
- Optional `ox_target` integration and a "checking a tablet" animation to open a vehicle's history without typing a command.
- Discord webhook logs for ownership transfers, accidents, repairs, inspections, spec reviews, and document prints, including denied attempts.
- Multi-framework support: ESX, QBCore, Qbox, with an automatic Standalone fallback for anything else.
