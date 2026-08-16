import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localeFromPathname, localizedPath } from './i18n.ts';

test('raiz é inglês', () => {
	assert.equal(localeFromPathname('/'), 'en');
});

test('/docs sem prefixo é inglês', () => {
	assert.equal(localeFromPathname('/docs/bnExhaust/installation'), 'en');
});

test('/pt é português', () => {
	assert.equal(localeFromPathname('/pt'), 'pt');
});

test('/pt/docs/... é português', () => {
	assert.equal(localeFromPathname('/pt/docs/bnExhaust/instalacao'), 'pt');
});

test('localizedPath: home EN -> PT', () => {
	assert.equal(localizedPath('/', 'pt'), '/pt');
});

test('localizedPath: home PT -> EN', () => {
	assert.equal(localizedPath('/pt', 'en'), '/');
});

test('localizedPath: seção com slug traduzido EN -> PT', () => {
	assert.equal(localizedPath('/docs/bnExhaust/installation', 'pt'), '/pt/docs/bnExhaust/instalacao');
});

test('localizedPath: seção com slug traduzido PT -> EN', () => {
	assert.equal(localizedPath('/pt/docs/bnTruck/configuracao', 'en'), '/docs/bnTruck/configuration');
});

test('localizedPath: seção com slug igual nos dois idiomas', () => {
	assert.equal(localizedPath('/docs/bnMarket/exports', 'pt'), '/pt/docs/bnMarket/exports');
});

test('localizedPath: termos/terms', () => {
	assert.equal(localizedPath('/terms', 'pt'), '/pt/termos');
	assert.equal(localizedPath('/pt/termos', 'en'), '/terms');
});

test('localizedPath: já está no idioma alvo, retorna o mesmo path', () => {
	assert.equal(localizedPath('/docs/bnExhaust/installation', 'en'), '/docs/bnExhaust/installation');
});
