# CP5 - Login/Cadastro

## Descrição do Projeto
Este projeto implementa um sistema de autenticação com React Hook Form e json-server, permitindo login e cadastro de usuários. O sistema verifica duplicidade de usuários e utiliza localStorage para simular a autenticação.

## Funcionalidades
- Página de login com validação de campos
- Página de cadastro com validação de campos
- Verificação de duplicidade de usuário/email
- Autenticação simulada com localStorage
- Exibição de informações do usuário após login

## Tecnologias Utilizadas
- React
- TypeScript
- Vite
- React Hook Form
- React Router DOM
- Tailwind CSS
- JSON Server

## Como Executar o Projeto
1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor JSON: `npm run server`
4. Em outro terminal, inicie a aplicação: `npm run dev`
5. Acesse a aplicação em: `http://localhost:5173`

## Integrantes do Grupo
- Nome: [Seu Nome]
- RM: [Seu RM]

## Estrutura do Projeto
- `/src/pages/Login.tsx`: Página de login
- `/src/pages/Cadastro.tsx`: Página de cadastro
- `/src/pages/Home.tsx`: Página inicial após login
- `/db.json`: Banco de dados JSON para armazenar usuários
