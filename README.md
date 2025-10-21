# 🧠 MindEase — Web App Scaffold

A modern, good-looking **Next.js (App Router)** starter that implements the BRD essentials:
- **AI-first micro-therapy** (stub pack flow)
- **Community** (topic channel with client-side posting)
- **Mood tracking** (slider + notes)
- **Group sessions** (schema ready)
- **English-only**
- Easy to code & debug: **TypeScript**, **SQLite via Prisma**, **Tailwind**, small UI primitives inspired by shadcn/ui

## Tech Stack
- **Next.js 14** (TypeScript, App Router)
- **Tailwind CSS**
- **Prisma** with **SQLite** (switch to Postgres by changing `DATABASE_URL` and `provider`)
- **NextAuth (Auth.js)** ready (configure when needed)
- **React Query** for data hooks
- Minimal **UI primitives** (Button, Card) for a clean base look

## Getting Started

```bash
# 1) Install deps
npm install

# 2) Init DB
npx prisma generate
npx prisma db push

# 3) Run dev
npm run dev
```

Open http://localhost:3000

## Env
Copy `.env.example` to `.env` and set values. By default, SQLite is used (no setup needed).

## Where things live
- `src/app/page.tsx` — marketing/home
- `src/app/dashboard/page.tsx` — main app shell
- `src/app/therapy/[slug]/page.tsx` — micro-therapy pack screen
- `src/app/mood/page.tsx` — mood log
- `src/app/community/[slug]/page.tsx` — community

## Next Steps (Optional)
- Wire APIs (route handlers under `src/app/api/*`) for mood logs, posts, and AI summaries.
- Add auth: create `src/app/api/auth/[...nextauth]/route.ts`, configure providers.
- Add server actions for DB mutations.
- Replace stub therapy content with a CMS or JSON packs.
- Add video for group sessions (e.g., LiveKit or Twilio).

## Design Notes
- Rounded **2xl** cards, soft shadows, muted background for calm aesthetic.
- Accessible defaults and responsive layout.
