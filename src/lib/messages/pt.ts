import type { Messages } from './types';

export const pt: Messages = {
	htmlLang: 'pt-BR',
	nav: {
		home: 'Início',
		terms: 'Termos de Uso',
		gettingStarted: 'Primeiros Passos',
		search: 'Buscar',
		tebexStore: 'Loja Tebex',
		discordSupport: 'Suporte no Discord'
	},
	gettingStartedLabels: {
		downloadPurchase: { slug: 'download-da-compra', label: 'Download da Compra' },
		dependencies: { slug: 'dependencias', label: 'Dependências' },
		recommendedHosting: { slug: 'hospedagem-recomendada', label: 'Hospedagem Recomendada' },
		translations: { slug: 'traducoes', label: 'Traduções' },
		escrowErrors: { slug: 'erros-de-escrow', label: 'Erros de Escrow do FiveM' }
	},
	sectionLabels: {
		installation: { slug: 'instalacao', label: 'Instalação' },
		inventory: { slug: 'itens-de-inventario', label: 'Itens de Inventário' },
		configuration: { slug: 'configuracao', label: 'Configuração' },
		integrations: { slug: 'integracoes', label: 'UI e Integrações' },
		performance: { slug: 'desempenho', label: 'Desempenho e Som' },
		commands: { slug: 'comandos', label: 'Comandos e Permissões' },
		exports: { slug: 'exports', label: 'Exports' },
		troubleshooting: { slug: 'solucao-de-problemas', label: 'Solução de Problemas' },
		gameplay: { slug: 'guia-de-jogo', label: 'Guia de Jogo' },
		features: { slug: 'recursos', label: 'Sistemas e Recursos' },
		guide: { slug: 'como-usar', label: 'Como Usar' },
		changelog: { slug: 'changelog', label: 'Changelog' }
	},
	scripts: {
		bnSuspension: { spec: 'Suspensão a ar (air ride) standalone' },
		bnExhaust: { spec: 'Escapamento e efeitos sonoros' },
		bnTruck: { spec: 'Logística de transportadora, fiscalização MFT e risco de sonegação de carga' },
		bnMarket: { spec: 'Showroom de veículos ao vivo com financiamento e test-drive' },
		bnVehicleHistory: { spec: 'Histórico de veículos e rastreamento de quilometragem' }
	},
	search: { placeholder: 'Buscar na documentação...', noResultsPrefix: 'Nenhum resultado para', closeAria: 'Fechar busca', fallbackGroup: 'Geral' },
	header: { openMenuAria: 'Abrir menu', expandMenuAria: 'Expandir menu', collapseMenuAria: 'Recolher menu', closeMenuAria: 'Fechar menu' },
	cookie: { text: 'Este site usa cookies para melhorar sua experiência.', dismiss: 'Entendi' },
	breadcrumb: { docs: 'Docs' },
	pager: { prev: 'Anterior', next: 'Próximo', nav: 'Paginação' },
	toc: { heading: 'Nessa página' },
	specPlate: { techSheet: 'Ficha técnica', version: 'Versão', compatible: 'Compatível' },
	alert: { note: 'Nota', warning: 'Atenção', danger: 'Risco' },
	theme: { enableLight: 'Ativar tema claro', enableDark: 'Ativar tema escuro' },
	home: {
		title: 'Guias completos pra tudo',
		titleAccent: 'BigNoa',
		subtitle: 'Instalação, configuração, exports e changelog de cada script FiveM. Documentado de forma direta, sem enrolação.',
		quickLinksHeading: 'Atalhos',
		quickLinks: [
			{ label: 'Loja Tebex', description: 'Comprar ou renovar um script' },
			{ label: 'Suporte no Discord', description: 'Tirar dúvidas com a equipe' },
			{ label: 'Termos de Uso', description: 'Licenciamento e regras de uso' }
		],
		scriptsHeading: 'Scripts',
		itemsInStock: 'itens em estoque'
	},
	languageSwitcher: { aria: 'Selecionar idioma', en: 'English', pt: 'Português (BR)' }
};
