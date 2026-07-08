# La Pizzeria da Claudio — Koh Tao 🍕

A complete redesign of [lapizzeriakohtao.com](https://lapizzeriakohtao.com/) — dark, elegant, wood-fired warmth. Pure HTML/CSS/JS, zero dependencies, zero build step.

## Highlights

- **Interactive Pizza Wheel** — a stylized SVG pizza where every slice is a real pizza from the menu. Hover/tap a slice to see it; spin through 4 rounds covering all 31 pizzas + "Crea la Tua" (build your own).
- Ember-particle hero, animated wood-fired oven, scroll reveals, stat counters, marquee, animated island map.
- Fully responsive, keyboard accessible, respects `prefers-reduced-motion`.

## Structure

```
├── index.html        # single page
├── css/styles.css    # all styling & animations
├── js/main.js        # pizza wheel, menu data, particles, interactions
├── assets/           # (images, if added later)
└── render.yaml       # Render static-site blueprint
```

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy to Render (via GitHub)

1. Push this folder to a GitHub repo:
   ```bash
   git init && git add -A && git commit -m "La Pizzeria da Claudio website"
   git remote add origin https://github.com/<you>/pizzeria-kohtao.git
   git push -u origin main
   ```
2. On [dashboard.render.com](https://dashboard.render.com): **New → Static Site**, connect the repo. Render reads `render.yaml` automatically (publish path `.`, no build command).
3. Done — Render auto-deploys on every push.
