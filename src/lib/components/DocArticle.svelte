<script lang="ts">
	import { page } from '$app/state';
	import { copyCode } from '$lib/actions/copyCode';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let articleEl: HTMLElement | undefined = $state();

	$effect(() => {
		page.url.pathname; // re-scans code blocks on every client-side navigation
		return copyCode(articleEl);
	});
</script>

<article
	bind:this={articleEl}
	class="mx-auto prose max-w-3xl px-6 py-10 dark:prose-invert prose-headings:font-extrabold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-code:font-mono"
>
	{@render children()}
</article>
