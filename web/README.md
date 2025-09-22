 Projeto de Testes Automatizados - Webdojo

Este projeto contém testes automatizados para a aplicação **Webdojo** utilizando **Cypress**.  

A aplicação Webdojo está no mesmo repositório, permitindo que os testes sejam executados localmente após iniciar o servidor da aplicação.

---

## Estrutura do Projeto

cypress/
│
├── e2e/ # Testes end-to-end
│ └── login.cy.js # Exemplo de teste de login
│
├── fixtures/ # Dados de teste em formato JSON
│ ├── cep.json
│ ├── consultancy.json
│ └── document.pdf
│
└── support/ # Comandos e utilitários personalizados
├── commands.js # Custom commands do Cypress
├── e2e.js # Configurações adicionais para testes E2E
└── utils.js # Funções auxiliares

yaml
Copiar código

---

## Scripts Disponíveis

No `package.json` estão configurados os seguintes scripts para facilitar a execução dos testes e do servidor da aplicação:

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia a aplicação Webdojo localmente em `http://localhost:3000`. |
| `npm run test` | Executa todos os testes Cypress com resolução de tela de **1440x900**. |
| `npm run test:login` | Executa apenas o teste de login (`login.cy.js`) em **desktop** (1440x900). |
| `npm run test:login:mobile` | Executa apenas o teste de login (`login.cy.js`) em **mobile** (414x896). |

---

## Requisitos

- Node.js (versão 18 ou superior recomendada)
- npm
- Cypress instalado localmente (instalado via dependência do projeto)

---

## Como Executar

1. Instale as dependências do projeto:

```bash
npm install
Inicie a aplicação Webdojo:

bash
Copiar código
npm run dev
Execute os testes desejados:

Todos os testes (desktop):

bash
Copiar código
npm run test
Teste de login (desktop):

bash
Copiar código
npm run test:login
Teste de login (mobile):

bash
Copiar código
npm run test:login:mobile
Observações
Os dados de teste estão armazenados na pasta cypress/fixtures.

Comandos customizados estão na pasta cypress/support/commands.js.

A configuração de viewport para os testes pode ser alterada nos scripts ou diretamente nos testes.