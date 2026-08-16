import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getInitialTheme, THEME_STORAGE_KEY } from './theme.ts';

test('THEME_STORAGE_KEY é a chave usada em todo o app', () => {
	assert.equal(THEME_STORAGE_KEY, 'bignoa-theme');
});

test('usa o tema salvo quando existe', () => {
	const storage = { getItem: () => 'dark' };
	assert.equal(getInitialTheme(storage, false), 'dark');
});

test('ignora valor inválido salvo e cai para prefers-color-scheme', () => {
	const storage = { getItem: () => 'sepia' };
	assert.equal(getInitialTheme(storage, true), 'dark');
	assert.equal(getInitialTheme(storage, false), 'light');
});

test('sem storage disponível, cai para prefers-color-scheme', () => {
	assert.equal(getInitialTheme(undefined, true), 'dark');
	assert.equal(getInitialTheme(undefined, false), 'light');
});

test('storage que lança erro (ex.: modo privado) cai para prefers-color-scheme', () => {
	const storage = {
		getItem: () => {
			throw new Error('blocked');
		}
	};
	assert.equal(getInitialTheme(storage, true), 'dark');
});
