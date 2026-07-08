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

/* ─────────────── EMBER PARTICLES ─────────────── */
(function embers() {
  if (REDUCED) return;
  const canvas = document.getElementById("embers");
  const ctx = canvas.getContext("2d");
  let W, H, parts = [];
  const N = 55;
  const COLORS = ["#e8b45a", "#d84a3a", "#f0d9a8", "#c77b3f"];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  addEventListener("resize", resize, { passive: true });

  function spawn(init) {
    return {
      x: Math.random() * W,
      y: init ? Math.random() * H : H + 10,
      r: 0.6 + Math.random() * 2.2,
      vy: 0.25 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.4,
      wob: Math.random() * Math.PI * 2,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: 0.15 + Math.random() * 0.55,
    };
  }
  for (let i = 0; i < N; i++) parts.push(spawn(true));

  (function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.y -= p.vy;
      p.wob += 0.02;
      p.x += p.vx + Math.sin(p.wob) * 0.3;
      if (p.y < -12) parts[i] = spawn(false);
      ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.wob * 2));
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  })();
})();

/* ─────────────── PIZZA WHEEL ─────────────── */
(function wheel() {
  const NS = "http://www.w3.org/2000/svg";
  const CX = 320, CY = 320, R = 300, CRUST = 34;

  const card = document.getElementById("wheelCard");
  const cardName = document.getElementById("cardName");
  const cardDesc = document.getElementById("cardDesc");
  const cardTags = document.getElementById("cardTags");

  const BASES = { red: "#b8442f", white: "#f0d9a8" };

  // deterministic pseudo-random so toppings don't jump between renders
  function rng(seed) { return () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  function el(tag, attrs) {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

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
    mozz:      (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 11, fill: "#f5ecd7", opacity: .92 }))),
    burrata:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 14, fill: "#fbf6ea" }))),
    basil:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 9, ry: 5.5, fill: "#3E7C4F", transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    rocket:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 10, ry: 4, fill: "#4a7a42", transform: `rotate(${(x * y) % 360} ${x} ${y})` }))),
    parsley:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 3.5, fill: "#4a7a42" }))),
    oregano:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 2.5, fill: "#5c6e3c" }))),
    salame:    (g, p) => p.forEach(([x, y]) => { g.appendChild(el("circle", { cx: x, cy: y, r: 10, fill: "#8e2f22" })); g.appendChild(el("circle", { cx: x, cy: y, r: 7, fill: "#a83b2b" })); }),
    ham:       (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 9, y: y - 6, width: 18, height: 12, rx: 4, fill: "#d98a80", transform: `rotate(${(x + 2 * y) % 360} ${x} ${y})` }))),
    crudo:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 12} ${y} q6 -9 12 0 t12 0`, stroke: "#c96a5c", "stroke-width": 6, fill: "none", "stroke-linecap": "round" }))),
    bacon:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 10} ${y} q5 -6 10 0 t10 0`, stroke: "#9c4a30", "stroke-width": 5, fill: "none", "stroke-linecap": "round" }))),
    sausage:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 7, fill: "#7d4a35" }))),
    chicken:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 8, y: y - 6, width: 16, height: 12, rx: 5, fill: "#e0c08e" }))),
    mushroom:  (g, p) => p.forEach(([x, y]) => { g.appendChild(el("path", { d: `M${x - 8} ${y} a8 8 0 0 1 16 0 z`, fill: "#c9b39a" })); g.appendChild(el("rect", { x: x - 2.5, y: y, width: 5, height: 7, rx: 2, fill: "#b09a80" })); }),
    olive:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 5, fill: "#2e2a24", stroke: "#4a4438", "stroke-width": 1.5 }))),
    caper:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 3.5, fill: "#5a6b3a" }))),
    anchovy:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 11} ${y} q11 -5 22 0 q-11 5 -22 0`, fill: "#8a8f96" }))),
    shrimp:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y + 5} a9 9 0 1 1 14 -9`, stroke: "#e8846b", "stroke-width": 6, fill: "none", "stroke-linecap": "round" }))),
    mussel:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 8, ry: 5, fill: "#3a3f52", transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    pineapple: (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x} ${y - 8} L${x + 7} ${y + 5} L${x - 7} ${y + 5} Z`, fill: "#f2c14e" }))),
    pepper:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y} q9 -7 18 0`, stroke: "#4a8a3c", "stroke-width": 5, fill: "none", "stroke-linecap": "round" }))),
    onion:     (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 9} ${y} q9 -8 18 0`, stroke: "#c9a0c4", "stroke-width": 4, fill: "none", "stroke-linecap": "round" }))),
    chilli:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x - 7} ${y - 3} q9 -2 14 6`, stroke: "#d43b25", "stroke-width": 5, fill: "none", "stroke-linecap": "round" }))),
    garlic:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 4, fill: "#efe6cf" }))),
    gorgonzola:(g, p) => p.forEach(([x, y]) => { g.appendChild(el("circle", { cx: x, cy: y, r: 9, fill: "#e8e2cc" })); g.appendChild(el("circle", { cx: x + 3, cy: y - 2, r: 2, fill: "#7a8a6a" })); }),
    cheese:    (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 7, y: y - 7, width: 14, height: 14, rx: 3, fill: "#f2d06b", transform: `rotate(${(3 * x + y) % 360} ${x} ${y})` }))),
    feta:      (g, p) => p.forEach(([x, y]) => g.appendChild(el("rect", { x: x - 7, y: y - 7, width: 14, height: 14, rx: 2, fill: "#f7f3e8", transform: `rotate(${(x + y) % 360} ${x} ${y})` }))),
    eggplant:  (g, p) => p.forEach(([x, y]) => g.appendChild(el("ellipse", { cx: x, cy: y, rx: 9, ry: 6, fill: "#5a3a5e" }))),
    zucchini:  (g, p) => p.forEach(([x, y]) => { g.appendChild(el("circle", { cx: x, cy: y, r: 7, fill: "#cfe0a8", stroke: "#6a8a3c", "stroke-width": 2.5 })); }),
    artichoke: (g, p) => p.forEach(([x, y]) => g.appendChild(el("path", { d: `M${x} ${y + 7} L${x - 7} ${y - 5} Q${x} ${y - 10} ${x + 7} ${y - 5} Z`, fill: "#7a9a5c" }))),
    truffle:   (g, p) => p.forEach(([x, y]) => g.appendChild(el("circle", { cx: x, cy: y, r: 4.5, fill: "#3a2e24" }))),
    question:  (g, p) => p.forEach(([x, y]) => {
      const t = el("text", { x, y: y + 8, "text-anchor": "middle", "font-size": 26, fill: "#f3e9dc", "font-family": "Playfair Display, serif", "font-weight": 700 });
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
    cardDesc.textContent = pz.desc;
    cardTags.textContent = pz.tags;
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
      g.appendChild(el("path", { class: "slice-base", d: slicePath(a0, a1, R), fill: "#d9a35e", stroke: "#100b09", "stroke-width": 3.5 }));
      g.appendChild(el("path", { d: slicePath(a0 + 0.01, a1 - 0.01, R - CRUST), fill: BASES[pz.base] }));

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
