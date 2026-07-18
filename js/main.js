/* ═══════════════ La Pizzeria da Claudio — main.js ═══════════════ */
"use strict";

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─────────────── DATA ─────────────── */
// topping keys map to painters in TOPPINGS below
const PIZZAS = [
  { name: "Margherita", desc: "The queen. San Marzano tomato, mozzarella, fresh basil, extra-virgin olive oil.", tags: "Classic · Vegetarian", base: "red", tops: ["basil", "mozz"] },
  { name: "Napoli", desc: "Tomato, mozzarella, anchovies, capers and oregano — the taste of the old port.", tags: "Classic", base: "red", tops: ["anchovy", "caper", "mozz"] },
  { name: "Marinara", desc: "Tomato, garlic, oregano, olive oil. No cheese, no compromise — pure Napoli.", tags: "Classic · Vegan", base: "red", tops: ["garlic", "oregano"] },
  { name: "Diavola", desc: "Tomato, mozzarella, spicy salame and fresh chilli. The devil made us do it.", tags: "Spicy", base: "red", tops: ["salame", "chilli", "mozz"] },
  { name: "4 Cheeses", desc: "Mozzarella, gorgonzola, parmesan and fontina melting into one golden pool.", tags: "White base · Vegetarian", base: "white", tops: ["gorgonzola", "cheese"] },
  { name: "4 Seasons", desc: "Artichokes, ham, mushrooms and olives — one quarter for every season.", tags: "Classic", base: "red", tops: ["artichoke", "ham", "mushroom", "olive"] },
  { name: "Crudo e Burrata", desc: "Prosciutto crudo, creamy burrata and rocket on a light tomato base.", tags: "Signature", base: "red", tops: ["crudo", "burrata", "rocket"] },
  { name: "Meat Feast", desc: "Ham, salame, bacon and Italian sausage. For serious appetites only.", tags: "Meat", base: "red", tops: ["ham", "salame", "bacon", "sausage"] },

  { name: "Seafood", desc: "Prawns, squid and mussels from the gulf, with garlic and parsley.", tags: "From the sea", base: "red", tops: ["shrimp", "mussel", "parsley"] },
  { name: "Siciliana", desc: "Tomato, mozzarella, anchovies, olives, capers and eggplant — Sicily on a crust.", tags: "Island classic", base: "red", tops: ["anchovy", "olive", "eggplant", "mozz"] },
  { name: "Vegetariana Special", desc: "Grilled zucchini, eggplant, peppers and mushrooms over tomato and mozzarella.", tags: "Vegetarian", base: "red", tops: ["zucchini", "pepper", "mushroom", "eggplant"] },
  { name: "Zola e Salame", desc: "Gorgonzola and salame — sharp, creamy, savoury. An unbeatable duo.", tags: "Bold", base: "white", tops: ["gorgonzola", "salame"] },
  { name: "Vesuvio", desc: "Tomato, mozzarella, ham and spicy salame — an eruption of flavour.", tags: "Spicy", base: "red", tops: ["ham", "salame", "chilli"] },
  { name: "Greek", desc: "Feta, kalamata olives, red onion, oregano and tomato. Yamas!", tags: "Mediterranean", base: "red", tops: ["feta", "olive", "onion"] },
  { name: "Hawaiiana", desc: "Ham and pineapple. Controversial in Italy, beloved on the island.", tags: "Island favourite", base: "red", tops: ["ham", "pineapple", "mozz"] },
  { name: "Saporita", desc: "Italian sausage and mushrooms over tomato and mozzarella.", tags: "Hearty", base: "red", tops: ["sausage", "mushroom", "mozz"] },

  { name: "Saporita Special", desc: "Sausage, mushrooms and a drizzle of truffle cream. Saporita, upgraded.", tags: "Signature", base: "white", tops: ["sausage", "mushroom", "truffle"] },
  { name: "Salame", desc: "Tomato, mozzarella and plenty of Italian salame. Simple and right.", tags: "Classic", base: "red", tops: ["salame", "mozz"] },
  { name: "Crudo", desc: "Prosciutto crudo laid over tomato and mozzarella after the oven.", tags: "Classic", base: "red", tops: ["crudo", "mozz"] },
  { name: "Pugliese", desc: "Tomato, mozzarella, onions and olives — the south in every bite.", tags: "Regional", base: "red", tops: ["onion", "olive", "mozz"] },
  { name: "Mushrooms", desc: "Tomato, mozzarella and fresh mushrooms. Earthy and comforting.", tags: "Vegetarian", base: "red", tops: ["mushroom", "mozz"] },
  { name: "Ham & Mushrooms", desc: "The eternal couple: cotto ham and mushrooms over tomato and mozzarella.", tags: "Classic", base: "red", tops: ["ham", "mushroom", "mozz"] },
  { name: "Meat Lovers", desc: "Pepperoni, bacon and chicken piled over tomato and mozzarella.", tags: "Meat", base: "red", tops: ["salame", "bacon", "chicken"] },
  { name: "Chicken", desc: "Grilled chicken and sweet peppers over tomato and mozzarella.", tags: "Hearty", base: "red", tops: ["chicken", "pepper", "mozz"] },

  { name: "Cipolla", desc: "Slow-caramelised onions over tomato and mozzarella. Sweet meets savoury.", tags: "Vegetarian", base: "red", tops: ["onion", "mozz"] },
  { name: "Arrabbiata", desc: "Angry tomato sauce with garlic and chilli, cooled by mozzarella.", tags: "Spicy · Vegetarian", base: "red", tops: ["chilli", "garlic", "mozz"] },
  { name: "Margherita Fior di Latte", desc: "The queen dressed in fior di latte — softer, milkier, dreamier.", tags: "Classic · Vegetarian", base: "red", tops: ["basil", "burrata"] },
  { name: "Buona", desc: "House special: sausage, rocket and parmesan shavings over tomato base.", tags: "Signature", base: "red", tops: ["sausage", "rocket", "cheese"] },
  { name: "Mushrooms Vegan", desc: "Fresh mushrooms with our house vegan mozzarella over tomato.", tags: "Vegan", base: "red", tops: ["mushroom", "basil"] },
  { name: "Vegan Greek", desc: "Vegan feta, olives, onion, peppers and oregano. Plant-powered Mediterranean.", tags: "Vegan", base: "red", tops: ["feta", "olive", "onion", "pepper"] },
  { name: "Chef", desc: "Claudio's mood of the day. Ask what the oven is dreaming about tonight.", tags: "Ask your waiter", base: "white", tops: ["truffle", "rocket", "crudo"] },
  { name: "Crea la Tua", desc: "Create your own masterpiece — start from a Margherita and build with 40+ toppings.", tags: "Build your own", base: "red", tops: ["question"] },
];

const MENU = {
  starters: [
    { n: "Burrata Pugliese", d: "Creamy burrata with cherry tomatoes, basil and taggiasca olives.", b: "Vegetarian" },
    { n: "Tagliere da Claudio", d: "House-cured pancetta, coppa and mortadella with cheeses and honey.", b: "House-cured" },
    { n: "Bruschetta al Pomodoro", d: "Charred bread, marinated tomatoes, garlic and basil.", b: "Vegan" },
    { n: "Arancini Siciliani", d: "Crisp saffron rice balls with mozzarella heart and ragù.", b: "" },
    { n: "Calamari Fritti", d: "Golden fried squid with lemon and house aioli.", b: "From the sea" },
    { n: "Parmigiana di Melanzane", d: "Layered eggplant, tomato, basil and parmesan, oven-baked.", b: "Vegetarian" },
    { n: "Focaccia al Rosmarino", d: "Wood-fired focaccia, rosemary, sea salt, olive oil.", b: "Vegan" },
  ],
  salads: [
    { n: "Caprese", d: "Fior di latte, tomatoes, basil and extra-virgin olive oil.", b: "Vegetarian" },
    { n: "Rucola e Parmigiano", d: "Rocket, parmesan shavings, cherry tomatoes, balsamic.", b: "Vegetarian" },
    { n: "Insalata Greca", d: "Feta, olives, cucumber, onion, peppers and oregano.", b: "Vegetarian" },
    { n: "Insalata di Mare", d: "Chilled seafood salad with celery, lemon and parsley.", b: "From the sea" },
  ],
  mains: [
    { n: "Lasagne della Nonna", d: "Hand-rolled sheets, slow ragù and béchamel, baked to order.", b: "Homemade" },
    { n: "Gnocchi al Gorgonzola", d: "Pillowy potato gnocchi in a silky gorgonzola cream.", b: "Homemade" },
    { n: "Ravioli Ricotta e Spinaci", d: "Homemade ravioli, butter and sage, parmesan snow.", b: "Homemade" },
    { n: "Risotto ai Frutti di Mare", d: "Carnaroli rice with prawns, squid and mussels from the gulf.", b: "From the sea" },
  ],
  desserts: [
    { n: "Tiramisù Classico", d: "Espresso-soaked savoiardi, mascarpone cream, cocoa.", b: "House classic" },
    { n: "Cannolo Siciliano", d: "Filled to order with homemade ricotta and mascarpone.", b: "Filled to order" },
    { n: "Tortino al Cioccolato", d: "Warm chocolate lava cake with gelato.", b: "" },
    { n: "Panna Cotta", d: "Silky vanilla cream with island mango coulis.", b: "" },
    { n: "Gelato Artigianale", d: "Ask for today's homemade flavours.", b: "Homemade" },
  ],
};

/* ─────────────── LOADER ─────────────── */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("is-done"), 500);
});

/* ─────────────── NAV ─────────────── */
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const burger = document.getElementById("navBurger");

addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 30), { passive: true });
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { navLinks.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
});

/* ─────────────── SCROLL REVEAL ─────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ─────────────── STAT COUNTERS ─────────────── */
const statIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    statIO.unobserve(en.target);
    const el = en.target, target = +el.dataset.count, t0 = performance.now(), dur = 1400;
    if (REDUCED) { el.textContent = target; return; }
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}, { threshold: 0.6 });
document.querySelectorAll(".stat-num").forEach((el) => statIO.observe(el));

/* ─────────────── PIZZA WHEEL ─────────────── */
(function wheel() {
  const NS = "http://www.w3.org/2000/svg";
  const CX = 320, CY = 320, R = 300, CRUST = 34;

  const card = document.getElementById("wheelCard");
  const cardName = document.getElementById("cardName");
  const cardHint = document.getElementById("cardHint");
  const cardTags = document.getElementById("cardTags");
  const diagramSvg = document.getElementById("cardDiagram");

  const BASE_NAMES = { red: "San Marzano Tomato", white: "Cream Base" };
  const TOPPING_NAMES = {
    mozz: "Mozzarella", burrata: "Burrata", basil: "Basil", rocket: "Rocket",
    parsley: "Parsley", oregano: "Oregano", salame: "Salame", ham: "Ham",
    crudo: "Prosciutto Crudo", bacon: "Bacon", sausage: "Sausage", chicken: "Chicken",
    mushroom: "Mushroom", olive: "Olives", caper: "Capers", anchovy: "Anchovies",
    shrimp: "Prawns", mussel: "Mussels", pineapple: "Pineapple", pepper: "Peppers",
    onion: "Onion", chilli: "Chilli", garlic: "Garlic", gorgonzola: "Gorgonzola",
    cheese: "Cheese", feta: "Feta", eggplant: "Eggplant", zucchini: "Zucchini",
    artichoke: "Artichoke", truffle: "Truffle Cream", question: "Your Choice",
  };

  // deterministic pseudo-random so toppings don't jump between renders
  function rng(seed) { return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  function el(tag, attrs) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  /* ── shared gradients + drop-shadow filters, for a baked/glossy 3D look ── */
  const sharedDefs = (() => {
    const svg = el("svg", { width: 0, height: 0, style: "position:absolute", "aria-hidden": "true" });
    svg.appendChild(el("defs", {}));
    document.body.appendChild(svg);
    return svg.firstChild;
  })();

  function radialGrad(id, stops) {
    const g = el("radialGradient", { id, cx: "35%", cy: "30%", r: "75%" });
    stops.forEach(([offset, color]) => g.appendChild(el("stop", { offset, "stop-color": color })));
    sharedDefs.appendChild(g);
  }
  radialGrad("crustGrad", [["0%", "#f0c98a"], ["55%", "#d9a35e"], ["100%", "#a8672e"]]);
  radialGrad("sauceGrad", [["0%", "#d65f45"], ["55%", "#b8442f"], ["100%", "#7a2c1c"]]);
  radialGrad("creamGrad", [["0%", "#f8ecd2"], ["55%", "#f0d9a8"], ["100%", "#d1b57c"]]);

  function shadowFilter(id, dy, blur, opacity) {
    const f = el("filter", { id, x: "-50%", y: "-50%", width: "200%", height: "200%" });
    f.appendChild(el("feDropShadow", { dx: 0, dy, stdDeviation: blur, "flood-color": "#2b1c10", "flood-opacity": opacity }));
    sharedDefs.appendChild(f);
  }
  shadowFilter("pizzaShadow", 5, 5, 0.3);
  shadowFilter("toppingShadow", 1.1, 1, 0.35);

  // lighten/darken a hex color for gradient stops
  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const clamp = (v) => Math.max(0, Math.min(255, v));
    const r = clamp((n >> 16) + amt), g = clamp(((n >> 8) & 0xff) + amt), b = clamp((n & 0xff) + amt);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  const glossCache = new Map();
  function gloss(hex) {
    if (glossCache.has(hex)) return glossCache.get(hex);
    const id = `gloss-${glossCache.size}`;
    radialGrad(id, [["0%", shade(hex, 60)], ["60%", hex], ["100%", shade(hex, -35)]]);
    const url = `url(#${id})`;
    glossCache.set(hex, url);
    return url;
  }
  const SHADOW = "url(#toppingShadow)";

  // thin wedges: spread toppings radially along the bisector with slight angular jitter
  function scatter(a0, a1, rand, count) {
    const pts = [], mid = (a0 + a1) / 2;
    for (let i = 0; i < count; i++) {
      const t = mid + (rand() - 0.5) * (a1 - a0) * 0.45;
      const rr = (0.42 + ((i + rand()) / count) * 0.4) * (R - CRUST);
      pts.push([CX + rr * Math.cos(t), CY + rr * Math.sin(t)]);
    }
    return pts;
  }

  const TOPPINGS = {
    mozz:      (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 11, fill: gloss("#f5ecd7"), opacity: .92, filter: SHADOW }))),
    burrata:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 14, fill: gloss("#fbf6ea"), filter: SHADOW }))),
    basil:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 9, ry: 5.5, fill: gloss("#3E7C4F"), filter: SHADOW, transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    rocket:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 10, ry: 4, fill: gloss("#4a7a42"), filter: SHADOW, transform: `rotate(${(x * y) % 360} ${x} ${y})` }))),
    parsley:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 3.5, fill: gloss("#4a7a42") }))),
    oregano:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 2.5, fill: "#5c6e3c" }))),
    salame:    (g, p) => p.forEach(([x, y]) => { g.appendChild(el("circle", { cx: x, cy: y, r: 10, fill: gloss("#8e2f22"), filter: SHADOW })); g.appendChild(el("circle", { cx: x, cy: y, r: 6, fill: gloss("#a83b2b") })); }),
    ham:       (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 9, y: y - 6, width: 18, height: 12, rx: 4, fill: gloss("#d98a80"), filter: SHADOW, transform: `rotate(${(x + 2 * y) % 360} ${x} ${y})` }))),
    crudo:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 12} ${y} q6 -9 12 0 t12 0`, stroke: gloss("#c96a5c"), "stroke-width": 6, fill: "none", "stroke-linecap": "round", filter: SHADOW }))),
    bacon:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 10} ${y} q5 -6 10 0 t10 0`, stroke: gloss("#9c4a30"), "stroke-width": 5, fill: "none", "stroke-linecap": "round", filter: SHADOW }))),
    sausage:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 7, fill: gloss("#7d4a35"), filter: SHADOW }))),
    chicken:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 8, y: y - 6, width: 16, height: 12, rx: 5, fill: gloss("#e0c08e"), filter: SHADOW }))),
    mushroom:  (g, p) => p.forEach(([x, y]) => { g.appendChild(el("path", { d: `M${x - 8} ${y} a8 8 0 0 1 16 0 z`, fill: gloss("#c9b39a"), filter: SHADOW })); g.appendChild(el("rect", { x: x - 2.5, y: y, width: 5, height: 7, rx: 2, fill: "#b09a80" })); }),
    olive:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 5, fill: gloss("#2e2a24"), stroke: "#4a4438", "stroke-width": 1.5, filter: SHADOW }))),
    caper:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 3.5, fill: gloss("#5a6b3a") }))),
    anchovy:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 11} ${y} q11 -5 22 0 q-11 5 -22 0`, fill: gloss("#8a8f96"), filter: SHADOW }))),
    shrimp:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y + 5} a9 9 0 1 1 14 -9`, stroke: gloss("#e8846b"), "stroke-width": 6, fill: "none", "stroke-linecap": "round", filter: SHADOW }))),
    mussel:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 8, ry: 5, fill: gloss("#3a3f52"), filter: SHADOW, transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    pineapple: (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x} ${y - 8} L${x + 7} ${y + 5} L${x - 7} ${y + 5} Z`, fill: gloss("#f2c14e"), filter: SHADOW }))),
    pepper:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y} q9 -7 18 0`, stroke: gloss("#4a8a3c"), "stroke-width": 5, fill: "none", "stroke-linecap": "round", filter: SHADOW }))),
    onion:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y} q9 -8 18 0`, stroke: gloss("#c9a0c4"), "stroke-width": 4, fill: "none", "stroke-linecap": "round" }))),
    chilli:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 7} ${y - 3} q9 -2 14 6`, stroke: gloss("#d43b25"), "stroke-width": 5, fill: "none", "stroke-linecap": "round", filter: SHADOW }))),
    garlic:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 4, fill: gloss("#efe6cf") }))),
    gorgonzola:(g, p) => p.forEach(([x, y]) => { g.appendChild(el("circle", { cx: x, cy: y, r: 9, fill: gloss("#e8e2cc"), filter: SHADOW })); g.appendChild(el("circle", { cx: x + 3, cy: y - 2, r: 2, fill: "#7a8a6a" })); }),
    cheese:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 7, y: y - 7, width: 14, height: 14, rx: 3, fill: gloss("#f2d06b"), filter: SHADOW, transform: `rotate(${(3 * x + y) % 360} ${x} ${y})` }))),
    feta:      (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 7, y: y - 7, width: 14, height: 14, rx: 2, fill: gloss("#f7f3e8"), filter: SHADOW, transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    eggplant:  (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 9, ry: 6, fill: gloss("#5a3a5e"), filter: SHADOW }))),
    zucchini:  (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 7, fill: gloss("#cfe0a8"), stroke: "#6a8a3c", "stroke-width": 2.5, filter: SHADOW }))),
    artichoke: (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x} ${y + 7} L${x - 7} ${y - 5} Q${x} ${y - 10} ${x + 7} ${y - 5} Z`, fill: gloss("#7a9a5c"), filter: SHADOW }))),
    truffle:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 4.5, fill: gloss("#3a2e24") }))),
    question:  (g, p) => p.forEach(([x, y]) => {
      const t = el("text", { x, y: y + 8, "text-anchor": "middle", "font-size": 26, fill: "#f3e9dc", "font-family": "Fraunces, Georgia, serif", "font-weight": 700, filter: SHADOW });
      t.textContent = "?"; g.appendChild(t);
    }),
  };

  function polar(a, r) { return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; }

  function slicePath(a0, a1, r) {
    const [x0, y0] = polar(a0, r), [x1, y1] = polar(a1, r);
    return `M${CX} ${CY} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`;
  }

  function setCard(pz) {
    cardName.textContent = pz.name;
    cardTags.textContent = pz.tags;
    cardHint.style.display = "none";
    renderDiagram(pz);
  }

  // realistic pizza slice with a dashed pointer + name for every ingredient
  function renderDiagram(pz) {
    const AX = 320, AY = 452, RS = 370, CR = 36;               // tip at bottom, crust arc on top
    const A0 = -Math.PI / 2 - 0.52, A1 = -Math.PI / 2 + 0.52;  // ~60° wedge
    const rand = rng(pz.name.split("").reduce((a, c) => a + c.charCodeAt(0), 7) * 97 + 11);
    const pt = (a, r) => [AX + r * Math.cos(a), AY + r * Math.sin(a)];
    const wedge = (r) => {
      const [x0, y0] = pt(A0, r), [x1, y1] = pt(A1, r);
      return `M${AX} ${AY} L${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1} Z`;
    };

    diagramSvg.innerHTML = `<defs><marker id="ing-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#362718"/></marker></defs>`;
    const g = el("g", {});
    diagramSvg.appendChild(g);

    // crust (only visible along the arc, like a real cut slice) + sauce/cream body
    g.appendChild(el("path", { d: wedge(RS), fill: "url(#crustGrad)", stroke: "#f8f1e0", "stroke-width": 3.5, filter: "url(#pizzaShadow)" }));
    g.appendChild(el("path", { d: wedge(RS - CR), fill: pz.base === "red" ? "url(#sauceGrad)" : "url(#creamGrad)" }));

    // melted cheese oozing over the two cut edges, plus a drip hanging off the tip
    [A0, A1].forEach((a) => {
      for (let i = 0; i < 4; i++) {
        const r = (0.3 + i * 0.18 + rand() * 0.08) * (RS - CR);
        const [cx, cy] = pt(a, r);
        g.appendChild(el("ellipse", { cx, cy, rx: 9 + rand() * 8, ry: 5 + rand() * 3, fill: gloss("#f2dfae"), opacity: .95, transform: `rotate(${(a * 180 / Math.PI).toFixed(1)} ${cx} ${cy})` }));
      }
    });
    g.appendChild(el("path", { d: `M${AX - 8} ${AY - 6} q9 24 6 33 q-3 9 -7 1 q-5 -11 -6 -28 z`, fill: gloss("#f2dfae"), filter: SHADOW }));

    // wood-fired char spots on the crust
    for (let i = 0; i < 9; i++) {
      const a = A0 + rand() * (A1 - A0);
      const rr = RS - CR * 0.5 + (rand() - 0.5) * CR * 0.6;
      const [cx, cy] = pt(a, rr);
      g.appendChild(el("ellipse", { cx, cy, rx: 3 + rand() * 4, ry: 2 + rand() * 3, fill: "#6b3d1c", opacity: (.2 + rand() * .2).toFixed(2), transform: `rotate(${(rand() * 360).toFixed(1)} ${cx} ${cy})` }));
    }

    // melted-cheese / sauce mottling for texture
    for (let i = 0; i < 8; i++) {
      const a = A0 + 0.08 + rand() * (A1 - A0 - 0.16);
      const rr = (0.3 + rand() * 0.6) * (RS - CR);
      const [cx, cy] = pt(a, rr);
      g.appendChild(el("ellipse", { cx, cy, rx: 10 + rand() * 14, ry: 7 + rand() * 10, fill: rand() > 0.5 ? "#fff" : "#000", opacity: (.05 + rand() * .05).toFixed(2), transform: `rotate(${(rand() * 360).toFixed(1)} ${cx} ${cy})` }));
    }

    // the sauce label points here — keep toppings off it so the arrow lands on visible base
    const baseAnchor = pt(-Math.PI / 2 + (rand() - 0.5) * 0.5, (RS - CR) * 0.5);

    // random point on the slice, away from tip, crust and the base anchor
    const inside = () => {
      for (let tries = 0; tries < 8; tries++) {
        const a = A0 + 0.1 + rand() * (A1 - A0 - 0.2);
        const r = Math.max(85, Math.sqrt(rand()) * (RS - CR - 34));
        const p = pt(a, r);
        if (Math.hypot(p[0] - baseAnchor[0], p[1] - baseAnchor[1]) > 42) return p;
      }
      return pt(A0 + 0.15, RS - CR - 60);
    };

    const labels = [{ key: "base", name: BASE_NAMES[pz.base] }, ...pz.tops.map((key) => ({ key, name: TOPPING_NAMES[key] || key }))];
    // more toppings on the pizza → fewer repeats of each, but the slice always ends up fully loaded
    const EXTRA = pz.tops[0] === "question" ? 0 : Math.max(4, Math.round(18 / Math.max(1, pz.tops.length)));

    // painters were sized for the small wheel; a scaled group makes them chunky and slice-realistic
    const S = 1.7, MY = AY - (RS - CR) * 0.62;
    const tg = el("g", { transform: `translate(${AX} ${MY}) scale(${S}) translate(${-AX} ${-MY})` });
    g.appendChild(tg);
    const virt = ([x, y]) => [AX + (x - AX) / S, MY + (y - MY) / S];

    // paint toppings, remembering one anchor point per ingredient for its pointer
    labels.forEach((item) => {
      if (item.key === "base") { item.anchor = baseAnchor; return; }
      const pts = item.key === "question" ? [pt(-Math.PI / 2, (RS - CR) * 0.6)] : [inside(), ...Array.from({ length: EXTRA }, inside)];
      item.anchor = pts[0];
      const painter = TOPPINGS[item.key];
      if (painter) painter(tg, pts.map(virt));
    });

    // labels in two side columns, each with a dashed arrow onto the slice
    const left = labels.filter((l) => l.anchor[0] < AX).sort((a, b) => a.anchor[1] - b.anchor[1]);
    const right = labels.filter((l) => l.anchor[0] >= AX).sort((a, b) => a.anchor[1] - b.anchor[1]);
    [[left, 10, "start"], [right, 630, "end"]].forEach(([col, tx, side]) => {
      col.forEach((item, i) => {
        const y = 70 + (i + 0.5) * (360 / Math.max(1, col.length));
        const [ax, ay] = item.anchor;
        const t = el("text", { x: tx, y: y + 8, "text-anchor": side, "font-family": "var(--font-hand), cursive", "font-size": 24, fill: "#362718", "font-weight": 600 });
        t.textContent = item.name;
        g.appendChild(t);
        // start the pointer just past the text so they never overlap
        const box = t.getBBox();
        const lx = side === "start" ? box.x + box.width + 8 : box.x - 8;
        g.appendChild(el("circle", { cx: ax, cy: ay, r: 19, fill: "none", stroke: "#362718", "stroke-width": 1.4, "stroke-dasharray": "3 3", opacity: .8 }));
        g.appendChild(el("line", { x1: lx, y1: y, x2: ax, y2: ay, stroke: "#362718", "stroke-width": 1.6, "stroke-dasharray": "2 4", "marker-end": "url(#ing-arrow)", opacity: .85 }));
      });
    });
  }

  function buildWheel(svgId, nameId, items, seed) {
    const svg = document.getElementById(svgId);
    const nameEl = document.getElementById(nameId);
    const group = el("g", { class: "slice-group" });
    const step = (Math.PI * 2) / items.length;

    items.forEach((pz, i) => {
      const a0 = i * step - Math.PI / 2;
      const a1 = a0 + step;
      const mid = (a0 + a1) / 2;

      const g = el("g", { class: "slice", tabindex: 0, role: "option", "aria-label": `${pz.name}: ${pz.desc}` });

      // crust ring segment then inner sauce/cheese
      g.appendChild(el("path", { class: "slice-base", d: slicePath(a0, a1, R), fill: "url(#crustGrad)", stroke: "#f8f1e0", "stroke-width": 3.5, filter: "url(#pizzaShadow)" }));
      g.appendChild(el("path", { d: slicePath(a0 + 0.01, a1 - 0.01, R - CRUST), fill: pz.base === "red" ? "url(#sauceGrad)" : "url(#creamGrad)" }));

      // toppings
      pz.tops.forEach((key, k) => {
        const painter = TOPPINGS[key];
        if (!painter) return;
        const pts = pz.tops[0] === "question"
          ? [polar(mid, (R - CRUST) * 0.62)]
          : scatter(a0, a1, rng((seed + i) * 13 + k * 31 + 3), 2);
        painter(g, pts);
      });

      // hover lift along bisector
      const lift = 13;
      const dx = Math.cos(mid) * lift, dy = Math.sin(mid) * lift;
      g.addEventListener("mouseenter", () => select(g, pz, dx, dy, nameEl));
      g.addEventListener("focus", () => select(g, pz, dx, dy, nameEl));
      g.addEventListener("mouseleave", () => deselect(g));
      g.addEventListener("blur", () => deselect(g));
      g.addEventListener("click", () => select(g, pz, dx, dy, nameEl));

      group.appendChild(g);
    });

    svg.appendChild(group);
  }

  function select(g, pz, dx, dy, nameEl) {
    document.querySelectorAll(".slice").forEach((s) => { s.classList.remove("is-active"); s.style.transform = ""; });
    document.querySelectorAll(".wheel-center-name").forEach((n) => { n.textContent = "Choose a slice"; });
    g.classList.add("is-active");
    if (!REDUCED) g.style.transform = `translate(${dx}px, ${dy}px)`;
    nameEl.textContent = pz.name;
    card.classList.add("is-swap");
    setTimeout(() => { setCard(pz); card.classList.remove("is-swap"); }, 160);
  }

  function deselect(g) {
    g.classList.remove("is-active");
    g.style.transform = "";
  }

  const HALF = Math.ceil(PIZZAS.length / 2);
  buildWheel("pizzaWheel1", "wheelName1", PIZZAS.slice(0, HALF), 0);
  buildWheel("pizzaWheel2", "wheelName2", PIZZAS.slice(HALF), HALF);
})();

/* ─────────────── MENU TABS ─────────────── */
(function menu() {
  const grid = document.getElementById("menuGrid");
  const tabs = document.querySelectorAll(".menu-tab");

  function show(cat) {
    grid.innerHTML = "";
    MENU[cat].forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.style.setProperty("--i", i);
      div.innerHTML = `<h3>${item.n}</h3><p>${item.d}</p>${item.b ? `<span class="menu-badge">${item.b}</span>` : ""}`;
      grid.appendChild(div);
    });
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => {
    tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    show(tab.dataset.cat);
  }));

  show("starters");
})();

/* ─────────────── FOOTER YEAR ─────────────── */
document.getElementById("year").textContent = new Date().getFullYear();
