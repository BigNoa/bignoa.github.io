<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { localeFromPathname, messagesFor } from '$lib/i18n';

	type Heading = { id: string; text: string };

	const relativePathname = $derived(page.url.pathname.slice(base.length) || '/');
	const locale = $derived(localeFromPathname(relativePathname));
	const t = $derived(messagesFor(locale));

	let headings: Heading[] = $state([]);
	let activeId = $state('');

	const ACTIVE_LINE_PX = 100; // linha de referência a partir do topo (altura do header + folga)

	$effect(() => {
		relativePathname; // re-scan headings on every client-side navigation

		const elements = Array.from(document.querySelectorAll<HTMLHeadingElement>('article h2[id]'));
		headings = elements.map((el) => ({ id: el.id, text: el.textContent ?? '' }));
		if (elements.length === 0) return;

		// Marca ativa a última seção cujo topo já passou da linha de referência,
		// isso, ao contrário de IntersectionObserver com rootMargin, sempre acerta
		// a última seção da página (não fica "presa" na penúltima quando o conteúdo
		// depois do heading final é curto demais pra disparar uma nova interseção).
		function updateActive() {
			let current = elements[0].id;
			for (const el of elements) {
				if (el.getBoundingClientRect().top <= ACTIVE_LINE_PX) current = el.id;
				else break;
			}
			activeId = current;
		}

		let ticking = false;
		function onScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				updateActive();
				ticking = false;
			});
		}

		updateActive();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

{#if headings.length > 1}
	<nav
		aria-label={t.toc.heading}
		class="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto py-10 pr-6 pl-4 text-sm xl:block"
	>
		<p class="mb-3 text-xs font-semibold tracking-wide text-fg-muted uppercase">{t.toc.heading}</p>
		<ul class="space-y-2 border-l border-border">
			{#each headings as heading (heading.id)}
				<li>
					<a
						href="#{heading.id}"
						class="-ml-px block border-l-2 py-0.5 pl-3 transition-colors {activeId === heading.id
							? 'border-accent font-medium text-accent'
							: 'border-transparent text-fg-muted hover:text-fg'}"
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
