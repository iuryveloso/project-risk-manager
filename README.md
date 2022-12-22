# Gerenciador de Riscos de Projetos

Aplicação para gerenciar riscos em projetos, feita com [Next.js](https://nextjs.org/).

## Instalação

Primeiramente, é necessario ter instalado o [Node.js](https://nodejs.org/en/) em seu computador.

Depois, inicie em modo desenvolvedor com o comando:

```bash
yarn dev
```

Ou, inicie em modo de produção:

```bash
yarn build && yarn dev
```

A aplicação será executada em http://localhost:3000. Para completa execução, é necessária a conexão com [API](https://github.com/iuryveloso/api_project-risk-manager) do sistema.

As configuração do sistema devem seu feitas através de um arquivo `.env`, que pode ser criado a partir do arquivo `.env example`.

É possivel também usar o [Docker](https://docs.docker.com/engine/install/) para rodar essa aplicação. Para isso, basta utilizar [este](https://github.com/iuryveloso/docker_project-risk-manager) repositório.
