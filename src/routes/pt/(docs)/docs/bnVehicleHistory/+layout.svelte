<script lang="ts">
	import ScriptDocLayout from '$lib/components/ScriptDocLayout.svelte';

	let { children } = $props();
</script>

<ScriptDocLayout slug="bnVehicleHistory">
	{@render children()}
</ScriptDocLayout>
