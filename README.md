# FRÖGY — toadboyz.com

Official brand site for **Frögy · Toadboyz · Los Angeles · Est 2026**. Static, multi-page, age-gated (21+). Small-batch California cannabis — editorial/lookbook site, no e-commerce checkout.

## Pages
- `index.html` — Home (age gate, hero, Frog Poison feature, strain teaser, story teaser)
- `strains.html` — The five Toad strains (Venom, Breath, Milk, Stool, Skin)
- `story.html` — Brand story + pillars
- `stockists.html` — Where to find Frögy
- `contact.html` — Wholesale / press / drop list

## Stack
Plain HTML + CSS + vanilla JS. No build step, no dependencies. Fonts via Google Fonts CDN (Anton + Oswald). Brand palette locked: Ink Black `#0A0A0A`, Bone Cream `#F5EFE3`, Slime Green `#9FFF1A`.

```
toadboyz_site/
├── index.html  strains.html  story.html  stockists.html  contact.html
├── css/style.css
├── js/main.js
├── assets/img/            # wordmarks, F-icon, strain + hero imagery
├── .gitlab-ci.yml         # GitLab Pages deploy
└── README.md
```

## Deploy — GitLab Pages

1. Create a GitLab project (e.g. `toadboyz` under your namespace).
2. Push this folder to the default branch:
   ```bash
   git init
   git remote add origin git@gitlab.com:<your-namespace>/toadboyz.git
   git add -A && git commit -m "Frögy site"
   git push -u origin main
   ```
3. GitLab CI runs the `pages` job automatically → site goes live at
   `https://<your-namespace>.gitlab.io/toadboyz/`
   (Check **Deploy → Pages** in the project for the exact URL.)

## Custom domain — toadboyz.com

In the GitLab project: **Settings → Pages → New Domain**, add `toadboyz.com` (and `www.toadboyz.com`).

At your DNS/registrar, add the records GitLab shows you:
- **A record** — `toadboyz.com` → GitLab Pages IP `35.185.44.232`
- **CNAME** — `www` → `<your-namespace>.gitlab.io`
- **TXT** — the verification record GitLab generates (proves you own the domain)

Then tick **Automatic certificate management (Let's Encrypt)** for free HTTPS. Propagation + cert issuance can take up to a few hours.

## Compliance / legal notes
- Age gate is client-side (localStorage). For stricter markets, pair with a server- or CDN-level gate.
- Site is informational only — no cannabis sales/checkout. All THC figures are batch-typical; COA governs.
- Adults 21+ only.

---
Dan Carmel · Frögy · dan@oryoncanna.com · Los Angeles, CA · Est. 2026
