import { messagesFor, type Locale } from './i18n.ts';

export type SearchDoc = {
	title: string;
	href: string;
	group: string;
	text: string;
};

const FRONTMATTER_TITLE = /^---[\s\S]*?title:\s*(.+?)\s*\n[\s\S]*?---/;

function stripMarkdown(raw: string): string {
	return raw
		.replace(/^---[\s\S]*?---/, '')
		.replace(/<script[\s\S]*?<\/script>/g, '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#*_>`[\]()-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function hrefFromPath(path: string): string {
	return (
		path
			.replace(/^\/src\/routes/, '')
			.replace(/\/\([^)]+\)/g, '')
			.replace(/\/\+page\.md$/, '') || '/'
	);
}

function groupFromPath(href: string, fallback: string): string {
	const match = href.match(/^(?:\/pt)?\/docs\/([^/]+)/);
	return match ? match[1] : fallback;
}

function titleFromRaw(raw: string, fallback: string): string {
	const match = raw.match(FRONTMATTER_TITLE);
	return match ? match[1] : fallback;
}

function isInLocale(href: string, locale: Locale): boolean {
	return locale === 'pt'
		? href === '/pt' || href.startsWith('/pt/')
		: href !== '/pt' && !href.startsWith('/pt/');
}

export function buildSearchIndex(rawByPath: Record<string, string>, locale: Locale): SearchDoc[] {
	const fallbackGroup = messagesFor(locale).search.fallbackGroup;
	return Object.entries(rawByPath)
		.map(([path, raw]) => {
			const href = hrefFromPath(path);
			return {
				title: titleFromRaw(raw, href),
				href,
				group: groupFromPath(href, fallbackGroup),
				text: stripMarkdown(raw)
			};
		})
		.filter((doc) => isInLocale(doc.href, locale));
}

export function searchIndex(index: SearchDoc[], query: string): SearchDoc[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];

	return index
		.map((doc) => {
			const titleMatch = doc.title.toLowerCase().includes(q);
			const textIndex = doc.text.toLowerCase().indexOf(q);
			if (!titleMatch && textIndex === -1) return null;
			const score =
				(titleMatch ? 100 : 0) + (textIndex === -1 ? 0 : Math.max(0, 50 - textIndex / 10));
			return { doc, score };
		})
		.filter((entry): entry is { doc: SearchDoc; score: number } => entry !== null)
		.sort((a, b) => b.score - a.score)
		.map((entry) => entry.doc);
}
