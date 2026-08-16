import { mdsvex } from 'mdsvex';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createHighlighter } from 'shiki';
import rehypeSlug from 'rehype-slug';

const supportedLangs = ['lua', 'javascript', 'json', 'bash'];

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;
function getHighlighter() {
	highlighterPromise ??= createHighlighter({
		themes: ['vitesse-dark'],
		langs: supportedLangs
	});
	return highlighterPromise;
}

async function highlighter(code: string, lang: string | null | undefined) {
	const hl = await getHighlighter();
	const safeLang = lang && supportedLangs.includes(lang) ? lang : 'text';
	const html = hl.codeToHtml(code, { lang: safeLang, theme: 'vitesse-dark' });
	// mdsvex inlines this HTML directly into Svelte markup, where `{`/`}` are
	// mustache syntax: escape them so Lua tables like `Config = {}` don't break the compiler.
	const escaped = html.replace(/\{/g, '&lbrace;').replace(/\}/g, '&rbrace;');
	// shiki's <pre> has tabindex="0" (keyboard-scrollable overflow, per WAI-ARIA). The
	// a11y linter flags tabindex on a non-interactive element, but this usage is correct.
	return `<!-- svelte-ignore a11y_no_noninteractive_tabindex -->\n${escaped}`;
}

// GitHub Pages project sites are served from /<repo-name>; set BASE_PATH in CI.
const envBase = process.env.BASE_PATH;
const base: '' | `/${string}` = envBase && envBase.startsWith('/') ? (envBase as `/${string}`) : '';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter({ fallback: '404.html' }),
			// relative:false, pois o base path já é fixado em build-time via BASE_PATH (CI);
			// no modo relativo (padrão do SvelteKit) `base`/`assets` mudam por página
			// (ex.: "../.."), o que quebra qualquer código que compare/derive rotas a
			// partir de page.url.pathname (Sidebar, Breadcrumb, DocPager).
			paths: { base, relative: false },
			preprocess: [
				mdsvex({ extensions: ['.svx', '.md'], highlight: { highlighter }, rehypePlugins: [rehypeSlug] })
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
