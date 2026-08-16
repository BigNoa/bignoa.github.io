import type { SectionKey, GettingStartedKey } from '../nav';

export type Messages = {
	htmlLang: string;
	nav: {
		home: string;
		terms: string;
		gettingStarted: string;
		search: string;
		tebexStore: string;
		discordSupport: string;
	};
	sectionLabels: Record<SectionKey, { slug: string; label: string }>;
	gettingStartedLabels: Record<GettingStartedKey, { slug: string; label: string }>;
	scripts: Record<string, { spec: string }>;
	search: { placeholder: string; noResultsPrefix: string; closeAria: string; fallbackGroup: string };
	header: { openMenuAria: string; expandMenuAria: string; collapseMenuAria: string; closeMenuAria: string };
	cookie: { text: string; dismiss: string };
	breadcrumb: { docs: string };
	pager: { prev: string; next: string; nav: string };
	toc: { heading: string };
	specPlate: { techSheet: string; version: string; compatible: string };
	alert: { note: string; warning: string; danger: string };
	theme: { enableLight: string; enableDark: string };
	home: {
		title: string;
		titleAccent: string;
		subtitle: string;
		quickLinksHeading: string;
		quickLinks: { label: string; description: string }[];
		scriptsHeading: string;
		itemsInStock: string;
	};
	languageSwitcher: { aria: string; en: string; pt: string };
};
