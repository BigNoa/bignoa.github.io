# BigNoa Docs

Site de documentação estático da BigNoa (scripts FiveM), construído com SvelteKit + Tailwind CSS + mdsvex, publicado no GitHub Pages.

## Estrutura de conteúdo

- `src/routes/+page.svelte`: home.
- `src/routes/(docs)/termos/+page.md`: Termos de Uso.
- `src/routes/(docs)/docs/<script>/{instalacao,configuracao,exports,changelog}/+page.md`: documentação de cada script (`bnSuspension`, `bnExhaust`, `bnTruck`).
- `src/lib/nav.ts`: estrutura da barra lateral; edite aqui ao adicionar uma página nova.
- `src/lib/components/Alert.svelte` e `TabGroup.svelte`: componentes disponíveis dentro de qualquer arquivo `.md` (importe-os no bloco `<script>` do próprio arquivo).

Blocos de código com \`\`\`lua, \`\`\`javascript ou \`\`\`json recebem realce de sintaxe automaticamente via Shiki.

## Desenvolvendo

```sh
npm install
npm run dev -- --open
```

## Build

```sh
npm run build   # gera o site estático em /build
npm run preview # serve o build localmente
npm run check   # type-check
npm run lint    # prettier + eslint
```

## Deploy

O deploy é automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push em `main`: builda o site com `BASE_PATH=/<nome-do-repo>` e publica no GitHub Pages.

Nas configurações do repositório, em **Settings → Pages**, defina a fonte como **GitHub Actions**.
