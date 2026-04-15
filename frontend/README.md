🎨 Frontend - CRUD de Clientes

Interface web para gerenciamento de clientes, desenvolvida com React + Vite, consumindo uma API REST.

📌 Sobre o projeto

Este frontend permite:

Listar todos os clientes
Buscar cliente por ID
Criar novos clientes
Editar clientes existentes
Deletar clientes

Tudo integrado com o backend via requisições HTTP (fetch).

🛠️ Tecnologias
React
Vite
JavaScript (ES6+)
CSS
📁 Estrutura
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   │   └── Clientes.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js

⚙️ Como executar
# Clone o repositório
git clone https://github.com/carlosProgrammer25/crud-clientes-fullstack.git

# Acesse o frontend
cd frontend

# Instale as dependências
npm install

# Execute o projeto
npm run dev

🔗 Integração com API

O projeto consome uma API backend.

Configure a URL no arquivo .env:

VITE_API_URL=http://localhost:3000/
📋 Funcionalidades
🔍 Buscar cliente por ID
➕ Criar cliente
✏️ Editar cliente
🗑️ Deletar cliente
📄 Listar todos os clientes
