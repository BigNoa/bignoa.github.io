<script lang="ts">
	import ScriptDocLayout from '$lib/components/ScriptDocLayout.svelte';

	let { children } = $props();
</script>

<ScriptDocLayout slug="bnTruck">
	{@render children()}
</ScriptDocLayout>
