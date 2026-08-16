<script lang="ts">
	import DocArticle from '$lib/components/DocArticle.svelte';

	let { children } = $props();
</script>

<DocArticle>
	{@render children()}
</DocArticle>
