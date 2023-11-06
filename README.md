# Next Commerce

Feito com [Next.js](https://nextjs.org/) 💜

## Começando:

Crie as variaveis de ambiente, em um arquivo .env na raiz do projeto: 

- No site do [Clerk](https://clerk.com/), faça login e pegue suas variaveis de ambiente.

```text
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
```

- No site da [Vercel](https://vercel.com/dashboard), vá em storage e crie um banco de dados.

```text
  
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

- No site da [Stripe](https://stripe.com), faça login e pegue suas variaveis de ambiente.
  
```text
  STRIPE_SECRET_KEY=
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Apos a configuração

Rode o projeto localmente:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

E abra o [http://localhost:3000](http://localhost:3000) no seu navegador.
