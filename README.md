# Indexia Insurance

A single-page insurance landing site — compare plans and apply through a 4-step quote form. Submissions are delivered by [FormSubmit](https://formsubmit.co) to `contactus@indexiainsurance.com` — no backend or API key needed.

Built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **framer-motion**.

## Getting started

```bash
npm install
npm run dev        # dev server at http://localhost:3000
```


## Scripts

| Command                 | What it does                                                        |
| ----------------------- | ------------------------------------------------------------------- |
| `npm run dev`           | Start the dev server                                                |
| `npm run build`         | Production build (Node server / Vercel)                             |
| `npm run build:static`  | Static export into `out/` — for Hostinger shared hosting            |
| `npm run lint`          | Run oxlint                                                          |

## Deploying to Hostinger (FileZilla)

Shared hosting serves static files only, so the site is exported to plain HTML:

1. `npm run build:static`
2. In FileZilla, connect with the FTP credentials from hPanel (*Files → FTP Accounts*)
3. Open the remote `public_html` folder
4. Upload the **contents** of the local `out/` folder (not the folder itself): `index.html`, `_next/`, `404.html`, `logo.png`, `favicon.svg`, `.htaccess`, and the `.txt` files
5. Enable *Server → Force showing hidden files* in FileZilla and verify `.htaccess` uploaded
6. **First submission only:** FormSubmit emails an activation link to `contactus@indexiainsurance.com` — click it once to start receiving submissions
7. Visit the domain and submit the quote form once to confirm the email arrives

Re-deploys: rebuild, delete the old `_next/` folder in `public_html`, and re-upload.

## Project structure

```
src/
  app/
    layout.tsx        # fonts + metadata
    page.tsx          # the landing page
    globals.css       # Tailwind theme (brand, ocean, sun, ash palettes)
  components/
    Navbar.tsx        # anchor nav + mobile menu
    Hero.tsx          # "What do you want to protect?" cards
    WhyIndexia.tsx    # value props
    Products.tsx      # all 10 insurance types
    QuoteForm.tsx     # 4-step form → Web3Forms
    Footer.tsx
    ui.tsx            # shared tokens, Logo, SectionHeading
  lib/
    data.ts           # insurance catalogue & form options
    utils.ts          # cn() helper
```
