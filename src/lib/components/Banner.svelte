<script lang="ts">
	let { src, alt }: { src: string; alt: string } = $props();
</script>

<div class="not-prose mb-6 overflow-hidden rounded-xl border border-border">
	<img {src} {alt} class="aspect-video w-full object-cover" />
</div>
