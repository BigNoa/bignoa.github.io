---
title: Primeiros Passos - Dependências
---

<script>
  import LinkCard from '$lib/components/LinkCard.svelte';
  import Package from '@lucide/svelte/icons/package';
  import Database from '@lucide/svelte/icons/database';
  import Target from '@lucide/svelte/icons/target';
</script>

# Dependências

A maioria dos scripts da BigNoa é construída em cima das bibliotecas da Overextended abaixo. Confira a página de **Instalação** do script específico pra saber exatamente quais ele usa, nem todo script usa as três.

<LinkCard href="https://github.com/overextended/ox_lib/releases/latest" title="ox_lib" subtitle="github.com/overextended/ox_lib" icon={Package} />

Exigido por quase todo script da BigNoa. Biblioteca de utilidades compartilhada (componentes de UI, callbacks, locales e mais).

<LinkCard href="https://github.com/overextended/oxmysql/releases/latest" title="oxmysql" subtitle="github.com/overextended/oxmysql" icon={Database} />

Exigido sempre que um script grava dados no banco. Usado no lugar do mysql-async ou ghmattimysql.

<LinkCard href="https://github.com/overextended/ox_target/releases/latest" title="ox_target" subtitle="github.com/overextended/ox_target" icon={Target} />

Usado pra interações direcionadas em alguns scripts (ex: bnTruck, bnVehicleHistory). Só precisa dele se a página de instalação do script listar.

Adicione no `server.cfg` **antes** do script da BigNoa, nessa ordem:

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_target
ensure <script-bignoa>
```
