---
title: bnTruck - Itens de Inventário
---

<script>
  import Alert from '$lib/components/Alert.svelte';
  import TabGroup from '$lib/components/TabGroup.svelte';
</script>

# Itens de Inventário

O bnTruck precisa de quatro itens registrados no seu resource de inventário:

| Item | Nome | Função |
|------|------|--------|
| `truck_device` | Tablet do Caminhoneiro | Abre o menu principal de logística (empresa, cargas, atribuições) |
| `mft_device` | Dispositivo MFT | Módulo de fiscalização de transporte, uso exclusivo de agentes autorizados |
| `nota_fiscal` | Nota Fiscal | Documento da carga, checado durante fiscalizações |
| `false_note` | Nota Falsificada | Documento falso pra enganar fiscais |

<TabGroup tabs={[{ id: 'ox', label: 'ox_inventory' }, { id: 'qbcore', label: 'QBCore' }, { id: 'esx', label: 'ESX / Legacy' }]}>
{#snippet children(active)}
{#if active === 'ox'}
Adicione as definições em `ox_inventory/data/items.lua`, com `client.export` apontando pros exports abaixo e pesos `100`, `200`, `0`, `0` respectivamente.
{:else if active === 'qbcore'}
Adicione as entradas em `qb-core/shared/items.lua` (ou na tabela de items do qbx-core) com os nomes, labels e pesos correspondentes.
{:else}
Insira os quatro registros na tabela `items` do seu banco de dados, com nomes, labels e pesos correspondentes.
{/if}
{/snippet}
</TabGroup>

<Alert type="info">
Copie as imagens da pasta <code>inventory/images/</code> do resource pra pasta de imagens do seu sistema de inventário, pra elas aparecerem corretamente.
</Alert>
