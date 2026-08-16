const SVG_ATTRS =
	'xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

// Ícones do lucide (copy/check/x) embutidos como SVG cru, pois este módulo manipula
// o DOM fora da árvore de componentes Svelte, então não dá pra usar os
// componentes @lucide/svelte diretamente aqui.
const ICON_COPY = `<svg ${SVG_ATTRS}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const ICON_CHECK = `<svg ${SVG_ATTRS}><path d="M20 6 9 17l-5-5"/></svg>`;
const ICON_ERROR = `<svg ${SVG_ATTRS}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

export function copyCode(container: HTMLElement | undefined): () => void {
	if (!container) return () => {};

	const blocks = container.querySelectorAll<HTMLPreElement>('pre.shiki');
	const cleanups: Array<() => void> = [];

	blocks.forEach((pre) => {
		if (pre.querySelector('.copy-code-button')) return;

		const codeText = pre.textContent ?? '';

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'copy-code-button';
		button.innerHTML = ICON_COPY;
		button.setAttribute('aria-label', 'Copiar código');

		let resetTimer: ReturnType<typeof setTimeout>;
		const handleClick = async () => {
			try {
				await navigator.clipboard.writeText(codeText);
				button.innerHTML = ICON_CHECK;
				button.setAttribute('aria-label', 'Código copiado');
			} catch {
				button.innerHTML = ICON_ERROR;
				button.setAttribute('aria-label', 'Erro ao copiar código');
			}
			clearTimeout(resetTimer);
			resetTimer = setTimeout(() => {
				button.innerHTML = ICON_COPY;
				button.setAttribute('aria-label', 'Copiar código');
			}, 1500);
		};

		button.addEventListener('click', handleClick);
		pre.appendChild(button);

		cleanups.push(() => {
			clearTimeout(resetTimer);
			button.removeEventListener('click', handleClick);
			button.remove();
		});
	});

	return () => cleanups.forEach((cleanup) => cleanup());
}
