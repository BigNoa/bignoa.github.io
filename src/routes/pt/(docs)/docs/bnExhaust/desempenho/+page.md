---
title: bnExhaust - Desempenho e Som
---

# Desempenho e Som

## Estágios de performance

```lua
Config.StageStress = {
    Enabled = true,
    TickMs = 1000,
    MinRPM = 0.45,
    MinThrottle = 0.65,
    MinEngineHealth = 350.0
}
```

O stress só é aplicado enquanto o motor está em alta aceleração/alta RPM.

| Estágio | Requisitos | Comportamento |
| --- | --- | --- |
| Stage 0 | Veículo de fábrica | Sem ganho extra de potência, som, handling ou stress. |
| Stage 1 | ECU | Tuning leve de rua, resposta de acelerador melhorada. |
| Stage 2 | ECU + Downpipe | Tuning forte de rua, mais potência, som mais alto, stress moderado. |
| Stage 3 | ECU + ALS + Turbo + Downpipe | Tuning agressivo, ALS mais forte, som mais alto, stress mecânico maior. |

Cada estágio pode alterar multiplicadores de torque/potência/volume, bônus de burst de pop, intensidade e escala do ALS, RPM padrão do 2-Step, multiplicadores de handling, consumo de combustível, ganho de calor e desgaste do motor.

## Efeitos (`shared/config/effects.lua`)

**Pops & Bangs** (`Config.Pops`): faixa de RPM, velocidade mínima, delay de inércia no lift-off, contagem/intervalo/cooldown de burst, volume, pitch, escala de chama e chance/multiplicadores de bang mais forte. A ativação padrão usa RPM normalizado entre `0.65` e `0.95` com velocidade mínima de `60 km/h`.

**Shift Bang** (`Config.Shift`): o pop/som de válvula extra após uma troca de marcha pra cima: estado ativo, RPM mínimo, volume de pop/válvula, delay, probabilidade.

**2-Step** (`Config.TwoStep`): o limitador parado: RPM padrão/mínimo/máximo, delays de corte de RPM baixo/alto, volume, escala de chama.

**Launch Control** (`Config.LaunchControl`): RPM de largada padrão/mínimo/máximo, volume, escala de chama e o limiar de wheelspin usado pelos efeitos de largada.

**Valet Mode**

```lua
Config.ValetMode = {
    MaxSpeed = 50.0 / 3.6
}
```

**Anti-Lag** (`Config.AntiLag`): RPM mínimo, tecla de ativação (padrão `G`), intervalo de burst, intensidade, escala de chama e se o ALS ignora a inércia do pop.

**Sons ambientes** (`Config.Ambient`): áudio mecânico contínuo: Gear Whine, Mechanical Coast, Waste Gate.

## Presets de som (`shared/sounds.lua`)

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

| Preset | Notas |
| --- | --- |
| `car_01` | Padrão: pop e limiter mais baixos/rally, mais dump valve, wastegate, gear whine e mechanical coast. |
| `car_02` | Conjunto alternativo de escapamento, limiter, dump valve e turbo valve. |
| `car_03` | Sons de escapamento focados em high/rally, com comportamento de fallback pro som de turbo/marcha. |

Presets baseados em intensidade podem usar `LOW`, `RALLY` ou `HI`, com limiares definidos em `Config.IntensityThresholds`.
