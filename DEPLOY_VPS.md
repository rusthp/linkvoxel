# 🚀 Guia de Deploy na VPS (Nginx + PM2)

Este guia pressupõe que você já tenha Node.js, NPM, PM2 e Nginx instalados na sua VPS.

---

## 1. Preparar a VPS

Acesse sua VPS via SSH e clone o repositório:

```bash
cd /var/www
git clone https://github.com/rusthp/linkvoxel.git
cd linkvoxel
```

## 2. Instalar e Buildar

Instale as dependências e gere a versão de produção:

```bash
npm install
npm run build
```

## 3. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local` na VPS com suas chaves de produção:

```bash
nano .env.local
```

Cole (ajuste os valores):
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
ADMIN_PASSWORD=...
```

## 4. Iniciar com PM2

Use o arquivo `ecosystem.config.js` que criamos para rodar o app:

```bash
pm2 start ecosystem.config.js
pm2 save
```

Isso vai rodar o site na porta **3000**.

## 5. Configurar Nginx

Copie o arquivo de configuração e ative:

```bash
sudo cp nginx-linkvoxel.conf /etc/nginx/sites-available/linkvoxel
sudo ln -s /etc/nginx/sites-available/linkvoxel /etc/nginx/sites-enabled/
```

Verifique se a configuração está ok e reinicie o Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 6. Configurar SSL (HTTPS) com Certbot (Recomendado)

Se você já tem o Certbot instalado, rode:

```bash
sudo certbot --nginx -d linkvoxel.com.br -d www.linkvoxel.com.br
```

Siga as instruções para ativar o redirecionamento HTTPS.

---

## ✅ Atualizando no Futuro

Quando você fizer mudanças e der push no GitHub, na VPS basta rodar:

```bash
git pull
npm install
npm run build
pm2 restart linkvoxel
```
