import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAdjacentSections } from './docPager.ts';
import { en } from './messages/en.ts';
import { pt } from './messages/pt.ts';

test('primeira seção não tem anterior (EN)', () => {
	const result = getAdjacentSections('/docs/bnExhaust/installation', en);
	assert.equal(result.prev, undefined);
	assert.deepEqual(result.next, {
		href: '/docs/bnExhaust/inventory-items',
		label: 'Inventory Items'
	});
});

test('última seção não tem próximo (EN)', () => {
	const result = getAdjacentSections('/docs/bnExhaust/changelog', en);
	assert.deepEqual(result.prev, { href: '/docs/bnExhaust/troubleshooting', label: 'Troubleshooting' });
	assert.equal(result.next, undefined);
});

test('seção do meio tem os dois lados (PT)', () => {
	const result = getAdjacentSections('/docs/bnTruck/configuracao', pt);
	assert.deepEqual(result.prev, {
		href: '/docs/bnTruck/itens-de-inventario',
		label: 'Itens de Inventário'
	});
	assert.deepEqual(result.next, { href: '/docs/bnTruck/guia-de-jogo', label: 'Guia de Jogo' });
});

test('caminho fora de /docs retorna vazio', () => {
	assert.deepEqual(getAdjacentSections('/terms', en), {});
});

test('script desconhecido retorna vazio', () => {
	assert.deepEqual(getAdjacentSections('/docs/bnInexistente/installation', en), {});
});
