import type { Messages } from './types';

export const en: Messages = {
	htmlLang: 'en',
	nav: {
		home: 'Home',
		terms: 'Terms of Use',
		gettingStarted: 'Getting Started',
		search: 'Search',
		tebexStore: 'Tebex Store',
		discordSupport: 'Discord Support'
	},
	gettingStartedLabels: {
		downloadPurchase: { slug: 'download-purchase', label: 'Download Purchase' },
		dependencies: { slug: 'dependencies', label: 'Dependencies' },
		recommendedHosting: { slug: 'recommended-hosting', label: 'Recommended Hosting' },
		translations: { slug: 'translations', label: 'Translations' },
		escrowErrors: { slug: 'escrow-errors', label: 'FiveM Escrow Errors' }
	},
	sectionLabels: {
		installation: { slug: 'installation', label: 'Installation' },
		inventory: { slug: 'inventory-items', label: 'Inventory Items' },
		configuration: { slug: 'configuration', label: 'Configuration' },
		integrations: { slug: 'integrations', label: 'UI & Integrations' },
		performance: { slug: 'performance', label: 'Performance & Sound' },
		commands: { slug: 'commands', label: 'Commands & Permissions' },
		exports: { slug: 'exports', label: 'Exports' },
		troubleshooting: { slug: 'troubleshooting', label: 'Troubleshooting' },
		gameplay: { slug: 'gameplay-guide', label: 'Gameplay Guide' },
		features: { slug: 'features', label: 'Systems & Features' },
		guide: { slug: 'how-to-use', label: 'How to Use' },
		changelog: { slug: 'changelog', label: 'Changelog' }
	},
	scripts: {
		bnSuspension: { spec: 'Standalone air suspension (air ride)' },
		bnExhaust: { spec: 'Exhaust and sound effects' },
		bnTruck: { spec: 'Trucking company logistics, MFT enforcement, and cargo fraud risk' },
		bnMarket: { spec: 'Live vehicle showroom with financing and test drives' },
		bnVehicleHistory: { spec: 'Vehicle history and mileage tracking' }
	},
	search: { placeholder: 'Search documentation...', noResultsPrefix: 'No results for', closeAria: 'Close search', fallbackGroup: 'General' },
	header: { openMenuAria: 'Open menu', expandMenuAria: 'Expand menu', collapseMenuAria: 'Collapse menu', closeMenuAria: 'Close menu' },
	cookie: { text: 'This site uses cookies to improve your experience.', dismiss: 'Got it' },
	breadcrumb: { docs: 'Docs' },
	pager: { prev: 'Previous', next: 'Next', nav: 'Pagination' },
	toc: { heading: 'On this page' },
	specPlate: { techSheet: 'Tech sheet', version: 'Version', compatible: 'Compatible' },
	alert: { note: 'Note', warning: 'Warning', danger: 'Danger' },
	theme: { enableLight: 'Switch to light theme', enableDark: 'Switch to dark theme' },
	home: {
		title: 'Complete guides for everything',
		titleAccent: 'BigNoa',
		subtitle: 'Installation, configuration, exports, and changelog for each FiveM script. Documented straight, no fluff.',
		quickLinksHeading: 'Quick Links',
		quickLinks: [
			{ label: 'Tebex Store', description: 'Buy or renew a script' },
			{ label: 'Discord Support', description: 'Get help from the team' },
			{ label: 'Terms of Use', description: 'Licensing and usage rules' }
		],
		scriptsHeading: 'Scripts',
		itemsInStock: 'items in stock'
	},
	languageSwitcher: { aria: 'Select language', en: 'English', pt: 'Português (BR)' }
};
