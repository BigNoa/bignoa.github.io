<script lang="ts">
	import DocArticle from '$lib/components/DocArticle.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';

	let { children } = $props();
</script>

<div class="flex justify-center">
	<DocArticle>
		{@render children()}
	</DocArticle>
	<TableOfContents />
</div>
