# PaceForge — Marathon PWA

VDOT-first running app: guided home journey, training paces, race-day splits, pace band export. **English & Hindi.** Offline-capable PWA.

## Routes

| URL | Purpose |
|-----|---------|
| `/` | Guided plan (4 steps) |
| `/vdot` | VDOT calculator |
| `/training` | Paces, heart-rate zones, workouts |
| `/race-day` | Splits, pace band, fueling |
| `/organizer` | Race director tools (direct URL only) |

Legacy redirects: `/vault` → `/race-day`, `/train` → `/vdot`, `/director/login` → `/organizer`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production deploy

See **[DEPLOY.md](./DEPLOY.md)** for Vercel + custom domain steps.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` when testing canonical URLs locally (optional).
