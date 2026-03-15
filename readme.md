# 💰 Sistema de Controle de Gastos Residenciais

## 📌 Descrição do Projeto

Este projeto consiste em um **sistema de controle de gastos residenciais**, permitindo o registro e gerenciamento de **receitas e despesas associadas a pessoas e categorias**.

O sistema tem como objetivo **facilitar o controle financeiro de uma residência**, organizando receitas e despesas de forma **simples, clara e eficiente**.

---

# 🚀 Funcionalidades

O sistema permite:

- 👤 Cadastro de pessoas
- 🏷 Cadastro de categorias de gastos
- 💸 Registro de transações financeiras
- 📊 Dashboard financeiro com resumo geral
- 📈 Visualização de totais por pessoa
- 📉 Visualização de totais por categoria
- 💰 Controle completo de receitas e despesas

---

# 🧠 Lógica e Estrutura do Sistema

A aplicação foi dividida em **três camadas principais**:

- 🔧 Backend (API)
- 🎨 Frontend
- 🗄 Banco de Dados

---

# 🔧 Backend (API)

Desenvolvido com:

- **ASP.NET Core**
- **Entity Framework Core**
- **SQL Server**

A API é responsável por:

- Implementação das **regras de negócio**
- **Validações**
- Comunicação com o **banco de dados**
- Fornecimento de **dados para o frontend**

---

## 📌 Regras implementadas

- Transações devem possuir **valor maior que zero**
- Categorias possuem finalidade:
  - Receita
  - Despesa
  - Ambas
- **Menores de idade não podem registrar receitas**
- Cada transação precisa possuir:
  - Pessoa válida
  - Categoria válida

Caso contrário, o sistema retorna **erro de validação**.

---

# 🎨 Frontend

Desenvolvido com:

- **React**
- **Chakra UI**
- **Axios**

Responsável por:

- Interface do usuário
- Consumo da API
- Exibição dos dados
- Cadastro de informações

A interface foi desenvolvida de forma **responsiva**, funcionando em:

- 💻 Desktop
- 📱 Mobile
- 📟 Tablet

---

# 🗄 Banco de Dados

Banco utilizado:

**SQL Server**

### Entidades principais

- Pessoas
- Categorias
- Transações

O script de criação do banco está localizado em:
