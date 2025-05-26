# Trabalho Fabrício React

Este é um projeto React que implementa uma interface moderna e responsiva utilizando TailwindCSS e diversas outras tecnologias modernas.

## 🚀 Tecnologias Utilizadas

### Principais Dependências

- **React (v19.1.0)**: Framework JavaScript para construção da interface
- **React Router DOM (v7.6.0)**: Gerenciamento de rotas da aplicação
- **Axios (v1.9.0)**: Cliente HTTP para comunicação com a API
- **TailwindCSS (v4.1.7)**: Framework CSS para estilização
- **React Icons (v5.5.0)**: Biblioteca de ícones
- **React Select (v5.10.1)**: Componente de select customizado

### Dependências de Desenvolvimento

- **Testing Library**: Suite de testes para React
- **Autoprefixer**: Processamento CSS
- **PostCSS**: Processamento CSS

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Configuração de serviços (API)
├── styles/        # Estilos globais
├── utils/         # Utilitários
└── App.js         # Componente principal
```

## 📱 Páginas

O projeto contém as seguintes páginas principais:

- **Inicial**: Página de entrada da aplicação
- **Home**: Página principal com o conteúdo principal
- **Agradecimento**: Página de feedback após ações do usuário
- **Admin**: Área administrativa (acesso restrito)

## 🔒 Autenticação

O projeto utiliza autenticação via token JWT, implementada através de:

- `PrivateRoute.js`: Componente para proteção de rotas
- Token armazenado no localStorage
- Headers de autorização automáticos nas requisições

## 🌐 Integração com API

A aplicação se conecta com um backend hospedado na Vercel:

- **Base URL**: `https://backend-completo.vercel.app/app`
- Utiliza Axios para requisições HTTP
- Configuração centralizada em `services/api.js`
- Headers de autenticação automáticos

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto:

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`
