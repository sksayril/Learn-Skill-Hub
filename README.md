# Learn Skill Hub

npm workspaces monorepo for the Skill Mission India platform.

## Prerequisites

- Node.js 24+
- npm 10+
- PostgreSQL (for API server / database features)

## Setup

```bash
# Install all workspace dependencies
npm install

# Push database schema (requires DATABASE_URL)
npm run db:push
```

## Development

```bash
# Main web app (Next.js, port 3000)
npm run dev

# API server (Express, port 5000)
npm run dev:api

# Component preview sandbox (Vite, port 8081)
npm run dev:mockup
```

## Build & Verify

```bash
# Typecheck all packages
npm run typecheck

# Typecheck + build all packages
npm run build

# Regenerate API client from OpenAPI spec
npm run codegen
```

## Workspace packages

| Package | Path | Description |
|---------|------|-------------|
| `@workspace/skill-mission-india` | `artifacts/skill-mission-india` | Main Next.js web app |
| `@workspace/api-server` | `artifacts/api-server` | Express API server |
| `@workspace/mockup-sandbox` | `artifacts/mockup-sandbox` | Component preview canvas |
| `@workspace/db` | `lib/db` | Drizzle ORM schema and client |
| `@workspace/api-spec` | `lib/api-spec` | OpenAPI spec and codegen |
| `@workspace/api-client-react` | `lib/api-client-react` | Generated React Query hooks |
| `@workspace/api-zod` | `lib/api-zod` | Generated Zod schemas |
| `@workspace/scripts` | `scripts` | Utility scripts |

## Environment variables

| Variable | Required by | Description |
|----------|-------------|-------------|
| `DATABASE_URL` | API server, db | PostgreSQL connection string |
