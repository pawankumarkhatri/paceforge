# Vercel analytics — finish setup in the dashboard

The app code already includes **Web Analytics** and **Speed Insights**. After deploy, turn them on in Vercel (free tier includes basic usage).

## 1. Deploy latest code

Push to GitHub; wait until the Vercel deployment is **Ready**.

## 2. Enable Web Analytics

1. [vercel.com](https://vercel.com) → project **paceforge**
2. **Analytics** tab (or **Settings → Analytics**)
3. Click **Enable** for **Web Analytics**
4. Visit https://www.paceforge.in a few times — data may take a few minutes

You’ll see page views, referrers, countries, and devices (privacy-friendly, no cookies banner required for Vercel Analytics in most regions).

## 3. Enable Speed Insights

1. Same project → **Speed Insights** tab
2. **Enable Speed Insights**
3. After real visits, view **LCP**, **FID**, **CLS** (Core Web Vitals)

## 4. Optional: Observability / Logs

- **Deployments** → latest → **Logs** — build and runtime errors
- **Monitoring** (if on your plan) — alerts for failures

## 5. Google Search Console (SEO, not Vercel)

Keep using [Search Console](https://search.google.com/search-console) for search rankings; Vercel Analytics is for **traffic and performance** on the live site.

---

**Packages in this repo:** `@vercel/analytics`, `@vercel/speed-insights` in `src/components/vercel-insights.tsx`.
