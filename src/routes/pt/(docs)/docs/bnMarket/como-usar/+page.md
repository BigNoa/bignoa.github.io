---
title: bnMarket - Como Usar
---

# Como Usar

## Para jogadores

- Chegue perto de qualquer veículo no showroom e aperte **E** pra abrir a UI do marketplace.
- **Compre à vista** ou escolha **financiamento** com um plano de parcelas personalizado.
- Aperte **G** perto de um veículo pra um test-drive gratuito e cronometrado. O carro volta sozinho quando o tempo acaba. Enquanto uma unidade está em test-drive, outros jogadores não conseguem acessá-la.
- Consulte os financiamentos ativos com `/meusfinanciamentos`. As parcelas são cobradas automaticamente da conta bancária do jogador a cada `Config.Financing.intervalHours` horas; ultrapassar `Config.Financing.maxMissedPayments` gera retomada do veículo.

## Comandos de admin

Protegidos pela permissão ACE `command.bnmarket` (veja [Instalação](/pt/docs/bnMarket/instalacao)):

| Subcomando | Função |
|------------|--------|
| `list` | Lista o estoque atual de veículos no console |
| `restock` | Força uma reposição, de um veículo ou do catálogo inteiro |
| `webhook` | Envia uma mensagem de teste pro webhook do Discord configurado |

Veículos do showroom mostram blip no mapa quando em estoque, se `blip` estiver ativado na entrada.
