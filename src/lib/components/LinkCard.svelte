<script lang="ts">
	import type { Component } from 'svelte';
	import Globe from '@lucide/svelte/icons/globe';
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	let {
		href,
		title,
		subtitle,
		icon: Icon = Globe
	}: { href: string; title: string; subtitle: string; icon?: Component } = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noreferrer"
	class="not-prose group my-6 flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent"
>
	<span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-fg-muted">
		<Icon class="size-4" />
	</span>
	<span class="min-w-0 flex-1">
		<span class="block truncate font-semibold text-fg">{title}</span>
		<span class="block truncate text-sm text-fg-muted">{subtitle}</span>
	</span>
	<ArrowUpRight
		class="size-4 shrink-0 text-fg-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
	/>
</a>
