<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import SpecPlate from '$lib/components/SpecPlate.svelte';
	import DocPager from '$lib/components/DocPager.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import { scripts } from '$lib/nav';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let { slug, children }: { slug: string; children: Snippet } = $props();

	const script = scripts.find((s) => s.slug === slug)!;
	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));
	// O banner grande é só pra primeira impressão, mostra só na página de Instalação,
	// não em todas as seções do script.
	const isInstallation = $derived(
		relativePathname.endsWith(`/${t.sectionLabels.installation.slug}`)
	);
</script>

{#if script.image && isInstallation}
	<Banner src={script.image} alt={script.slug} />
{/if}
<Breadcrumb productSlug={script.slug} />
<SpecPlate
	name={script.slug}
	spec={t.scripts[script.slug].spec}
	version={script.version}
	frameworks={script.frameworks}
/>
<div class="mt-8">
	{@render children()}
</div>
<DocPager />
