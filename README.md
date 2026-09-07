# Nosso Jardim

Mini-site romântico/interativo para hospedagem no GitHub Pages.

## Estrutura

- `index.html` — estrutura da página
- `style.css` — visual, animações e responsividade
- `script.js` — flores, pontos, mensagens e salvamento
- `assets/` — cinco imagens dos personagens

## Como funciona

Cada flor começa em 0/100. O botão "Regar" adiciona 10 pontos e altera visualmente o crescimento da flor.

A partir de 20 pontos, a mensagem da flor fica acessível. Em 100 pontos, a flor é considerada florescida.

O progresso é salvo no `localStorage` do navegador. Esta primeira versão não usa banco de dados, então o progresso é específico daquele navegador/dispositivo.

## Personalização

No início de `script.js` existe a constante `flowers`. É ali que devem ser alterados:

- nomes das flores;
- temas;
- nomes dos personagens;
- frases;
- imagens.

Quando o conteúdo final estiver pronto, também podemos trocar a mensagem final genérica pela carta real.
