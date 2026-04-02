# Rank GC

Sistema de Ranking e Gestão para Grupos de Conexão (GCs)

![License](https://img.shields.io/github/license/SamuelDomingos/rank-gc?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/SamuelDomingos/rank-gc?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/SamuelDomingos/rank-gc?style=for-the-badge)
![Top Language](https://img.shields.io/github/languages/top/SamuelDomingos/rank-gc?style=for-the-badge)

Rank GC é uma aplicação web robusta desenvolvida com Next.js que oferece um sistema completo de gestão e ranking para Grupos de Conexão (GCs). O projeto visa simplificar o acompanhamento de atividades, engajamento e desempenho de GCs em diferentes "tribos" ou ministérios, proporcionando uma visão clara e comparativa do progresso.

Com um painel administrativo intuitivo, a plataforma permite o gerenciamento de usuários e GCs, o registro de dados diários como presença, visitantes e membros servindo, além do controle de cestas básicas arrecadadas. O sistema calcula automaticamente pontuações e gera rankings detalhados por gênero e categoria, identificando os GCs de destaque do mês.

Relatórios abrangentes com opções de exportação para PDF e Excel auxiliam na análise de desempenho e tomada de decisões, tornando o Rank GC uma ferramenta essencial para líderes e administradores de comunidades que buscam otimizar a gestão e incentivar o crescimento de seus grupos.

## Status do Projeto

✅ Estável

## 🚀 Acesso ao Projeto

[Acesse o Projeto Online](https://rank-gc.vercel.app)

## ✨ Funcionalidades Principais

*   **Autenticação de Usuários:** Login seguro com NextAuth.js, suportando diferentes cargos (ADMIN e MEMBRO).
*   **Painel Administrativo:** Gerenciamento completo de usuários (criação, listagem e exclusão) e GCs.
*   **Gestão de GCs:** Criação, edição e exclusão de Grupos de Conexão, com upload de avatares via Vercel Blob.
*   **Registro de Atividades Diárias:** Acompanhamento de presença em GCs e cultos, número de visitantes e membros servindo.
*   **Controle de Cestas Básicas:** Registro e acompanhamento do valor arrecadado pelos GCs.
*   **Sistema de Pontuação e Ranking:** Cálculo automático de pontos com base em diversas métricas (presença, visitantes, cestas, servir) e geração de rankings gerais e por categoria (masculino/feminino).
*   **GC do Mês:** Destaque para o GC com melhor desempenho no período.
*   **Relatórios Detalhados:** Visão geral e comparativa do desempenho dos GCs, com filtros por mês e ano.
*   **Exportação de Relatórios:** Funcionalidade para exportar dados para PDF, Excel e copiar para WhatsApp.
*   **Configuração Geral:** Definição do valor das cestas básicas para cálculo de pontuação.
*   **Temas:** Suporte a tema claro e escuro.

## 🛠️ Tecnologias Utilizadas

*   **Framework:** Next.js 16 (App Router)
*   **Linguagem:** TypeScript
*   **ORM:** Prisma
*   **Banco de Dados:** PostgreSQL (adaptador `pg`)
*   **Autenticação:** NextAuth.js
*   **Estilização:** Tailwind CSS, Shadcn UI
*   **Validação de Formulários:** Zod, React Hook Form
*   **Upload de Arquivos:** Vercel Blob
*   **Manipulação de Datas:** date-fns
*   **Geração de PDF:** jsPDF
*   **Geração de Excel:** XLSX
*   **Notificações:** Sonner
*   **Ícones:** Lucide React, Remixicon React

## 📂 Estrutura do Projeto

*   `app/`: Contém as rotas da aplicação (páginas e API routes) e a lógica de UI.
    *   `app/admin/`: Painel administrativo para gerenciamento de usuários.
    *   `app/api/`: Rotas da API para autenticação, GCs, registros e relatórios.
    *   `app/tribo/[name]/`: Páginas dinâmicas para cada "tribo", exibindo rankings e funcionalidades de registro.
    *   `app/generated/prisma/`: Código gerado pelo Prisma Client.
*   `prisma/`: Esquema do banco de dados e migrações.
*   `public/`: Ativos estáticos como imagens e SVGs.
*   `components/`: Componentes reutilizáveis da UI (Shadcn UI e customizados).
*   `context/`: Contextos React para gerenciamento de estado global (e.g., `DateContext`, `triboContext`).
*   `hooks/`: Hooks React personalizados para lógica de UI e chamadas de API.
*   `lib/`: Funções utilitárias, configuração do Prisma Client e definições de API.
*   `services/`: Lógica de negócio principal, como cálculo de ranking.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

*   Node.js (versão 18 ou superior)
*   Um gerenciador de pacotes: npm, yarn, pnpm ou bun
*   Um banco de dados PostgreSQL

## 🚀 Guia de Início Rápido

Siga estas instruções para configurar e executar o projeto em sua máquina local.

1.  **Clonar o Repositório:**
    ```bash
    git clone https://github.com/SamuelDomingos/rank-gc.git
    cd rank-gc
    ```

2.  **Instalar Dependências:**
    ```bash
    npm install
    # ou yarn install
    # ou pnpm install
    # ou bun install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```env
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOMEDOBANCO?schema=public"
    NEXTAUTH_SECRET="UM_SEGREDO_FORTE_AQUI"
    NEXTAUTH_URL="http://localhost:3000" # ou a URL de produção
    BLOB_READ_WRITE_TOKEN="SEU_TOKEN_VERCEL_BLOB" # Para upload de avatares
    ```
    *   `DATABASE_URL`: String de conexão com seu banco de dados PostgreSQL.
    *   `NEXTAUTH_SECRET`: Uma string aleatória longa para segurança do NextAuth.
    *   `NEXTAUTH_URL`: URL base da sua aplicação.
    *   `BLOB_READ_WRITE_TOKEN`: Token para integração com Vercel Blob (opcional, se não usar upload de avatar, pode ser omitido ou mockado).

4.  **Configurar o Banco de Dados (Prisma):**
    Execute as migrações do Prisma para criar o esquema do banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Executar o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    # ou yarn dev
    # ou pnpm dev
    # ou bun dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## ⚙️ Uso

*   **Acesso:** Ao acessar a aplicação, você será direcionado para a tela de seleção de tribos. Escolha uma tribo para fazer login como membro ou acesse `/admin` para o painel administrativo.
*   **Login de Membro:** Use suas credenciais para acessar a página de ranking da sua tribo, onde poderá registrar atividades e visualizar o desempenho.
*   **Login de Administrador:** Acesse `http://localhost:3000/admin` (ou `https://rank-gc.vercel.app/admin`) e faça login com uma conta de administrador para gerenciar usuários e GCs.
*   **Registros:** Dentro de uma página de tribo, clique no botão "Registro" de um GC para adicionar dados de presença, visitantes, membros servindo ou atualizar cestas básicas.
*   **Relatórios:** Acesse os relatórios para ter uma visão geral ou comparativa do desempenho dos GCs, com opções de exportação.

## 🤝 Como Contribuir

Sua contribuição é muito bem-vinda! Se você tiver sugestões, encontrar bugs ou quiser implementar novas funcionalidades, sinta-se à vontade para abrir uma [issue](https://github.com/SamuelDomingos/rank-gc/issues) ou enviar um [pull request](https://github.com/SamuelDomingos/rank-gc/pulls).

Para contribuir, siga os passos de "Guia de Início Rápido" e certifique-se de que seu código segue as diretrizes do projeto.

## 📜 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores/Contato

*   **Samuel Domingos:** [LinkedIn](https://www.linkedin.com/in/samuel-domingos-304b461a8/)
