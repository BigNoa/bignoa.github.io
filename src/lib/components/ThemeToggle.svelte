<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { getInitialTheme, applyTheme, type Theme } from '$lib/theme';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let theme: Theme = $state('light');
	const t = $derived(messagesFor(localeFromPathname(page.url.pathname.slice(base.length) || '/')));

	$effect(() => {
		theme = getInitialTheme(
			localStorage,
			window.matchMedia('(prefers-color-scheme: dark)').matches
		);
		applyTheme(theme);
	});

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		applyTheme(theme);
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={theme === 'dark' ? t.theme.enableLight : t.theme.enableDark}
	class="rounded-md p-2 text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
>
	{#if theme === 'dark'}
		<Sun class="size-4" />
	{:else}
		<Moon class="size-4" />
	{/if}
</button>
