import { scripts } from './nav.ts';
import type { Messages } from './messages/types.ts';

export type PagerLink = { href: string; label: string };
export type PagerResult = { prev?: PagerLink; next?: PagerLink };

export function getAdjacentSections(pathname: string, messages: Messages): PagerResult {
	const match = pathname.match(/^\/docs\/([^/]+)\/([^/]+)/);
	if (!match) return {};

	const [, scriptSlug, sectionSlug] = match;
	const script = scripts.find((s) => s.slug === scriptSlug);
	if (!script) return {};

	const sections = script.sections.map((key) => ({ key, ...messages.sectionLabels[key] }));
	const index = sections.findIndex((section) => section.slug === sectionSlug);
	if (index === -1) return {};

	const toLink = (section: (typeof sections)[number]): PagerLink => ({
		href: `/docs/${scriptSlug}/${section.slug}`,
		label: section.label
	});

	return {
		prev: index > 0 ? toLink(sections[index - 1]) : undefined,
		next: index < sections.length - 1 ? toLink(sections[index + 1]) : undefined
	};
}
