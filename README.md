# Prostore

A Next.js storefront project (in progress), built to practise a modern full-stack TypeScript setup: App Router, authentication, a Postgres database through Prisma, and a component-based UI.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling / UI:** Tailwind CSS, Radix UI primitives, lucide-react icons, next-themes (light/dark)
- **Auth:** NextAuth with the Prisma adapter, bcrypt password hashing
- **Database:** PostgreSQL on Neon (serverless driver) with Prisma ORM
- **Validation:** Zod

## Getting started

1. Install dependencies: `npm install` (this also runs `prisma generate`).
2. Create a `.env` file with your own values for the database connection string (Neon/Postgres), the NextAuth secret and the NextAuth URL. Check the Prisma schema and the auth config in the source for the exact variable names.
3. Apply the database schema with Prisma (`npx prisma migrate dev`, or `npx prisma db push` for a quick local setup).
4. Run the dev server: `npm run dev` and open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |

## Status

Work in progress. This is a learning project, not a finished store.
