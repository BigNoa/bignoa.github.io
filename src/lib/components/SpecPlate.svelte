<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let {
		name,
		spec,
		version,
		frameworks
	}: { name: string; spec: string; version: string; frameworks: readonly string[] } = $props();

	const t = $derived(messagesFor(localeFromPathname(page.url.pathname.slice(base.length) || '/')));
</script>

<div class="not-prose rounded-xl border border-border bg-surface px-6 py-5">
	<p class="text-xs font-semibold tracking-wide text-fg-muted uppercase">{t.specPlate.techSheet}</p>
	<h1 class="mt-1 text-3xl font-extrabold text-fg sm:text-4xl">{name}</h1>
	<p class="mt-1 text-sm text-fg-muted">{spec}</p>

	<div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-4">
		<div class="flex items-center gap-2">
			<span class="text-xs tracking-wide text-fg-muted uppercase">{t.specPlate.version}</span>
			<span class="font-mono text-sm text-accent">{version}</span>
		</div>
		<div class="flex flex-wrap items-center gap-1.5">
			<span class="text-xs tracking-wide text-fg-muted uppercase">{t.specPlate.compatible}</span>
			{#each frameworks as framework (framework)}
				<span class="rounded-full bg-surface-hover px-2 py-0.5 font-mono text-xs text-fg">
					{framework}
				</span>
			{/each}
		</div>
	</div>
</div>
