<script lang="ts">
	import { untrack, type Snippet } from 'svelte';

	let { tabs, children }: { tabs: { id: string; label: string }[]; children: Snippet<[string]> } =
		$props();

	// Only the initial tab matters here: `tabs` never changes after mount for a given
	// instance, so `untrack` makes that one-time read explicit instead of a lint warning.
	let active = $state(untrack(() => tabs[0].id));
</script>

<div class="not-prose my-6 rounded-lg border border-border">
	<div class="flex gap-1 overflow-x-auto border-b border-border px-2">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				onclick={() => (active = tab.id)}
				class="border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap {active === tab.id
					? 'border-accent text-accent'
					: 'border-transparent text-fg-muted hover:text-fg'}"
			>
				{tab.label}
			</button>
		{/each}
	</div>
	<div class="prose max-w-none p-4 dark:prose-invert">
		{@render children(active)}
	</div>
</div>
