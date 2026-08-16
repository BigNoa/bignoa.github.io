<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Search from '@lucide/svelte/icons/search';
	import { buildSearchIndex, searchIndex, type SearchDoc } from '$lib/search';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let query = $state('');
	let activeIndex = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const locale = $derived(localeFromPathname(page.url.pathname.slice(base.length) || '/'));
	const t = $derived(messagesFor(locale));

	const rawDocs = import.meta.glob('/src/routes/**/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

	const index: SearchDoc[] = $derived(buildSearchIndex(rawDocs, locale));
	const results = $derived(searchIndex(index, query));

	$effect(() => {
		results;
		activeIndex = 0;
	});

	$effect(() => {
		if (open) {
			query = '';
			queueMicrotask(() => inputEl?.focus());
		}
	});

	function close() {
		open = false;
	}

	function select(doc: SearchDoc) {
		close();
		goto(`${base}${doc.href}`);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
			return;
		}
		if (!results.length) return;
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			activeIndex = (activeIndex + 1) % results.length;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			activeIndex = (activeIndex - 1 + results.length) % results.length;
		} else if (event.key === 'Enter') {
			event.preventDefault();
			select(results[activeIndex]);
		}
	}
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-24">
		<button aria-label={t.search.closeAria} class="absolute inset-0" onclick={close} tabindex="-1"
		></button>

		<div class="relative w-full max-w-lg rounded-xl border border-border bg-surface shadow-2xl">
			<div class="flex items-center gap-2.5 border-b border-border px-4">
				<Search class="size-4 shrink-0 text-fg-muted" />
				<input
					bind:this={inputEl}
					bind:value={query}
					onkeydown={handleKeydown}
					type="search"
					placeholder={t.search.placeholder}
					class="w-full bg-transparent py-3.5 text-sm text-fg placeholder-fg-muted outline-none"
				/>
				<kbd class="shrink-0 rounded border border-border px-1.5 py-0.5 text-xs text-fg-muted"
					>Esc</kbd
				>
			</div>

			<ul class="max-h-80 overflow-y-auto py-2">
				{#if query.trim() && results.length === 0}
					<li class="px-4 py-6 text-center text-sm text-fg-muted">
						{t.search.noResultsPrefix} "{query}"
					</li>
				{/if}
				{#each results as doc, i (doc.href)}
					<li>
						<button
							type="button"
							onclick={() => select(doc)}
							onmouseenter={() => (activeIndex = i)}
							class="flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left {i ===
							activeIndex
								? 'bg-surface-hover'
								: ''}"
						>
							<span class="text-xs tracking-wide text-fg-muted uppercase">{doc.group}</span>
							<span class="text-sm font-medium text-fg">{doc.title}</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style>
	input:focus-visible {
		outline: none;
	}
</style>
