<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import House from '@lucide/svelte/icons/house';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import Rocket from '@lucide/svelte/icons/rocket';
	import Flame from '@lucide/svelte/icons/flame';
	import MoveVertical from '@lucide/svelte/icons/move-vertical';
	import Truck from '@lucide/svelte/icons/truck';
	import Tag from '@lucide/svelte/icons/tag';
	import History from '@lucide/svelte/icons/history';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import FileText from '@lucide/svelte/icons/file-text';
	import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
	import Search from '@lucide/svelte/icons/search';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import { scripts, gettingStartedKeys } from '$lib/nav';
	import { searchState } from '$lib/searchStore.svelte';
	import { localeFromPathname, messagesFor } from '$lib/i18n';
	import Logo from '$lib/components/Logo.svelte';
	import RocketNodeBanner from '$lib/components/RocketNodeBanner.svelte';

	let {
		open = $bindable(false),
		collapsed = $bindable(false)
	}: { open?: boolean; collapsed?: boolean } = $props();

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));
	const localePrefix = $derived(locale === 'pt' ? '/pt' : '');

	const topLinks = $derived([
		{ href: locale === 'pt' ? '/pt' : '/', label: t.nav.home, icon: House },
		{ href: `${localePrefix}/${locale === 'pt' ? 'termos' : 'terms'}`, label: t.nav.terms, icon: ScrollText }
	]);

	const gettingStartedBase = $derived(`${localePrefix}/${locale === 'pt' ? 'primeiros-passos' : 'getting-started'}`);
	const gettingStartedItems = $derived(
		gettingStartedKeys.map((key) => ({
			key,
			href: `${gettingStartedBase}/${t.gettingStartedLabels[key].slug}`,
			label: t.gettingStartedLabels[key].label
		}))
	);

	const scriptIcons: Record<string, typeof House> = {
		bnSuspension: MoveVertical,
		bnExhaust: Flame,
		bnTruck: Truck,
		bnMarket: Tag,
		bnVehicleHistory: History
	};

	const footerLinks = $derived([
		{ icon: ShoppingBag, label: t.nav.tebexStore, href: 'https://bignoa.tebex.io' },
		{ icon: MessageCircle, label: t.nav.discordSupport, href: 'https://discord.gg/vmJzcj9NmJ' }
	]);

	let openSlug: string | null = $state(null);
	const isGettingStartedOpen = $derived(openSlug === 'getting-started');

	function isActive(href: string) {
		return relativePathname === href;
	}

	function currentScriptSlug(pathname: string) {
		const match = pathname.match(/^(?:\/pt)?\/docs\/([^/]+)/);
		if (!match) return null;
		return scripts.some((script) => script.slug === match[1]) ? match[1] : null;
	}

	$effect(() => {
		const active = currentScriptSlug(relativePathname);
		if (active) {
			openSlug = active;
		} else if (/^(?:\/pt)?\/(?:getting-started|primeiros-passos)\//.test(relativePathname)) {
			openSlug = 'getting-started';
		}
	});

	function toggle(slug: string) {
		openSlug = openSlug === slug ? null : slug;
	}
</script>

<aside
	class="fixed inset-y-0 left-0 z-40 flex h-full w-80 shrink-0 -translate-x-full transform overflow-hidden border-r border-border bg-surface transition-[width,padding-left,transform] duration-200 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 {open
		? 'translate-x-0'
		: ''} {collapsed ? 'lg:w-0 lg:border-r-0 lg:pl-0' : 'lg:w-[23rem] lg:pl-12'}"
>
	<!-- largura fixa pra não dar reflow de texto durante a animação de largura acima: só o "recorte" (overflow-hidden do pai) anima -->
	<div class="flex h-full w-80 shrink-0 flex-col">
		<div class="flex h-16 shrink-0 items-center justify-between gap-2.5 border-b border-border px-5">
			<a href="{base}{locale === 'pt' ? '/pt' : '/'}" class="flex items-center gap-2.5">
				<Logo class="h-5 w-5" />
				<span class="text-lg font-bold text-fg">
					bn<span class="text-accent">Docs</span>
				</span>
			</a>
			<button
				type="button"
				aria-label={t.header.collapseMenuAria}
				onclick={() => (collapsed = true)}
				class="hidden rounded-md p-1.5 text-fg-muted hover:bg-surface-hover hover:text-fg lg:flex"
			>
				<PanelLeftClose class="size-4" />
			</button>
		</div>

		<div class="px-5 py-4">
			<button
				type="button"
				onclick={() => (searchState.open = true)}
				class="flex w-full items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
			>
				<Search class="size-4" />
				<span class="flex-1 text-left">{t.nav.search}</span>
				<kbd class="rounded border border-border px-1.5 py-0.5 text-xs">Ctrl K</kbd>
			</button>
		</div>

		<nav class="min-h-0 flex-1 overflow-y-auto px-5 pb-4 text-sm">
			{#each topLinks as link (link.href)}
				<a
					href="{base}{link.href}"
					class="mb-1 flex items-center gap-2.5 rounded-md px-3 py-2 font-medium {isActive(link.href)
						? 'bg-surface-hover text-accent'
						: 'text-fg hover:bg-surface-hover'}"
				>
					<link.icon class="size-4 shrink-0" />
					{link.label}
				</a>
			{/each}

			<div class="mt-3 border-t border-border pt-3">
				<button
					type="button"
					onclick={() => toggle('getting-started')}
					aria-expanded={isGettingStartedOpen}
					class="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left font-medium text-fg hover:bg-surface-hover"
				>
					<Rocket class="size-4 shrink-0 {isGettingStartedOpen ? 'text-accent' : ''}" />
					<span class="flex-1">{t.nav.gettingStarted}</span>
					<ChevronRight
						class="size-4 shrink-0 text-fg-muted transition-transform {isGettingStartedOpen
							? 'rotate-90'
							: ''}"
					/>
				</button>

				{#if isGettingStartedOpen}
					<div class="mt-1 ml-4 space-y-0.5 border-l border-border pl-3">
						{#each gettingStartedItems as item (item.key)}
							<a
								href="{base}{item.href}"
								class="flex items-center gap-2 rounded-md px-2 py-1.5 {isActive(item.href)
									? 'bg-surface-hover text-accent'
									: 'text-fg-muted hover:bg-surface-hover hover:text-fg'}"
							>
								<FileText class="size-3.5 shrink-0" />
								{item.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<div class="mt-3 space-y-1 border-t border-border pt-3">
				{#each scripts as script (script.slug)}
					{@const isOpen = openSlug === script.slug}
					{@const ScriptIcon = scriptIcons[script.slug]}
					<div>
						<button
							type="button"
							onclick={() => toggle(script.slug)}
							aria-expanded={isOpen}
							class="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left font-medium text-fg hover:bg-surface-hover"
						>
							<ScriptIcon class="size-4 shrink-0 {isOpen ? 'text-accent' : ''}" />
							<span class="flex-1">{script.slug}</span>
							<ChevronRight
								class="size-4 shrink-0 text-fg-muted transition-transform {isOpen ? 'rotate-90' : ''}"
							/>
						</button>

						{#if isOpen}
							<div class="mt-1 ml-4 space-y-0.5 border-l border-border pl-3">
								{#each script.sections as key (key)}
									{@const section = t.sectionLabels[key]}
									{@const href = `${localePrefix}/docs/${script.slug}/${section.slug}`}
									<a
										href="{base}{href}"
										class="flex items-center gap-2 rounded-md px-2 py-1.5 {isActive(href)
											? 'bg-surface-hover text-accent'
											: 'text-fg-muted hover:bg-surface-hover hover:text-fg'}"
									>
										<FileText class="size-3.5 shrink-0" />
										{section.label}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</nav>

		<div class="shrink-0 space-y-0.5 px-5 py-4">
			<RocketNodeBanner />
			{#each footerLinks as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noreferrer"
					class="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-fg-muted hover:bg-surface-hover hover:text-fg"
				>
					<link.icon class="size-4 shrink-0" />
					{link.label}
				</a>
			{/each}
		</div>
	</div>
</aside>

{#if open}
	<button
		aria-label={t.header.closeMenuAria}
		class="fixed inset-0 z-30 bg-black/60 lg:hidden"
		onclick={() => (open = false)}
	></button>
{/if}
