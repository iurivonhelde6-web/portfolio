# Portfólio — Iuri Von Helde

Portfólio pessoal construído com React, TypeScript e Vite.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview   # para testar o build localmente
```

## Publicar no GitHub

```bash
git init
git add .
git commit -m "Portfólio inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portfolio.git
git push -u origin main
```

## Deploy na Vercel

1. Acesse vercel.com e faça login com sua conta GitHub.
2. Clique em "Add New" -> "Project".
3. Selecione o repositório `portfolio` que você acabou de subir.
4. A Vercel detecta Vite automaticamente (build command: `npm run build`, output: `dist`). Não precisa mudar nada.
5. Clique em "Deploy".

A cada `git push` na branch `main`, a Vercel gera um novo deploy automaticamente.

## O que editar antes de publicar

- `src/App.tsx` -> troque o e-mail placeholder (`seu-email@exemplo.com`) na seção de contato pelo seu real.
- `src/App.tsx` -> confirme o nome exato do curso na UVA, na seção de Formação.
- `public/favicon.svg` -> troque pelo seu próprio ícone, se quiser.
