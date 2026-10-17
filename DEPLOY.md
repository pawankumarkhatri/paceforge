# PaceForge — deploy checklist (Vercel + custom domain)

## What was prepared in the repo

- Production `npm run build` passes
- PWA: `manifest.webmanifest`, `sw.js` (cache `paceforge-v5`), icons `public/icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
- SEO: `sitemap.xml`, `robots.txt` (via `src/app/sitemap.ts` & `robots.ts`), `/organizer` not indexed
- Set **`NEXT_PUBLIC_SITE_URL`** on Vercel after you know your final domain

No API keys or secrets are required for this app.

---

## Step 1 — Put the project on GitHub

1. Install [Git](https://git-scm.com/) if needed.
2. In the project folder:

   ```bash
   git init
   git add .
   git commit -m "Prepare PaceForge for production deploy"
   ```

3. Create an empty repo on GitHub (e.g. `paceforge` or `paceforge-app`).
4. Push:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub is easiest).
2. **Add New → Project** → import your GitHub repo.
3. Framework: **Next.js** (auto-detected). Build: `npm run build`. Output: default.
4. **Environment variables** (Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://YOUR-DOMAIN.com` (use your Vercel `*.vercel.app` URL first, then update when the custom domain works)
5. Deploy. Open the generated URL and test: home journey, Hindi toggle, Race day pace band, Add to Home Screen on mobile.

---

## Step 3 — Buy and connect a domain

1. Buy a domain (e.g. Cloudflare Registrar, Porkbun, Namecheap, or `.in` registrar).
2. In Vercel: **Project → Settings → Domains** → add `paceforge.in` (or your name).
3. At your registrar, add the DNS records Vercel shows (usually `A` + `CNAME` or nameservers).
4. Wait for SSL (often 5–30 minutes).
5. Update Vercel env **`NEXT_PUBLIC_SITE_URL`** to `https://yourdomain.com` and **Redeploy**.

---

## Step 4 — Post-launch checks

- [ ] All routes: `/`, `/vdot`, `/training`, `/race-day`
- [ ] Redirects: `/vault` → `/race-day`, `/train` → `/vdot`
- [ ] Hindi UI and mobile bottom nav
- [ ] PWA install on Android Chrome / iOS Safari
- [ ] `https://yourdomain.com/sitemap.xml` loads

---

## Optional

- **Analytics:** Vercel Analytics or Cloudflare Web Analytics (no code change required on Cloudflare if proxying DNS).
- **Organizer tools:** `/organizer` is public but not linked in the UI; share only with your team.
