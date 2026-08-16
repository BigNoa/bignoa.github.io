---
title: bnSuspension - Exports
---

# Exports

Functions exposed for integration with other resources.

## `useStanceKit`

Runs the install logic on the player's current vehicle (client-side).

```lua
exports['bnSuspension']:useStanceKit()
```

## `useStanceController`

Opens the remote controller menu. If the player is on foot, it automatically finds the nearest installed vehicle.

```lua
exports['bnSuspension']:useStanceController()
```
