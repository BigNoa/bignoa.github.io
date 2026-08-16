<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import SearchDialog from '$lib/components/SearchDialog.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';
	import Menu from '@lucide/svelte/icons/menu';
	import PanelLeftOpen from '@lucide/svelte/icons/panel-left-open';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { searchState } from '$lib/searchStore.svelte';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	const LOCALE_STORAGE_KEY = 'bignoa-locale';
	const SIDEBAR_COLLAPSED_KEY = 'bignoa-sidebar-collapsed';

	let { children } = $props();
	let sidebarOpen = $state(false);
	let sidebarCollapsed = $state(false);

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));

	$effect(() => {
		try {
			sidebarCollapsed = localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
		} catch {
			// ignora se storage não estiver disponível
		}
	});

	$effect(() => {
		try {
			localStorage.setItem(SIDEBAR_COLLAPSED_KEY, sidebarCollapsed ? '1' : '0');
		} catch {
			// ignora se storage não estiver disponível
		}
	});

	// Só a home confere a preferência salva. Nunca força redirect numa página
	// de conteúdo profunda que o usuário tenha aberto de propósito.
	$effect(() => {
		if (relativePathname !== '/' && relativePathname !== '/pt') return;
		try {
			const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
			if ((stored === 'pt' || stored === 'en') && stored !== locale) {
				goto(`${base}${stored === 'pt' ? '/pt' : '/'}`, { replaceState: true });
			}
		} catch {
			// ignora se storage não estiver disponível
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			searchState.open = true;
		}
	}
</script>

<svelte:head><link rel="icon" type="image/svg+xml" href={favicon} /></svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="flex min-h-screen bg-bg text-fg">
	<Sidebar bind:open={sidebarOpen} bind:collapsed={sidebarCollapsed} />

	<div class="flex min-w-0 flex-1 flex-col">
		<header
			class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur"
		>
			<div class="flex items-center gap-1">
				<button
					aria-label={t.header.openMenuAria}
					class="p-2 text-fg hover:bg-surface-hover lg:hidden"
					onclick={() => (sidebarOpen = true)}
				>
					<Menu class="size-5" />
				</button>
				{#if sidebarCollapsed}
					<button
						aria-label={t.header.expandMenuAria}
						class="hidden rounded-md p-2 text-fg-muted hover:bg-surface-hover hover:text-fg lg:flex"
						onclick={() => (sidebarCollapsed = false)}
					>
						<PanelLeftOpen class="size-5" />
					</button>
				{/if}
			</div>
			<div class="flex items-center gap-1">
				<LanguageSwitcher />
				<ThemeToggle />
			</div>
		</header>

		<main class="flex-1">
			{@render children()}
		</main>
	</div>
	<SearchDialog bind:open={searchState.open} />
</div>

<CookieBanner />
