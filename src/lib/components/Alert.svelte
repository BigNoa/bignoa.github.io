<script lang="ts">
	import type { Snippet } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import Info from '@lucide/svelte/icons/info';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import OctagonAlert from '@lucide/svelte/icons/octagon-alert';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let {
		type = 'info',
		title,
		children
	}: { type?: 'info' | 'warning' | 'danger'; title?: string; children: Snippet } = $props();

	const t = $derived(messagesFor(localeFromPathname(page.url.pathname.slice(base.length) || '/')));

	const config = $derived({
		info: { label: t.alert.note, icon: Info, class: 'border-border bg-surface' },
		warning: {
			label: t.alert.warning,
			icon: TriangleAlert,
			class: 'border-amber-500/30 bg-amber-500/10'
		},
		danger: { label: t.alert.danger, icon: OctagonAlert, class: 'border-red-500/30 bg-red-500/10' }
	} as const);

	const current = $derived(config[type]);
</script>

<div class="not-prose my-6 flex gap-3 rounded-lg border p-4 {current.class}">
	<current.icon class="size-5 shrink-0 text-fg-muted" />
	<div class="min-w-0 flex-1">
		<p class="text-sm font-semibold text-fg">{title ?? current.label}</p>
		<div
			class="mt-1 text-sm leading-relaxed text-fg [&_li]:pl-1 [&_p+p]:mt-3 [&_p+pre]:mt-3 [&_p+ul]:mt-2 [&_pre+p]:mt-3 [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
		>
			{@render children()}
		</div>
	</div>
</div>
