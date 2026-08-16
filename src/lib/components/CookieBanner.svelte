<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	const STORAGE_KEY = 'bignoa-cookie-consent';

	let dismissed = $state(true);
	const t = $derived(messagesFor(localeFromPathname(page.url.pathname.slice(base.length) || '/')));

	$effect(() => {
		try {
			dismissed = localStorage.getItem(STORAGE_KEY) === '1';
		} catch {
			dismissed = false;
		}
	});

	function dismiss() {
		dismissed = true;
		try {
			localStorage.setItem(STORAGE_KEY, '1');
		} catch {
			// ignora se storage não estiver disponível
		}
	}
</script>

{#if !dismissed}
	<div
		class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface px-4 py-3 shadow-lg"
	>
		<div class="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
			<p class="text-sm text-fg-muted">
				{t.cookie.text}
			</p>
			<button
				type="button"
				onclick={dismiss}
				class="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
			>
				{t.cookie.dismiss}
			</button>
		</div>
	</div>
{/if}
