# 🚀 CRUD de Clientes - Fullstack

Aplicação fullstack para gerenciamento de clientes com **React (frontend)** e **Node.js + Prisma (backend)**.

## 📌 Funcionalidades
- Criar, listar, buscar, editar e deletar clientes

## 🛠️ Tecnologias
- Frontend: React, Vite, CSS
- Backend: Node.js, Express, TypeScript, Prisma
- Banco: MySQL / MariaDB

## ⚙️ Como executar

```bash
git clone https://github.com/carlosProgrammer25/crud-clientes-fullstack.git
cd crud-clientes-fullstack

# backend
cd backend
npm install
npx prisma generate
npm start

# frontend (novo terminal)
cd frontend
npm install
npm run dev
