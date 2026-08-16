// `image` é opcional: deixe '' pra usar o gradiente + ícone padrão no card da
// Home, ou aponte pra um arquivo em `static/scripts/` (ex: '/scripts/bnExhaust.jpg')
// pra usar uma imagem personalizada. Não importe a imagem de $lib/assets aqui:
// nav.ts precisa continuar só com valores simples (sem imports de asset/Svelte)
// pra docPager.ts e i18n.ts rodarem em `node --test`.
const defaultSections = ['installation', 'configuration', 'exports', 'changelog'] as const;

export const scripts = [
	{
		slug: 'bnSuspension',
		version: '06/2026',
		frameworks: ['Standalone', 'ox_lib', 'oxmysql'],
		image: '/scripts/bnSuspension.png',
		sections: defaultSections
	},
	{
		slug: 'bnExhaust',
		version: '06/2026',
		frameworks: ['ESX', 'QBCore', 'Qbox'],
		image: '/scripts/bnExhaust.png',
		// Mirrors the 9 real GitBook subpages: bnExhaust's doc set doesn't fit the 4-section default.
		sections: [
			'installation',
			'inventory',
			'configuration',
			'integrations',
			'performance',
			'commands',
			'exports',
			'troubleshooting',
			'changelog'
		]
	},
	{
		slug: 'bnTruck',
		version: '1.3.0',
		frameworks: ['ESX', 'QBCore', 'Qbox'],
		image: '/scripts/bnTruck.png',
		// Mirrors the 6 real GitBook subpages: bnTruck's doc set doesn't fit the 4-section default.
		sections: [
			'installation',
			'inventory',
			'configuration',
			'gameplay',
			'features',
			'commands',
			'exports',
			'changelog'
		]
	},
	{
		slug: 'bnMarket',
		version: '1.0.0',
		frameworks: ['ESX', 'QBCore', 'Qbox'],
		image: '/scripts/bnMarket.png',
		// Mirrors the 3 real GitBook subpages: no exports/API page in the source docs.
		sections: ['installation', 'configuration', 'guide', 'changelog']
	},
	{
		slug: 'bnVehicleHistory',
		version: '1.0.0',
		frameworks: ['ESX', 'QBCore', 'Qbox', 'Standalone'],
		image: '/scripts/bnVehicleHistory.png',
		sections: defaultSections
	}
] as const;

export const gettingStartedKeys = [
	'downloadPurchase',
	'dependencies',
	'translations',
	'escrowErrors'
] as const;
export type GettingStartedKey = (typeof gettingStartedKeys)[number];

export const sectionKeys = [
	'installation',
	'inventory',
	'configuration',
	'integrations',
	'performance',
	'commands',
	'exports',
	'troubleshooting',
	'gameplay',
	'features',
	'guide',
	'changelog'
] as const;
export type SectionKey = (typeof sectionKeys)[number];
