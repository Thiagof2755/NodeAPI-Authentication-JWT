# Node API — autenticação com JWT

API REST didática para cadastro e autenticação de usuários com Node.js, Express e MySQL. O projeto demonstra o fluxo básico de criação de contas, proteção de senhas com `bcrypt` e emissão de tokens JSON Web Token (JWT).

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)

## O que o projeto demonstra

- Cadastro de usuários em banco MySQL.
- Hash de senhas com `bcrypt` e salt de 10 rounds.
- Login por e-mail e senha.
- Geração de token JWT com validade de 1 hora.
- Separação entre rotas, controllers, models e configuração do banco.
- Uso de variáveis de ambiente para credenciais e segredo do token.

## Tecnologias

- Node.js
- Express 4
- MySQL 2
- JSON Web Token
- bcrypt
- dotenv
- Nodemon

## Estrutura

```text
.
├── app.js                         # Inicialização do Express e conexão com o MySQL
├── src
│   ├── config/db.js               # Configuração compartilhada do banco
│   ├── controller/userController.js
│   ├── model/userModel.js
│   └── routes/User.js
├── .env.example                   # Modelo das variáveis de ambiente
└── package.json
```

## Como executar

### Pré-requisitos

- Node.js 18 ou superior
- MySQL em execução

### 1. Clone e instale as dependências

```bash
git clone https://github.com/Thiagof2755/NodeAPI-Authentication-JWT.git
cd NodeAPI-Authentication-JWT
npm install
```

### 2. Crie o banco e a tabela

Execute no MySQL:

```sql
CREATE DATABASE node_auth CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE node_auth;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
```

### 3. Configure o ambiente

Copie o arquivo de exemplo e preencha com os dados locais:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_DATABASE=node_auth
SECRET_KEY=use_um_segredo_longo_e_aleatorio
```

O arquivo `.env` é ignorado pelo Git e não deve ser publicado.

### 4. Inicie a API

```bash
npm start
```

A aplicação fica disponível em `http://localhost:3000`.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/` | Verifica se a API está respondendo |
| `POST` | `/user/auth/register` | Cadastra um usuário |
| `POST` | `/user/auth/login` | Autentica e devolve um JWT |
| `GET` | `/user/` | Lista usuários; rota didática ainda sem proteção |

### Cadastro

```bash
curl -X POST http://localhost:3000/user/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário de teste",
    "email": "teste@example.com",
    "password": "senha-segura",
    "confirmPassword": "senha-segura"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/user/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha-segura"
  }'
```

Uma autenticação válida retorna o token e o nome do usuário:

```json
{
  "token": "seu_token_jwt",
  "name": "Usuário de teste"
}
```

## Segurança e escopo

Este é um projeto de estudo. Antes de utilizá-lo em produção, ainda é necessário adicionar middleware de autorização, proteger a listagem de usuários, validar e normalizar entradas, limitar tentativas de login, tratar e-mails duplicados e incluir testes automatizados. Nunca reutilize o `SECRET_KEY` do ambiente de desenvolvimento em produção.

## Próximas evoluções

- Middleware para validar o header `Authorization: Bearer <token>`.
- Rotas protegidas e controle de permissões.
- Validação de payloads com uma biblioteca de schemas.
- Migrações de banco e testes de integração.
- Documentação OpenAPI/Swagger.

## Autor

Desenvolvido por [Thiago Alves](https://github.com/Thiagof2755).
