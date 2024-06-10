# Produção Temática - GEEPJ - Consultor Matriz
## Decrição
O projeto é uma SPA com Angular, TypeScript, PrimeNG e Leaflet que consome uma API com dados sobre a localização de unidades de atendimento CAIXA e mostra as unidades em um mapa interativo. Para maiores informações, a especificação completa pode ser acessada através do link abaixo:

[**Especificação - PT GEEPJ**](https://github.com/alansalvaterra/PT-GEEPJ-CM/blob/main/frontend/src/assets/especificacao.pdf)


## Visualização da aplicação:

<p align="center">
  <img src="/frontend/src/assets/animacaopagina.gif" alt="Video da aplicação funcionando">
</p>

## Funcionalidades
- A aplicação permite a visualização da localização das unidades CAIXA em mapa interativo na página inicial. Há opção para filtrar as unidades por região, por estado, por município, por SR ou todas as unidades.
- O último filtro prevalece na renderização das unidades, permitindo apenas a aplicação de um filtro por vez.
- Ao apontar o mouse em um marcador do mapa aparecerá o nome da unidade correspondente.
- Ao clicar em algum marcador abre um pop-up no mapa com o nome da unidade, região, cidade/UF e SR de vinculação.

## Backend
Considerando que realizei o desenvolvimento desta avaliação em meu computador pessoal e não tive acesso às rotas da API fornecida, eu salvei o retorno do .json dos endpoints de unidades, regiões, UF, municípios, SR e desenvolvi uma API replicando estas informações para poder atender o requisito de consultar os dados em tempo real. A API foi desenvolvida em Node.js com Express.

Nota: O endpoint fornecido para UF estava apontando para todas as unidades, então, desenvolvi  por conta própria com o seguinte padrão:

    {
        "count": 27,
        "rows": [
            {
                "uf": "AC"
            },
            {
                "uf": "AL"
            },
            (...)


[**Documentação da API**](https://documenter.getpostman.com/view/33995178/2sA3XJk4w9#94f9d4aa-dd3f-4700-a306-f91dcda0fc76)


## Instruções para rodar o projeto
### Pré-requisitos

- [Git](http://git-scm.com)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passos para Rodar o Projeto
1. **Clone o repositório para o seu ambiente local:**

    ```
    > git clone https://github.com/alansalvaterra/PT-GEEPJ-CM.git
    > cd PT-GEEPJ-CM
   ```

2. **Com o Docker em execução, construa e inicie o container:**

    ```
    > docker-compose up --build
    ```

3. **Acesse a aplicação:**

    ```
    Frontend: http://localhost:4200
    Backend: http://localhost:3000 (endpoints na documentação)
    ```

4. Observação: Certifique-se de que as portas 3000 e 4200 estão disponíveis no seu ambiente.

