# SKINOLOGY — Fancy (Neon + readable type)

Marketing page for **SKINOLOGY** (Dr. Samiksha Pradhan, Sambalpur). **Layout and motion**: marquee, mega split panels, horizontal gallery, parallax, etc. **Look**: dark **Neon** theme (near-black + acid lime `#d4ff00`). **Typography**: **DM Sans** everywhere for readable body and content; heavier weights for headlines.

Photos are **Unsplash** (skincare, clinical, wellness stock).

## Features

- **Theme switcher** at the top of the header: **Neon** (default), **Forest** (light clinic), **Clinical** (navy + cyan), **Blush** (rose). Choice is saved in `localStorage`.
- Marquee under the header, hero image parallax, drag-to-scroll gallery, subtle cursor glow (desktop), tilt on about image, count-up stats.
- Respects `prefers-reduced-motion` where relevant.

## Run locally

```bash
cd skinology-fancy
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## GitHub Pages (free public URL)

Your repo already includes a **`.nojekyll`** file so GitHub serves plain HTML/CSS/JS without Jekyll.

1. **Create a new repository** on [GitHub](https://github.com/new) (e.g. `skinology-fancy`). Leave it **empty** (no README) if you will push this folder as-is.

2. **Push this project** (replace `YOUR_USER` and `YOUR_REPO`):

   ```bash
   cd /Users/khirod/Documents/skinology-fancy
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git branch -M main
   git add -A
   git commit -m "Add .nojekyll for GitHub Pages"   # skip if nothing to commit
   git push -u origin main
   ```

3. **Turn on Pages**: GitHub repo → **Settings** → **Pages** (left sidebar) → **Build and deployment** → Source: **Deploy from a branch** → Branch: **`main`**, folder **`/ (root)`** → Save.

4. After a minute or two, the site is live at:

   **`https://YOUR_USER.github.io/YOUR_REPO/`**

   (If the repo is named **`YOUR_USER.github.io`**, the URL is **`https://YOUR_USER.github.io/`** with files in the root of that repo.)

5. **Optional**: In `index.html`, `robots.txt`, and `sitemap.xml`, replace `https://www.yourdomain.com/` with your GitHub Pages URL for SEO.

## Before production

- Replace `yourdomain.com` in `robots.txt` / `sitemap.xml` / canonical meta.
- Swap Unsplash URLs for your own clinic photos if you prefer.

## Licence

Clinic copy is for SKINOLOGY. Photos are from [Unsplash](https://unsplash.com/) under their licence.
