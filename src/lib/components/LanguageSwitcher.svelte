<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Languages from '@lucide/svelte/icons/languages';
	import Check from '@lucide/svelte/icons/check';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import { localeFromPathname, localizedPath, messagesFor, type Locale } from '$lib/i18n';

	const LOCALE_STORAGE_KEY = 'bignoa-locale';

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));
	const options = $derived([
		{ value: 'en' as const, label: t.languageSwitcher.en },
		{ value: 'pt' as const, label: t.languageSwitcher.pt }
	]);

	let open = $state(false);
	let containerEl: HTMLElement | undefined = $state();

	function select(target: Locale) {
		open = false;
		try {
			localStorage.setItem(LOCALE_STORAGE_KEY, target);
		} catch {
			// ignora se storage não estiver disponível
		}
		if (target === locale) return;
		goto(`${base}${localizedPath(relativePathname, target)}`);
	}

	function handleWindowClick(event: MouseEvent) {
		if (open && containerEl && !containerEl.contains(event.target as Node)) open = false;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') open = false;
	}
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<div class="relative" bind:this={containerEl}>
	<button
		type="button"
		aria-haspopup="listbox"
		aria-expanded={open}
		onclick={() => (open = !open)}
		class="flex items-center gap-1.5 rounded-md p-2 text-sm text-fg-muted hover:bg-surface-hover hover:text-fg"
	>
		<Languages class="size-4" />
		<span class="hidden sm:inline">{options.find((o) => o.value === locale)?.label}</span>
		<ChevronDown class="size-3.5 transition-transform {open ? 'rotate-180' : ''}" />
	</button>

	{#if open}
		<ul
			role="listbox"
			aria-label={t.languageSwitcher.aria}
			class="absolute top-full right-0 z-30 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface py-1.5 shadow-2xl"
		>
			{#each options as option (option.value)}
				<li>
					<button
						type="button"
						role="option"
						aria-selected={option.value === locale}
						onclick={() => select(option.value)}
						class="flex w-full items-center justify-between px-3 py-2 text-left text-sm {option.value ===
						locale
							? 'bg-surface-hover font-medium text-accent'
							: 'text-fg hover:bg-surface-hover'}"
					>
						{option.label}
						{#if option.value === locale}
							<Check class="size-3.5" />
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
