<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="not-prose my-4 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-fg [&_a]:text-accent [&_a]:no-underline [&_a:hover]:underline [&_code]:font-mono [&_li]:pl-1 [&_p+p]:mt-3 [&_p+ul]:mt-2 [&_strong]:text-fg [&_ul]:mt-1 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
>
	{@render children()}
</div>
