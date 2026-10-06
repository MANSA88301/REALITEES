# Realiteez Custom Creations

The storefront for Realiteez Custom Creations: personalized apparel, DIY prints, original printed tees, and the Pink Season (F.L.Y.) collection.

It's a fast static site with no build step and no server to maintain. It's ready to deploy on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Edit the business content

Everything a business owner changes lives in **`config/site.js`**:

| What | Field |
|---|---|
| Hero photo | `brand.heroImage` (e.g. `/assets/hero.jpg`) |
| The three ways to create | `lanes` |
| Pink Season designs | `pinkSeason.designs` |
| "This is the work." portfolio | `portfolio` (add `image: "/assets/work/..."` for photos) |
| Design Vault promises | `vault` |
| Process steps, FAQ | `steps`, `faq` |
| Where order requests go | `formEndpoint`: paste a Formspree/Basin/Getform URL |
| Email, phone, city, socials | `contact` (empty fields stay hidden) |

Every "Personalize" or "Start" button opens the order form with that item preselected. If `formEndpoint` is empty, the form builds a request the visitor can copy and send to you.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (Vercel)

1. Import this repo at vercel.com/new. Framework preset: **Other**. No build command.
2. Add your domain under Project → Settings → Domains.
3. `vercel.json` sets security headers and a Content-Security-Policy. If you switch form providers, add the provider's host to `connect-src`.

## Going live checklist

- [ ] Hero photo and portfolio photos added
- [ ] Prices and checkout (Stripe) decided
- [ ] `formEndpoint` set and a test request received
- [ ] Contact email, phone, and social links filled in
- [ ] `brand.url` set to the final domain

## Shareable preview

`python3 scripts/build_preview.py` writes a single self-contained `preview/index.html`.
