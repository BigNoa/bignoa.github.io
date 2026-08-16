---
title: bnExhaust - Performance & Sound
---

# Performance & Sound

## Performance Stages

```lua
Config.StageStress = {
    Enabled = true,
    TickMs = 1000,
    MinRPM = 0.45,
    MinThrottle = 0.65,
    MinEngineHealth = 350.0
}
```

Stress only applies while the engine is under high throttle/high RPM.

| Stage | Requirements | Behavior |
| --- | --- | --- |
| Stage 0 | Stock vehicle | No extra power, sound gain, handling, or stress. |
| Stage 1 | ECU | Mild street tune, improved throttle response. |
| Stage 2 | ECU + Downpipe | Strong road tune, more power, louder output, moderate stress. |
| Stage 3 | ECU + ALS + Turbo + Downpipe | Aggressive tune, stronger ALS, louder output, higher mechanical stress. |

Each stage can change torque/power/volume multipliers, pop burst bonus, ALS intensity and scale, default 2-Step RPM, handling multipliers, fuel drain, heat gain, and engine wear.

## Effects (`shared/config/effects.lua`)

**Pops & Bangs** (`Config.Pops`): RPM range, minimum speed, lift-off inertia delay, burst count/interval/cooldown, volume, pitch, flame scale, and louder-bang chance/multipliers. Default activation uses normalized RPM `0.65`–`0.95` at a minimum speed of `60 km/h`.

**Shift Bang** (`Config.Shift`): the extra pop/valve sound after an upshift: enabled state, minimum RPM, pop/valve volume, delay, probability.

**2-Step** (`Config.TwoStep`): the stationary limiter: default/min/max RPM, low/high RPM cut delays, volume, flame scale.

**Launch Control** (`Config.LaunchControl`): default/min/max launch RPM, volume, flame scale, and the wheelspin threshold used by launch effects.

**Valet Mode**

```lua
Config.ValetMode = {
    MaxSpeed = 50.0 / 3.6
}
```

**Anti-Lag** (`Config.AntiLag`): minimum RPM, activation key (default `G`), burst interval, intensity, flame scale, and whether ALS ignores pop inertia.

**Ambient Sounds** (`Config.Ambient`): continuous mechanical audio: Gear Whine, Mechanical Coast, Waste Gate.

## Sound Presets (`shared/sounds.lua`)

```lua
Config.Volume = {
    Master = 0.1,
    Pops = 0.2,
    Limiter = 0.2,
    TurboValve = 0.1,
    DumpValve = 0.1,
    WasteGate = 0.1,
    GearWhine = 0.1,
    MechanicalCoast = 0.1
}

Config.DefaultPreset = 'car_01'
```

| Preset | Notes |
| --- | --- |
| `car_01` | Default: low/rally pop and limiter sounds plus dump valve, wastegate, gear whine, and mechanical coast. |
| `car_02` | Alternative exhaust, limiter, dump valve, and turbo valve set. |
| `car_03` | High/rally focused exhaust sounds with fallback turbo/gear sound behavior. |

Intensity-based presets can use `LOW`, `RALLY`, or `HI`, with thresholds set in `Config.IntensityThresholds`.
