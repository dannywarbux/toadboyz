# toadboyz.com — GoDaddy DNS → GitHub Pages Setup

Step-by-step to point the GoDaddy domain **toadboyz.com** at the GitHub Pages site
(`dannywarbux.github.io/toadboyz`). Follow in order. Total hands-on time ~10 min;
DNS propagation + HTTPS cert can take up to 24 h (usually under 1 h).

---

## Step 1 — GitHub side: confirm the CNAME file

The repo root already contains a `CNAME` file with exactly:

```
toadboyz.com
```

Do **not** add `https://`, `www`, or a trailing slash — just the bare apex domain.
This file tells GitHub Pages which custom domain to serve. It's committed, so nothing to do here unless it's missing.

## Step 2 — GitHub side: set Pages source

1. Go to **repo → Settings → Pages**.
2. Under **Build and deployment**, set **Source = GitHub Actions** (the `pages.yml` workflow handles the build).
3. Leave the **Custom domain** box empty for now — you'll fill it in Step 4, after DNS is set.

## Step 3 — GoDaddy side: DNS records

1. Sign in to GoDaddy → **My Products → Domains** → click **toadboyz.com**.
2. Click **DNS** (or **Manage DNS**).
3. **Delete any existing parked/forwarding records** on `@` and `www` that GoDaddy added by default
   (e.g. a `CNAME @ → parkingpage` or a Domain Forwarding rule). These will conflict with GitHub Pages.
4. Add the **four apex A records** — Type `A`, Name `@`, TTL `1 Hour`:

   | Type | Name | Value             | TTL    |
   |------|------|-------------------|--------|
   | A    | @    | `185.199.108.153` | 1 Hour |
   | A    | @    | `185.199.109.153` | 1 Hour |
   | A    | @    | `185.199.110.153` | 1 Hour |
   | A    | @    | `185.199.111.153` | 1 Hour |

5. Add the **www CNAME** — Type `CNAME`, Name `www`, TTL `1 Hour`:

   | Type  | Name | Value                    | TTL    |
   |-------|------|--------------------------|--------|
   | CNAME | www  | `dannywarbux.github.io`  | 1 Hour |

   > Note: the CNAME value is the **user domain** `dannywarbux.github.io` (with the trailing dot GoDaddy may add automatically) — **not** `dannywarbux.github.io/toadboyz`. Never put a path in a CNAME.

6. **Save** all records.

## Step 4 — GitHub side: bind the custom domain

1. Back in **repo → Settings → Pages → Custom domain**, type `toadboyz.com` and click **Save**.
   (This re-writes the `CNAME` file to match — expected.)
2. GitHub runs a **DNS check**. It may show "unverified" until the A records propagate — that's normal.

## Step 5 — Enforce HTTPS

1. Wait until the DNS check in **Settings → Pages** turns green ("DNS check successful") and the
   Let's Encrypt certificate is issued (GitHub does this automatically — can take up to 24 h).
2. Tick **Enforce HTTPS**. This forces all `http://` traffic to `https://`.
   - If the checkbox is greyed out, the cert isn't ready yet — wait and refresh.

---

## Verification

After propagation, confirm from a terminal:

```bash
# Apex should return the four GitHub Pages IPs
dig +short toadboyz.com
# → 185.199.108.153 / .109 / .110 / .111

# www should CNAME to the github.io host
dig +short www.toadboyz.com
# → dannywarbux.github.io. → then the same four IPs

# Both should load with a valid cert (200 OK, no cert warning)
curl -sI https://toadboyz.com | head -1
curl -sI https://www.toadboyz.com | head -1
```

Then open **https://toadboyz.com** in a browser — the age gate should appear, and the
padlock should show a valid certificate.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `404` at toadboyz.com but github.io works | Custom domain not saved in Settings → Pages, or `CNAME` file missing/wrong. |
| "Domain does not resolve to the GitHub Pages server" | A records wrong or not propagated. Re-check the four IPs; wait for TTL. |
| Enforce HTTPS greyed out | Cert not issued yet. Wait up to 24 h after DNS check passes. |
| Cert warning / mixed content | Make sure all asset URLs are relative (they are) — no hard-coded `http://`. |
| `www` doesn't redirect to apex | Confirm the `www` CNAME → `dannywarbux.github.io`; GitHub auto-redirects www↔apex once both resolve. |
| Old GoDaddy parking page still shows | A leftover forwarding/parked record — delete it in the DNS manager. |

---

*Frögy · Toadboyz · Los Angeles · Est 2026 · dan@oryoncanna.com*
