# SKINOLOGY — Fancy (dynamic themes)

A high-energy marketing page for **SKINOLOGY** (Dr. Samiksha Pradhan, Sambalpur). Visual language takes cues from bold editorial athlete sites such as [Lando Norris](https://landonorris.com/) — dark canvases, neon accent, oversized type, marquee, split panels, horizontal gallery — adapted for dermatology with **Unsplash** photography (skincare, clinical, wellness).

## Features

- **Four themes** (persisted in `localStorage`): **Neon** (dark + acid lime), **Forest** (light sage), **Clinical** (navy + cyan), **Blush** (dusk + rose).
- **Marquee** ticker under the header.
- **Hero parallax** on the main image (respects reduced motion).
- **Drag-to-scroll** gallery strip on desktop.
- **Subtle cursor glow** on large pointers only; disabled for reduced motion / touch.
- **3D tilt** on the about image (desktop, motion OK).
- **Count-up** animation for hero stats when they enter the viewport.

## Run locally

```bash
cd skinology-fancy
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Before production

- Replace `yourdomain.com` in `robots.txt` / `sitemap.xml` / canonical meta.
- Swap Unsplash URLs for your own clinic photos if you prefer.
- Add a privacy note if you rely on `localStorage` for theme (optional cookie banner in India context).

## Repo

```bash
git init
git add .
git commit -m "Initial: SKINOLOGY fancy site"
```

## Licence

Clinic copy is for SKINOLOGY. Photos are from [Unsplash](https://unsplash.com/) under their licence.
