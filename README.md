# SKINOLOGY — Fancy (editorial layout + original clinic look)

Marketing page for **SKINOLOGY** (Dr. Samiksha Pradhan, Sambalpur). **Layout and motion** are from the “fancy” build (marquee, mega split panels, horizontal gallery, parallax, etc.). **Typography and colours** match the first static site: **Fraunces** + **DM Sans**, warm **#f6f4f0** background, forest / sage / cream / gold palette.

Photos are **Unsplash** (skincare, clinical, wellness stock).

## Features

- Marquee under the header, hero image parallax, drag-to-scroll gallery, subtle cursor glow (desktop), tilt on about image, count-up stats.
- Respects `prefers-reduced-motion` where relevant.

## Run locally

```bash
cd skinology-fancy
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

## Before production

- Replace `yourdomain.com` in `robots.txt` / `sitemap.xml` / canonical meta.
- Swap Unsplash URLs for your own clinic photos if you prefer.

## Repo

```bash
git init
git add .
git commit -m "Initial: SKINOLOGY fancy site"
```

## Licence

Clinic copy is for SKINOLOGY. Photos are from [Unsplash](https://unsplash.com/) under their licence.
