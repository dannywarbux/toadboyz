# FRÖGY — toadboyz.com

Official brand site for **Frögy · Toadboyz · Los Angeles · Est 2026**. Static, multi-page, age-gated (21+). Small-batch California cannabis — editorial/lookbook site, no e-commerce checkout.

## Pages
- `index.html` — Home (age gate, hero, Frog Poison feature, strain teaser, story teaser)
- `strains.html` — The three strains: **Frog Poison** (slime green `#9FFF1A`), **Toad Dreams** (cyan blue `#00E5FF`), **Toad Up** (lemon yellow `#F2E71D`)
- `story.html` — Brand story + pillars
- `stockists.html` — Where to find Frögy
- `contact.html` — Wholesale / press / drop list (static `mailto:` — no backend)

## Stack
Plain HTML + CSS + vanilla JS. No build step, no dependencies. Fonts via Google Fonts CDN (Anton + Oswald). Brand palette locked: Ink Black `#0A0A0A`, Bone Cream `#F5EFE3`, Slime Green `#9FFF1A`.

```
toadboyz/
├── index.html  strains.html  story.html  stockists.html  contact.html
├── css/style.css
├── js/main.js
├── assets/img/                    # wordmarks, F-icon, strain + hero imagery
├── CNAME                          # toadboyz.com (GitHub Pages custom domain)
├── .nojekyll                      # disable Jekyll processing
├── .github/workflows/pages.yml    # GitHub Pages deploy (active)
├── .gitlab-ci.yml                 # legacy GitLab Pages deploy (unused)
└── README.md
```

## Deploy — GitHub Pages (active)

The site auto-deploys via `.github/workflows/pages.yml` on every push to `main`.

1. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
2. Push to `main`:
   ```bash
   git add -A && git commit -m "Frögy site"
   git push origin main
   ```
3. The workflow publishes the site → live at `https://dannywarbux.github.io/toadboyz/`
   (and at `https://toadboyz.com` once DNS is bound — see below).

## Custom domain — toadboyz.com (GoDaddy → GitHub Pages)

`CNAME` in the repo root already contains `toadboyz.com`.

In **GoDaddy → Domain → DNS**, set:
- **Four A records** — Host `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- **CNAME** — Host `www` → `dannywarbux.github.io` · TTL 1 Hour

Then in the repo: **Settings → Pages → Custom domain** = `toadboyz.com` (Save), wait for the DNS check to pass, and tick **Enforce HTTPS**. Full steps in `DNS_SETUP.md`.

## Compliance / legal notes
- Age gate is client-side (localStorage). For stricter markets, pair with a server- or CDN-level gate.
- Site is informational only — no cannabis sales/checkout. All THC figures are batch-typical; COA governs.
- Adults 21+ only.

---
Dan Carmel · Frögy · dan@oryoncanna.com · Los Angeles, CA · Est. 2026
