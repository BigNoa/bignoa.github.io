<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { getAdjacentSections } from '$lib/docPager';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));
	const localePrefix = $derived(locale === 'pt' ? '/pt' : '');
	const adjacent = $derived(
		getAdjacentSections(relativePathname.replace(/^\/pt/, ''), t)
	);
</script>

{#if adjacent.prev || adjacent.next}
	<nav class="not-prose mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-2" aria-label={t.pager.nav}>
		{#if adjacent.prev}
			<a
				href="{base}{localePrefix}{adjacent.prev.href}"
				class="group flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:border-accent hover:bg-surface-hover"
			>
				<ArrowLeft
					class="size-4 shrink-0 text-fg-muted transition-transform group-hover:-translate-x-0.5 group-hover:text-accent"
				/>
				<span class="min-w-0">
					<span class="block text-xs text-fg-muted">{t.pager.prev}</span>
					<span class="block truncate font-medium text-fg">{adjacent.prev.label}</span>
				</span>
			</a>
		{:else}
			<div></div>
		{/if}

		{#if adjacent.next}
			<a
				href="{base}{localePrefix}{adjacent.next.href}"
				class="group flex items-center justify-end gap-3 rounded-lg border border-border p-4 text-right transition-colors hover:border-accent hover:bg-surface-hover"
			>
				<span class="min-w-0">
					<span class="block text-xs text-fg-muted">{t.pager.next}</span>
					<span class="block truncate font-medium text-fg">{adjacent.next.label}</span>
				</span>
				<ArrowRight
					class="size-4 shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
				/>
			</a>
		{/if}
	</nav>
{/if}
