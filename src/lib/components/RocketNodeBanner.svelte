<script lang="ts">
	import { base } from '$app/paths';

	const AFFILIATE_URL = 'https://rocketnode.us/bignoa';
	// ponytail: single appear-then-fade cycle (discreet), not a repeating loop; tune the two delays if that changes
	const SHOW_AFTER_MS = 1200;
	const HIDE_AFTER_MS = 9000;

	let visible = $state(false);

	$effect(() => {
		const showTimer = setTimeout(() => (visible = true), SHOW_AFTER_MS);
		return () => clearTimeout(showTimer);
	});

	$effect(() => {
		if (!visible) return;
		const hideTimer = setTimeout(() => (visible = false), HIDE_AFTER_MS);
		return () => clearTimeout(hideTimer);
	});
</script>

<a
	href={AFFILIATE_URL}
	target="_blank"
	rel="noreferrer sponsored"
	aria-label="RocketNode, recommended FiveM hosting partner"
	class="block overflow-hidden rounded-lg transition-all duration-700 ease-in-out motion-reduce:transition-none {visible
		? 'my-2 max-h-24 opacity-100'
		: 'my-0 max-h-0 opacity-0'}"
>
	<img src="{base}/rocketnode-banner.png" alt="RocketNode" class="w-full" />
</a>
