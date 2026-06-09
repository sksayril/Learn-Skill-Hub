# Learn Skill Hub

A platform for Government Skill Development Projects, CSR Programs, Placement Programs, Training Centre Onboarding, Student Registration, and Employment Opportunities.

## Run & Operate

- `npm run dev` — run the main web app (Skill Mission India, port 3000)
- `npm run dev:api` — run the API server (port 5000)
- `npm run dev:mockup` — run the component preview sandbox (port 8081)
- `npm run typecheck` — full typecheck across all packages
- `npm run build` — typecheck + build all packages
- `npm run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `npm run db:push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- npm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Next.js 15 (skill-mission-india), Vite (mockup-sandbox)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API)

## Where things live

- `artifacts/skill-mission-india/` — main Next.js web app
- `artifacts/api-server/` — Express API server
- `artifacts/mockup-sandbox/` — component preview canvas
- `lib/db/` — Drizzle schema and DB client
- `lib/api-spec/` — OpenAPI spec and Orval codegen
- `lib/api-client-react/` — generated React Query hooks
- `lib/api-zod/` — generated Zod schemas

## Pointers

- See `README.md` for local npm setup instructions
