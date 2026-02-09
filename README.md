# LinkVoxel 🚀

Uma plataforma completa de diretório para grupos de **WhatsApp** e **Telegram**. O LinkVoxel permite que usuários cadastrem seus grupos, ganhem visibilidade através de prova social e SEO otimizado.

---

## 🔥 Funcionalidades

- **Cadastro de Grupos:** Usuários podem enviar links de grupos que entram como "Pendente".
- **Sistema de Aprovação:** Painel Admin (`/admin`) para aprovar, rejeitar e destacar grupos.
- **Prova Social:** Contador real de cliques e notificação flutuante de "grupos em alta".
- **Visualização Otimizada:**
  - Filtros por Categoria (chips com scroll).
  - Busca em tempo real.
  - Regra de "Fresh Content" (apenas grupos recentes na home).
  - Cards com design premium e responsivo.
- **SEO Automático:** Title, Description e Open Graph gerados dinamicamente.
- **Prevenção de Spam:** Verificação de links duplicados antes do envio.

## 🛠️ Tecnologias

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Deploy:** Vercel (Recomendado)

## 🚀 Como Rodar Localmente

1.  Clone o repositório:
    ```bash
    git clone https://github.com/rusthp/linkvoxel.git
    cd linkvoxel
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente (`.env.local`):
    ```env
    NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
    ADMIN_PASSWORD=sua_senha_admin
    ```

4.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5.  Acesse `http://localhost:3000`.

## 📦 Scripts Úteis

O projeto inclui scripts auxiliares na pasta `scripts/`:

- **Importação em Massa:** Importe centenas de links de um arquivo de texto.
  ```bash
  node scripts/import_bulk.mjs
  ```
- **Gerenciamento via Terminal:** Aprove ou delete grupos sem abrir o painel.
  ```bash
  node scripts/manage_groups.mjs listar
  ```

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar.
