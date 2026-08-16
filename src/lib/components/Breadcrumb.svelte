<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let { productSlug }: { productSlug: string } = $props();

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));

	const sectionLabel = $derived.by(() => {
		const match = relativePathname.match(/^(?:\/pt)?\/docs\/[^/]+\/([^/]+)/);
		const section = match ? Object.values(t.sectionLabels).find((s) => s.slug === match[1]) : undefined;
		return section?.label ?? '';
	});
</script>

<nav aria-label="Breadcrumb" class="mb-4 flex items-center gap-1.5 text-xs text-fg-muted">
	<span class="tracking-wide uppercase">{t.breadcrumb.docs}</span>
	<span>/</span>
	<span class="tracking-wide uppercase">{productSlug}</span>
	{#if sectionLabel}
		<span>/</span>
		<span class="font-semibold tracking-wide text-fg uppercase">{sectionLabel}</span>
	{/if}
</nav>
