import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSearchIndex, searchIndex } from './search.ts';

const sampleDocs = {
	'/src/routes/(docs)/docs/bnExhaust/installation/+page.md': `---
title: bnExhaust - Installation
---

# Installation

Exhaust effects with custom sound and particles. Configure the ESX or QBCore framework.
`,
	'/src/routes/(docs)/terms/+page.md': `---
title: Terms of Use
---

# Terms of Use

BigNoa store usage rules.
`,
	'/src/routes/pt/(docs)/docs/bnExhaust/instalacao/+page.md': `---
title: bnExhaust - Instalação
---

# Instalação

Efeitos de escape com som e partículas customizadas. Configure o framework ESX ou QBCore.
`
};

test('buildSearchIndex extrai título, href e grupo do caminho (EN)', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	const doc = index.find((d) => d.href === '/docs/bnExhaust/installation');
	assert.ok(doc);
	assert.equal(doc?.title, 'bnExhaust - Installation');
	assert.equal(doc?.group, 'bnExhaust');
});

test('buildSearchIndex ignora páginas de outro idioma', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	assert.equal(
		index.some((d) => d.href === '/pt/docs/bnExhaust/instalacao'),
		false
	);
});

test('buildSearchIndex usa o fallback do dicionário pra páginas fora de /docs', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	const doc = index.find((d) => d.href === '/terms');
	assert.equal(doc?.group, 'General');
});

test('buildSearchIndex filtra por locale PT-BR', () => {
	const index = buildSearchIndex(sampleDocs, 'pt');
	assert.equal(index.length, 1);
	assert.equal(index[0].href, '/pt/docs/bnExhaust/instalacao');
});

test('searchIndex encontra por título', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	const results = searchIndex(index, 'terms');
	assert.equal(results.length, 1);
	assert.equal(results[0].href, '/terms');
});

test('searchIndex encontra por conteúdo, não só título', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	const results = searchIndex(index, 'custom sound');
	assert.equal(results.length, 1);
	assert.equal(results[0].href, '/docs/bnExhaust/installation');
});

test('searchIndex retorna vazio pra query vazia', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	assert.deepEqual(searchIndex(index, '   '), []);
});

test('searchIndex retorna vazio quando nada bate', () => {
	const index = buildSearchIndex(sampleDocs, 'en');
	assert.deepEqual(searchIndex(index, 'xilofone'), []);
});
