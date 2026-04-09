# CRUD com Prisma ORM

Projeto de estudo demonstrando um CRUD completo utilizando Node.js, TypeScript, Prisma ORM e MySQL/MariaDB.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Prisma ORM
- MySQL/MariaDB

## 📋 Funcionalidades

| Operação | Função | Descrição |
|----------|--------|-----------|
| Create | `addCliente()` | Criar novo cliente |
| Read | `getClientes()` | Listar todos clientes |
| Read | `getCliente(id)` | Buscar cliente por ID |
| Update | `UpdateCliente(id, data)` | Atualizar cliente |
| Delete | `deleteCliente(id)` | Deletar cliente |


## 🔧 Como executar

```bash
# Clone o repositório
git clone https://github.com/carlosProgrammer25/crud-prisma.git

# Instale as dependências
npm install

# Configure o .env com sua DATABASE_URL
# Exemplo: DATABASE_URL="mysql://root:senha@localhost:3306/crud"

# Gere o Prisma Client
npx prisma generate

# Execute o projeto
npm start


src/
├── index.ts                    # Ponto de entrada
└── repositories/
    └── clientesRepository.ts   # CRUD do cliente
