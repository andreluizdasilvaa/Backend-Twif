# Backend-Twif

Backend-Twif é uma API RESTful desenvolvida em Node.js com Express, Prisma ORM e MySQL, servindo como backend para uma rede social acadêmica do IFSP. O sistema permite cadastro, autenticação, postagens, comentários, curtidas, notificações, gerenciamento de perfil, troca de imagens de perfil e suporte.

## Sumário

- [Tecnologias](#tecnologias)
- [Configuração](#configuração)
- [Scripts](#scripts)
- [Estrutura das Rotas](#estrutura-das-rotas)
- [Modelos Principais](#modelos-principais)
- [Funcionalidades](#funcionalidades)
- [Validação e Segurança](#validação-e-segurança)
- [Observações](#observações)

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- MySQL
- JWT 
- Multer
- dotenv, cors, bcrypt, cookie-parser

## Configuração

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo `.env` (baseie-se em `.env.example`).
4. Configure o banco de dados MySQL e ajuste a variável `DATABASE_URL`.
5. Execute as migrations do Prisma:
   ```bash
   npx prisma migrate deploy
   ```
6. (Opcional) Popule o banco com dados fake:
   ```bash
   npm run seed
   ```
7. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — Inicia o servidor em modo desenvolvimento.
- `npm start` — Inicia o servidor em produção.
- `npm run seed` — Popula o banco de dados com dados de teste.

## Estrutura das Rotas

- `/auth` — Autenticação (login, registro, validação de email/usernick, logout)
- `/feed` — Postagens (listar, criar, curtir/descurtir, deletar, buscar por ID)
- `/comments` — Comentários (listar, criar, deletar)
- `/user` — Perfil (dados do usuário, editar info, notificações, avatar)
- `/relatorios` — Relatórios administrativos (contagem de usuários, posts, etc.)
- `/image` — Imagens de perfil (listar imagens padrão, buscar imagem de usuário)
- `/suport` — Suporte (criar, listar, marcar como visto, deletar chamados)

## Modelos Principais

- **User**: Usuário, com campos para email, senha, nome, usernick, admin, foto, etc.
- **Post**: Postagens dos usuários.
- **Comment**: Comentários em posts.
- **Like**: Curtidas em posts.
- **Notification**: Notificações de ações relevantes.
- **Order**: Chamados de suporte.
- **PostDeleted**: Posts deletados por administradores.

## Funcionalidades

- Cadastro e login com autenticação JWT (cookie httpOnly seguro).
- Validação de email institucional IFSP e usernick único.
- CRUD de posts, comentários e curtidas.
- Notificações automáticas para curtidas, comentários e ações administrativas.
- Upload e seleção de imagens de perfil (padrão ou customizada).
- Edição de informações do perfil.
- Rotas e permissões diferenciadas para administradores.
- Sistema de suporte com notificação ao usuário quando chamado for visualizado.

## Validação e Segurança

- Hash de senha com bcrypt.
- Autorização por JWT e checagem de permissões (usuário/admin).
- CORS configurado para o frontend.
- Cookies httpOnly e secure.

## Observações

- O projeto utiliza Prisma para gerenciamento do banco de dados e migrations.
- As imagens de perfil padrão ficam em `/uploads/defaults`.
- O backend espera que o frontend envie e consuma cookies ou header 'Bearer' para autenticação.
- Para ambiente de produção, ajuste as variáveis de ambiente e permissões de CORS conforme necessário.

---

**Autores:** André Luiz, Erick Castilho, Geovana Barbosa e Silda Pereira.

