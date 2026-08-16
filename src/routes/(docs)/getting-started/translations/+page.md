---
title: Getting Started - Translations
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import LinkCard from '$lib/components/LinkCard.svelte';
  import GitPullRequest from '@lucide/svelte/icons/git-pull-request';
</script>

# Translations

BigNoa scripts ship with English and Brazilian Portuguese built in, no extra files or locale packs to install.

Each script exposes a single option in `config.lua`:

```lua
Config.Locale = 'en' -- 'en' | 'pt-br'
```

Set it to `'en'` or `'pt-br'` and restart the resource. That's it, every player-facing string in the script switches language.

<Alert type="info" title="Not every script has this option yet">
Locale support is rolled out script by script. Check the specific script's own <b>Configuration</b> page in the sidebar to confirm the option name and supported values before editing it.
</Alert>

Need a language we don't support yet? Request it in the [BigNoa Discord](https://discord.gg/vmJzcj9NmJ).

## Contributing

Translations for all our scripts are handled in the translations repository on GitHub:

<LinkCard href="https://github.com/BigNoa/bnTranslations" title="bnTranslations" subtitle="github.com/BigNoa/bnTranslations" icon={GitPullRequest} />

Before each new release, the latest translations are pulled from this repository. Want to add a new language or improve an existing one? Open a Pull Request with your changes and one of the team will review it.
