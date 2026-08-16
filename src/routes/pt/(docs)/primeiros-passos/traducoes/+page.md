---
title: Primeiros Passos - Traduções
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
</script>

# Traduções

Os scripts da BigNoa já vêm com inglês e português (BR) embutidos, sem arquivo extra ou pacote de idioma pra instalar.

Cada script expõe uma única opção no `config.lua`:

```lua
Config.Locale = 'en' -- 'en' | 'pt-br'
```

Basta definir `'en'` ou `'pt-br'` e reiniciar o resource. Pronto, todas as strings voltadas ao jogador mudam de idioma.

<Alert type="info" title="Nem todo script tem essa opção ainda">
O suporte a idioma vai sendo liberado script por script. Confira a página de <b>Configuração</b> do script específico na sidebar pra confirmar o nome da opção e os valores suportados antes de editar.
</Alert>

Precisa de um idioma que ainda não suportamos? Peça no [Discord da BigNoa](https://discord.gg/vmJzcj9NmJ).

## Contribuindo

As traduções de todos os nossos scripts são feitas no repositório de traduções no GitHub:

<LinkCard href="https://github.com/BigNoa/bnTranslations" title="bnTranslations" subtitle="github.com/BigNoa/bnTranslations" icon={GitPullRequest} />

Antes de cada novo release, as traduções mais recentes são puxadas desse repositório. Quer adicionar um idioma novo ou melhorar um existente? Abra um Pull Request com suas alterações e alguém da equipe vai revisar.
