# SGIH — Monitoramento do Service Desk

Preview em Python do painel SGIH para acompanhar PABX, tarefas Kanban e WhatsApp.
O preview executa o módulo original em `streamlit_export/dashboard.py`. Sem credenciais,
mostra avisos de configuração e não tenta autenticar nos serviços externos.

## Run & Operate

- `uv run streamlit run app.py --server.port 5000 --server.address 0.0.0.0 --server.headless true --server.enableCORS=false --server.enableWebsocketCompression=false --server.baseUrlPath=streamlit` — executar o preview Python
- `pnpm --filter @workspace/api-server run dev` — executar a API compartilhada em `/api`
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- Python 3.11, Streamlit
- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

O preview apresenta o status dos agentes PABX, tarefas pendentes do Kanban e
disponibilidade dos usuários WhatsApp, usando o código Python original enviado.
O pacote independente para importar no Streamlit fica em `streamlit_export/`.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
