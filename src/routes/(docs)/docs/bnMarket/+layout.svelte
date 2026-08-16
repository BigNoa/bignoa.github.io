<script lang="ts">
	import ScriptDocLayout from '$lib/components/ScriptDocLayout.svelte';

	let { children } = $props();
</script>

<ScriptDocLayout slug="bnMarket">
	{@render children()}
</ScriptDocLayout>
