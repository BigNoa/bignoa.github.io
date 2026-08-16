import { en } from './messages/en.ts';
import { pt } from './messages/pt.ts';
import type { Messages } from './messages/types.ts';
import type { SectionKey, GettingStartedKey } from './nav.ts';

export type Locale = 'en' | 'pt';

const messagesByLocale: Record<Locale, Messages> = { en, pt };

export function messagesFor(locale: Locale): Messages {
	return messagesByLocale[locale];
}

export function localeFromPathname(pathname: string): Locale {
	return pathname === '/pt' || pathname.startsWith('/pt/') ? 'pt' : 'en';
}

function sectionKeyFromSlug(locale: Locale, slug: string): SectionKey | undefined {
	const entries = Object.entries(messagesByLocale[locale].sectionLabels) as [
		SectionKey,
		{ slug: string; label: string }
	][];
	return entries.find(([, section]) => section.slug === slug)?.[0];
}

const gettingStartedGroupSlug: Record<Locale, string> = { en: 'getting-started', pt: 'primeiros-passos' };

function gettingStartedKeyFromSlug(locale: Locale, slug: string): GettingStartedKey | undefined {
	const entries = Object.entries(messagesByLocale[locale].gettingStartedLabels) as [
		GettingStartedKey,
		{ slug: string; label: string }
	][];
	return entries.find(([, page]) => page.slug === slug)?.[0];
}

export function localizedPath(pathname: string, targetLocale: Locale): string {
	const currentLocale = localeFromPathname(pathname);
	if (currentLocale === targetLocale) return pathname;

	const withoutPrefix = currentLocale === 'pt' ? pathname.replace(/^\/pt/, '') || '/' : pathname;

	const docsMatch = withoutPrefix.match(/^\/docs\/([^/]+)\/([^/]+)$/);
	if (docsMatch) {
		const [, product, sectionSlug] = docsMatch;
		const key = sectionKeyFromSlug(currentLocale, sectionSlug);
		const targetSlug = key ? messagesByLocale[targetLocale].sectionLabels[key].slug : sectionSlug;
		const rest = `/docs/${product}/${targetSlug}`;
		return targetLocale === 'pt' ? `/pt${rest}` : rest;
	}

	if (withoutPrefix === '/terms' || withoutPrefix === '/termos') {
		return targetLocale === 'pt' ? '/pt/termos' : '/terms';
	}

	const gsMatch = withoutPrefix.match(/^\/(?:getting-started|primeiros-passos)\/([^/]+)$/);
	if (gsMatch) {
		const [, pageSlug] = gsMatch;
		const key = gettingStartedKeyFromSlug(currentLocale, pageSlug);
		const targetSlug = key
			? messagesByLocale[targetLocale].gettingStartedLabels[key].slug
			: pageSlug;
		const rest = `/${gettingStartedGroupSlug[targetLocale]}/${targetSlug}`;
		return targetLocale === 'pt' ? `/pt${rest}` : rest;
	}

	return targetLocale === 'pt' ? (withoutPrefix === '/' ? '/pt' : `/pt${withoutPrefix}`) : withoutPrefix;
}
