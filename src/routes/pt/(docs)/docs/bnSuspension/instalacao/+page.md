---
title: bnSuspension - Instalação
---

<script>
  import Alert from '$lib/components/Alert.svelte';
</script>

# Instalação

Sistema de suspensão a ar (air ride) standalone para FiveM, com sincronização peer-to-peer entre jogadores via `StateBags` e `Decorators`.

<Alert type="warning" title="Dependências">
Antes de instalar, garanta que <a href="https://github.com/overextended/ox_lib">ox_lib</a> e <a href="https://github.com/overextended/oxmysql">oxmysql</a> estão na versão mais recente.
</Alert>

1. Extraia a pasta `bnSuspension` para `resources/`.
2. Adicione ao `server.cfg` (depois das dependências):

```cfg
ensure ox_lib
ensure oxmysql
ensure bnSuspension
```

3. Reinicie o servidor. A tabela `bnsuspension_settings` é criada automaticamente no banco.

<Alert type="info">
A ordem de start importa: <code>bnSuspension</code> deve iniciar <b>depois</b> do <code>ox_lib</code> e do <code>oxmysql</code>.
</Alert>

## O que é editável

O script é protegido, mas mantém flexibilidade onde importa:

| Arquivo | Status | Descrição |
| --- | --- | --- |
| `config.lua` | Aberto | Configuração completa |
| `locales/*` | Aberto | Traduções |
| `inventory/*` | Aberto | Configuração dos itens |
| `web/*` | Aberto | Código-fonte completo da UI (React) |
| `client/airride.lua` | Bloqueado | Lógica de física e sincronização |
| `server/main.lua` | Bloqueado | Lógica de banco de dados e validação |
