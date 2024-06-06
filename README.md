# Produção Temática - GEEPJ - Consultor Matriz
## Decrição
O projeto é uma SPA com Angular, TypeScript, PrimeNG e Leaflet que deverá consumir uma API, que contém dados de unidades de atendimento CAIXA, e mostrar as unidades em um mapa interativo.Para mais informações, a especificação completa pode ser acessada através do link abaixo:

[**Especificação - PT GEEPJ**](https://github.com/alansalvaterra/PT-GEEPJ-CM/blob/main/frontend/src/assets/especificacao.pdf)


## Visualização da aplicação:

<!-- gravar gif aplicacao no final -->
<p align="center">
  <img src="./src/assets/ptgeepj.gif" alt="Video da aplicação funcionando">
</p>

## Funcionalidades
- A aplicação permite a visualização da localização das unidades CAIXA em mapa interativo na página inicial. Há opção para filtrar as unidades por região, por estado, por município, por SR ou todas as unidades.
- O último filtro prevalece na renderização das unidades, permitindo apenas a aplicação de um filtro por vez.
- Ao apontar o mouse em um marcador do mapa aparecerá o nome da unidade correspondente.
- Ao clicar em algum marcador abre um pop-up no mapa com o nome da unidade, região, cidade/UF e SR de vinculação.

## Backend
Considerando que realizei o desenvolvimento desta avalição em meu computador pessoal e não tive acesso às rotas da API fornecida, eu salvei o retorno dos endpoints de unidades, regiões, UF, municípios e SR e desenvolvi uma API replicando estas informações para poder atender o requisito de consultar os dados em tempo real. A API foi desenvolvida em Node.js com Express.

[**Documentação da API**](#)


## Acesso ao projeto
(...)

### Acesso online
(...)

### Acesso em seu ambiente de desenvolvimento local
Pré requisitos:
(...)

