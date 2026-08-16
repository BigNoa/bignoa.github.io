export const THEME_STORAGE_KEY = 'bignoa-theme';
export type Theme = 'light' | 'dark';

export function getInitialTheme(
	storage: Pick<Storage, 'getItem'> | undefined,
	prefersDark: boolean
): Theme {
	try {
		const stored = storage?.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch {
		// storage inacessível (ex.: modo privado), então cai para prefers-color-scheme
	}
	return prefersDark ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle('dark', theme === 'dark');
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		// ignora se storage não estiver disponível
	}
}
