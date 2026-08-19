---
title: bnVehicleHistory - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Instalação

Histórico completo de veículos (donos, quilometragem, acidentes, reparos, inspeções e revisão de spec/tuning) com uma NUI pesquisável restrita por papel (dono / mecânico / polícia).

1. Copie o `bnVehicleHistory` pra sua pasta `resources`, mantendo o nome da pasta como está.
2. Adicione ao `server.cfg`, respeitando a ordem de carregamento:

```lua
ensure ox_lib
ensure oxmysql
ensure bnVehicleHistory
```

<Alert type="info" title="Tabelas do banco de dados">
As tabelas são criadas automaticamente no primeiro start (<code>server/database.lua</code> roda o schema via <code>MySQL.ready</code>). Sem precisar de importação manual de SQL. O <code>sql/install.sql</code> fica só como cópia de referência.
</Alert>

<Alert type="warning" title="Atualizando uma instalação existente em MySQL 8 puro">

As migrações de schema usam <code>ALTER TABLE ... ADD COLUMN IF NOT EXISTS</code>, uma extensão exclusiva do MariaDB (o padrão típico do FiveM/txAdmin). Uma instalação nova não é afetada de qualquer forma. Se você está atualizando uma instalação <b>existente</b> rodando MySQL 8 puro (não MariaDB), adicione essas colunas manualmente:

```sql
ALTER TABLE bn_vh_vehicles ADD COLUMN `model` VARCHAR(50) DEFAULT NULL;
ALTER TABLE bn_vh_vehicles ADD COLUMN `last_known_health` FLOAT DEFAULT NULL;
ALTER TABLE bn_vh_vehicles ADD COLUMN `declared_spec` TEXT DEFAULT NULL;
ALTER TABLE bn_vh_repairs ADD COLUMN `category` VARCHAR(30) DEFAULT NULL;
```
</Alert>

3. Configure o resource pelo `config.lua`. Veja [Configuração](/pt/docs/bnVehicleHistory/configuracao).
4. Reinicie o resource:

```lua
restart bnVehicleHistory
```

## Escolhendo um framework

```lua
Config.Framework = 'qbox' -- 'esx' | 'qbcore' | 'qbox'
```

Só esses três valores são reconhecidos. Qualquer outra coisa, incluindo string vazia ou `'standalone'`, faz o `bridge/standalone.lua` assumir automaticamente (ele imprime um aviso no console do servidor quando isso acontece). O modo Standalone não tem sistema de job/identidade nem inventário nativo, a propriedade passa a depender inteiramente dos exports em [Exports](/pt/docs/bnVehicleHistory/exports) em vez da sincronização automática com o framework descrita em [Sistemas e Recursos](/pt/docs/bnVehicleHistory/recursos).

## Próximos passos

Depois de rodando, vá em [Integrações](/pt/docs/bnVehicleHistory/integracoes) pra registrar o item `vehicle_document` e configurar `ox_target`/Discord, e em [Comandos e Permissões](/pt/docs/bnVehicleHistory/comandos) pra definir quem pode fazer o quê.
