---
title: bnVehicleHistory - Changelog
---

# Changelog

## 1.0.0 - Initial release

- Full vehicle history: owners, mileage, accidents, repairs, and inspections, in a searchable Svelte NUI gated by role (owner / mechanic / police).
- Automatic mileage tracking and logging, with configurable sync and snapshot granularity.
- Accident auto-logging on sudden engine health drops, plus manual `/reportaccident`.
- Repair and inspection logging (`/logrepair`, `/loginspection`) with a fixed repair-category list.
- Vehicle spec review: diffs a vehicle's current tuning against its last declared spec and auto-logs a repair entry when a reviewer approves changes.
- Automatic ownership sync against the framework's own vehicle table (QBCore/Qbox/ESX), self-healing on every lookup.
- Printable `vehicle_document` item with a compact on-screen document card.
- Optional `ox_target` integration to open a vehicle's history without typing a command.
- Discord webhook logs for ownership transfers, accidents, repairs, and inspections.
- Multi-framework support: ESX, QBCore, Qbox, and Standalone.
