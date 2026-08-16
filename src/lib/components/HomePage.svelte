<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Search from '@lucide/svelte/icons/search';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ShoppingBag from '@lucide/svelte/icons/shopping-bag';
	import MessageCircle from '@lucide/svelte/icons/message-circle';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import Flame from '@lucide/svelte/icons/flame';
	import MoveVertical from '@lucide/svelte/icons/move-vertical';
	import Truck from '@lucide/svelte/icons/truck';
	import Tag from '@lucide/svelte/icons/tag';
	import History from '@lucide/svelte/icons/history';
	import { scripts } from '$lib/nav';
	import { searchState } from '$lib/searchStore.svelte';
	import { localeFromPathname, messagesFor } from '$lib/i18n';
	import Logo from '$lib/components/Logo.svelte';

	const locale = $derived(localeFromPathname(page.url.pathname.slice(base.length)));
	const t = $derived(messagesFor(locale));

	const quickLinkHrefs = [
		{ href: 'https://bignoa.tebex.io', external: true, icon: ShoppingBag },
		{ href: 'https://discord.gg/vmJzcj9NmJ', external: true, icon: MessageCircle },
		{ href: locale === 'pt' ? '/pt/termos' : '/terms', external: false, icon: ScrollText }
	] as const;

	const scriptIcons: Record<string, typeof Flame> = {
		bnSuspension: MoveVertical,
		bnExhaust: Flame,
		bnTruck: Truck,
		bnMarket: Tag,
		bnVehicleHistory: History
	};

	function scriptHref(script: (typeof scripts)[number]) {
		const section = t.sectionLabels[script.sections[0]].slug;
		return locale === 'pt'
			? `${base}/pt/docs/${script.slug}/${section}`
			: `${base}/docs/${script.slug}/${section}`;
	}
</script>

<section class="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
	<Logo class="mx-auto h-12 w-12" />
	<h1 class="mt-5 text-4xl leading-[1.1] font-extrabold text-fg sm:text-5xl">
		{t.home.title} <span class="text-accent">{t.home.titleAccent}</span>
	</h1>
	<p class="mt-4 text-lg text-fg-muted">
		{t.home.subtitle}
	</p>

	<button
		type="button"
		onclick={() => (searchState.open = true)}
		class="mx-auto mt-8 flex w-full max-w-lg items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-left text-fg-muted shadow-sm transition-colors hover:border-accent hover:text-fg"
	>
		<Search class="size-5 shrink-0 text-accent" />
		<span class="flex-1">{t.search.placeholder}</span>
		<kbd class="rounded border border-border px-1.5 py-0.5 text-xs">Ctrl K</kbd>
	</button>
</section>

<section class="mx-auto max-w-4xl px-6 pb-14">
	<h2 class="pb-4 text-sm font-semibold tracking-wide text-fg uppercase">{t.home.quickLinksHeading}</h2>
	<div class="grid gap-3 sm:grid-cols-3">
		{#each t.home.quickLinks as link, i (link.label)}
			{@const linkMeta = quickLinkHrefs[i]}
			<a
				href={linkMeta.external ? linkMeta.href : `${base}${linkMeta.href}`}
				target={linkMeta.external ? '_blank' : undefined}
				rel={linkMeta.external ? 'noreferrer' : undefined}
				class="group rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent hover:bg-surface-hover"
			>
				<linkMeta.icon class="size-5 text-accent" />
				<p class="mt-3 font-semibold text-fg">{link.label}</p>
				<p class="mt-0.5 text-sm text-fg-muted">{link.description}</p>
			</a>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-4xl px-6 pb-24">
	<div class="flex items-baseline gap-4 pb-4">
		<h2 class="text-sm font-semibold tracking-wide text-fg uppercase">{t.home.scriptsHeading}</h2>
		<span class="text-xs text-fg-muted">{scripts.length} {t.home.itemsInStock}</span>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each scripts as script (script.slug)}
			{@const ScriptIcon = scriptIcons[script.slug]}
			<a
				href={scriptHref(script)}
				class="group overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent"
			>
				<div
					class="relative flex h-24 items-center justify-end overflow-hidden bg-gradient-to-br from-accent/15 via-surface to-surface px-4"
				>
					{#if script.image}
						<img
							src="{base}{script.image}"
							alt=""
							class="absolute inset-0 h-full w-full object-cover"
						/>
					{:else}
						<ScriptIcon
							class="absolute -right-3 -bottom-3 size-20 text-accent/15 transition-transform group-hover:scale-110"
						/>
					{/if}
				</div>
				<div class="p-5">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<p class="font-semibold text-fg">{script.slug}</p>
							<p class="mt-0.5 text-sm text-fg-muted">{t.scripts[script.slug].spec}</p>
						</div>
						<ArrowRight
							class="size-4 shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
						/>
					</div>
					<p class="mt-4 font-mono text-xs text-fg-muted">{script.frameworks.join(' · ')}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
