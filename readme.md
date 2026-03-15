💰 Sistema de Controle de Gastos Residenciais
📌 Descrição do Projeto

Este projeto consiste em um sistema de controle de gastos residenciais, permitindo o registro e gerenciamento de receitas e despesas associadas a pessoas e categorias.

O sistema tem como objetivo facilitar o controle financeiro de uma residência, organizando receitas e despesas de forma simples, clara e eficiente.

🚀 Funcionalidades

O sistema permite:

👤 Cadastro de pessoas

🏷 Cadastro de categorias de gastos

💸 Registro de transações financeiras

📊 Dashboard financeiro com resumo geral

📈 Visualização de totais por pessoa

📉 Visualização de totais por categoria

💰 Controle completo de receitas e despesas

🧠 Lógica e Estrutura do Sistema

A aplicação foi dividida em três camadas principais:

🔧 Backend (API)

Desenvolvido com:

ASP.NET Core

Entity Framework Core

SQL Server

A API é responsável por:

Implementação das regras de negócio

Validações

Comunicação com o banco de dados

Fornecimento de dados para o frontend

📌 Regras implementadas

Transações devem possuir valor maior que zero

Categorias possuem finalidade:

Receita

Despesa

Ambas

Menores de idade não podem registrar receitas

Cada transação precisa de:

Pessoa válida

Categoria válida

Caso contrário, o sistema retorna erro de validação.

🎨 Frontend

Desenvolvido com:

React

Chakra UI

Axios

Responsável por:

Interface do usuário

Consumo da API

Exibição dos dados

Cadastro de informações

A interface foi desenvolvida de forma responsiva, funcionando em:

💻 Desktop

📱 Mobile

📟 Tablet

🗄 Banco de Dados

Banco utilizado:

SQL Server

Entidades principais

Pessoas

Categorias

Transações

O script de criação do banco está localizado em:

database/banco.sql
📂 Estrutura do Projeto
ControleGastosResidenciais
│
├── backend
│   └── ControleGastos.API
│
├── frontend
│   └── controle-gastos-front
│
├── database
│   └── banco.sql
│
└── README.md
⚙️ Como Executar o Projeto
1️⃣ Criar o Banco de Dados

Abrir o SQL Server Management Studio

Abrir o arquivo:

database/banco.sql

Executar o script para criar o banco e as tabelas.

2️⃣ Executar o Backend

Abra o terminal dentro da pasta:

backend/ControleGastos.API

Execute:

dotnet restore
dotnet run

A API será iniciada e ficará disponível para o frontend.

3️⃣ Executar o Frontend

Abra o terminal dentro da pasta:

frontend/controle-gastos-front

Execute:

npm install
npm run dev

Após isso, o frontend será aberto automaticamente no navegador.

📊 Dashboard e Cálculos

O sistema realiza automaticamente os seguintes cálculos:

💰 Totais Gerais

Total de Receitas

Total de Despesas

Saldo líquido

👤 Totais por Pessoa

Cálculo:

Saldo = Receitas - Despesas
🏷 Totais por Categoria

Cálculo:

Saldo da categoria = Receitas - Despesas
🧩 Tecnologias Utilizadas
Backend

ASP.NET Core

Entity Framework Core

SQL Server

Frontend

React

Chakra UI

Axios

Banco de Dados

SQL Server

📌 Observações

O projeto foi desenvolvido com foco em:

✔ Organização de código

✔ Separação de responsabilidades

✔ Implementação de regras de negócio

✔ Interface responsiva

✔ Código documentado

Todas as funções e métodos possuem comentários explicando a lógica e finalidade, facilitando:

entendimento

manutenção

evolução do sistema