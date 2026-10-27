/* =========================================================
   APP: a small step-by-step engine.
   Each screen is a function in STEPS that returns
   { label, title, crumbs, body }. go("stepName", changes)
   moves forward; Back and the browser back button work.
   ========================================================= */

const app = document.getElementById("app");
const topbar = document.getElementById("topbar");
const backBtn = document.getElementById("back-btn");

let state = { lang: "en" };   // current answers

/* Location pages (e.g. /fort-myers/) set <body data-location="fortMyers">.
   On those pages there is no dropdown: everything goes to that location. */
const PAGE_LOCATION = CONFIG.locations.find(l => l.id === document.body.dataset.location);
const timeline = [];          // saved snapshots for Back

/* ---------- small helpers ---------- */
const t = key => TEXT[state.lang][key];
const loc = v => (v && typeof v === "object" && !Array.isArray(v)) ? (v[state.lang] ?? v.en) : v;

function money(p) {
  if (p == null) return t("askPrice");
  if (Array.isArray(p)) return `${CONFIG.currency}${p[0]} – ${CONFIG.currency}${p[1]}`;
  return `${CONFIG.currency}${p}`;
}

/* Build an element: h("div", {class:"x", onclick:fn}, child, "text") */
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  kids.flat().forEach(k => k != null && k !== false && k !== "" && el.append(k.nodeType ? k : document.createTextNode(k)));
  return el;
}

const ICONS = {
  tablet: '<rect x="9" y="5" width="30" height="38" rx="4"/><line x1="21" y1="38" x2="27" y2="38"/>',
  phone:  '<rect x="15" y="4" width="18" height="40" rx="4"/><circle cx="24" cy="38" r="1.2"/>',
  watch:  '<rect x="13" y="14" width="22" height="20" rx="6"/><path d="M18 14 L19 6 H29 L30 14 M18 34 L19 42 H29 L30 34"/><path d="M24 19 V24 H28"/>',
  laptop: '<rect x="10" y="10" width="28" height="20" rx="2.5"/><path d="M5 36 H43"/>'
};
const icon = name => h("span", { class: "card-icon", "aria-hidden": "true",
  html: `<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>` });

/* ---------- reusable building blocks ---------- */

/* Grid of tappable cards. item: {title, sub, price, icon, wide, center, onClick} */
function cardGrid(items, cls = "") {
  return h("div", { class: `card-grid ${cls}` },
    items.map(it => h("button", { type: "button", class: `card${it.wide ? " wide" : ""}${it.center ? " center" : ""}`, onclick: it.onClick },
      it.icon && icon(it.icon),
      h("span", { class: "card-title" }, it.title),
      it.sub && h("span", { class: "card-sub" }, it.sub),
      it.price !== undefined && h("span", { class: `card-price${it.price == null ? " ask" : ""}` }, money(it.price))
    )));
}

/* Vertical list with arrows. item: {title, sub, onClick} */
function rowList(items) {
  return h("ul", { class: "row-list" },
    items.map(it => h("li", {},
      h("button", { type: "button", class: "row", onclick: it.onClick },
        h("span", {}, h("span", { class: "row-title" }, it.title), it.sub && h("span", { class: "row-sub" }, it.sub)),
        h("span", { class: "chev", "aria-hidden": "true" })
      ))));
}

/* Form field. f: {id, label, type, required, placeholder, hint, options, half} */
function field(f) {
  const labelEl = h("label", { for: f.id },
    f.label, f.required ? h("span", { class: "req" }, " *") : h("span", { class: "opt" }, ` (${t("optional")})`));
  let input;
  if (f.type === "textarea") input = h("textarea", { id: f.id, name: f.id, rows: 3, placeholder: f.placeholder });
  else if (f.type === "select") {
    input = h("select", { id: f.id, name: f.id },
      h("option", { value: "" }, t("select")),
      f.options.map(o => typeof o === "object"
        ? h("option", { value: o.value }, o.label)
        : h("option", { value: o }, o)));
  } else input = h("input", { id: f.id, name: f.id, type: f.type || "text", placeholder: f.placeholder, autocomplete: f.autocomplete });
  if (f.required) input.required = true;
  if (f.value) input.value = f.value;
  return h("div", { class: `field${f.half ? " half" : ""}` }, labelEl, input, f.hint && h("p", { class: "hint" }, f.hint));
}

/* Summary table. rows: [[label, value], ...] */
function summary(rows) {
  return h("dl", { class: "summary" }, rows.map(([k, v]) => h("div", {}, h("dt", {}, k), h("dd", {}, v))));
}

/* Form that sends everything to WhatsApp.
   On the main page a location dropdown is added last; it picks which number
   gets the message. On a location page that location is used instead. */
function whatsappForm(fields, extraLines = []) {
  if (PAGE_LOCATION) extraLines = [...extraLines, `${t("location")}: ${PAGE_LOCATION.name}`];
  else fields = [...fields, { id: "location", label: t("location"), type: "select", required: true,
    options: CONFIG.locations.map(l => ({ value: l.id, label: l.name })) }];
  const msg = h("p", { class: "form-msg", role: "status" });
  const form = h("form", { class: "form", novalidate: true },
    h("div", { class: "field-grid" }, fields.map(field)),
    msg,
    h("button", { type: "submit", class: "btn btn-black" }, waIcon(), t("whatsapp")),
    h("button", { type: "button", class: "btn btn-outline", onclick: () => restart() }, t("newRequest"))
  );
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    fields.forEach(f => {
      const el = form.elements[f.id];
      const bad = !!f.required && !el.value.trim();
      el.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.textContent = t("missing"); msg.className = "form-msg error"; return; }
    const location = PAGE_LOCATION || CONFIG.locations.find(l => l.id === form.elements.location.value);
    const lines = [t("msgHello"), "", ...extraLines];
    fields.forEach(f => {
      const el = form.elements[f.id];
      const v = el.tagName === "SELECT" ? el.selectedOptions[0].text : el.value.trim();
      if (el.value.trim()) lines.push(`${f.label}: ${v}`);
    });
    const url = `https://wa.me/${location.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    msg.textContent = t("sent"); msg.className = "form-msg ok";
  });
  return form;
}

function waIcon() {
  return h("span", { "aria-hidden": "true", html: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>' });
}

/* ---------- lookups ---------- */
const device = () => DEVICES.find(d => d.id === state.device);
const brand = () => BRANDS.find(b => b.id === state.brand);
const series = () => SERIES[state.brand]?.find(s => s.name === state.series);
const part = () => PARTS.find(p => p.id === state.part);

function priceFor(p, qualityId) {
  const custom = MODEL_PRICES[state.model]?.[p.id];
  if (qualityId) {
    const q = p.qualities.find(x => x.id === qualityId);
    return (custom && custom[qualityId] !== undefined) ? custom[qualityId] : q.price;
  }
  if (p.qualities) {
    const prices = p.qualities.map(q => priceFor(p, q.id));
    return [Math.min(...prices), Math.max(...prices)];
  }
  return custom !== undefined ? custom : p.price;
}

/* Breadcrumb path for the current answers */
function crumbs(extra = []) {
  const list = [];
  if (state.device) list.push(loc(device().name));
  if (state.brand) list.push(loc(brand().name));
  if (state.series) list.push(state.series);
  if (state.model) list.push(state.model);
  return [...list, ...extra];
}

/* =========================================================
   SCREENS
   ========================================================= */
const STEPS = {

  welcome: () => ({
    bare: true,
    body: h("section", { class: "welcome" },
      h("div", { class: "welcome-logo" },
        h("span", { class: "logo-mark big", "aria-hidden": "true",
          html: '<svg viewBox="0 0 32 32" width="56" height="56"><rect x="8" y="3" width="16" height="26" rx="3.5" fill="currentColor"/><path d="M12 22 L20 10" stroke="var(--sun)" stroke-width="3" stroke-linecap="round"/></svg>' }),
        h("span", { class: "logo-text big" }, "911 Phone", h("b", {}, " Repair"))
      ),
      h("div", { class: "hero-art", "aria-hidden": "true", html: VAN_SVG }),
      h("h1", {}, TEXT.en.welcomeTitle),
      h("p", { class: "welcome-sub" }, TEXT.en.welcomeSub),
      h("p", { class: "area" }, h("span", { class: "pin" }), (PAGE_LOCATION?.area || CONFIG.area).en),
      h("p", { class: "lang-q" }, "Choose your language", h("br"), "Elige tu idioma"),
      cardGrid([
        { title: "English", center: true, onClick: () => go("device", { lang: "en" }) },
        { title: "Español", center: true, onClick: () => go("device", { lang: "es" }) }
      ], "lang-grid")
    )
  }),

  device: () => ({
    label: t("stepRequest"), title: t("qDevice"), crumbs: [],
    body: cardGrid(DEVICES.map(d => ({
      title: loc(d.name), sub: loc(d.sub), icon: d.icon,
      onClick: () => go(d.flow === "phone" ? "brand" : "info", { device: d.id })
    })))
  }),

  brand: () => ({
    label: t("stepRequest"), title: t("qBrand"), crumbs: crumbs(),
    body: cardGrid(BRANDS.map(b => ({
      title: loc(b.name), sub: loc(b.sub), wide: b.wide,
      onClick: () => go(b.flow === "form" ? "info" : "series", { brand: b.id })
    })))
  }),

  series: () => ({
    label: t("stepSeries"), title: t("qSeries"), crumbs: crumbs(),
    body: rowList(SERIES[state.brand].map(s => ({
      title: s.name, sub: t("models")(s.models.length),
      onClick: () => s.models.length === 1
        ? go("part", { series: s.name, model: s.models[0] })
        : go("model", { series: s.name })
    })))
  }),

  model: () => ({
    label: t("stepModel"), title: t("qModel"), crumbs: crumbs(),
    body: rowList(series().models.map(m => ({ title: m, onClick: () => go("part", { model: m }) })))
  }),

  part: () => ({
    label: t("stepPart"), title: t("qPart"), crumbs: crumbs(),
    body: h("div", {},
      h("p", { class: "note" }, h("span", { class: "tick", "aria-hidden": "true" }), t("priceNote")),
      cardGrid(PARTS.map(p => ({
        title: loc(p.name), price: priceFor(p),
        onClick: () => go(p.qualities ? "quality" : "review", { part: p.id, quality: null })
      })), "compact")
    )
  }),

  quality: () => {
    const p = part();
    const prem = QUALITY_INFO.premium, eco = QUALITY_INFO.economy;
    return {
      label: t("stepQuality"), title: t("qQuality"), crumbs: [state.model],
      body: h("div", {},
        cardGrid(p.qualities.map(q => ({
          title: loc(q.name), price: priceFor(p, q.id), center: true,
          onClick: () => go("review", { quality: q.id })
        }))),
        h("div", { class: "compare" },
          h("h2", { class: "compare-h" }, t("compare")),
          h("div", { class: "compare-block" },
            h("h3", { class: "q-name premium" }, loc(p.qualities[0].name),
              loc(prem.badges).map(b => h("span", { class: "badge" }, b))),
            h("ul", { class: "pros" }, loc(prem.good).map(x => h("li", {}, x)))
          ),
          h("div", { class: "compare-block" },
            h("h3", { class: "q-name" }, loc(p.qualities[1].name)),
            h("ul", { class: "cons" }, loc(eco.bad).map(x => h("li", {}, x))),
            h("ul", { class: "pros accent" }, loc(eco.good).map(x => h("li", {}, x)))
          ),
          h("p", { class: "compare-foot" }, t("qualityFoot"))
        )
      )
    };
  },

  review: () => {
    const p = part();
    const q = state.quality ? p.qualities.find(x => x.id === state.quality) : null;
    const repairName = q ? `${loc(p.name)} – ${loc(q.name)}` : loc(p.name);
    const price = money(priceFor(p, state.quality));
    const rows = [[t("brand"), loc(brand().name)], [t("model"), state.model], [t("repair"), repairName], [t("price"), price]];
    return {
      label: t("stepReview"), title: t("qReview"), crumbs: [],
      body: h("div", {},
        summary(rows),
        whatsappForm([
          { id: "name", label: t("fullName"), required: true, placeholder: t("phName"), autocomplete: "name" },
          { id: "phone", label: t("phone"), type: "tel", required: true, placeholder: t("phPhone"), autocomplete: "tel" },
          { id: "address", label: t("address"), placeholder: t("phAddress"), hint: t("addressHint"), autocomplete: "street-address" }
        ], rows.map(([k, v]) => `${k}: ${v}`))
      )
    };
  },

  info: () => {
    const d = device();
    const isOtherPhone = state.brand === "other";
    const issues = [...ISSUES.common, ...(ISSUES[d.id] || []), ...ISSUES.other].map(loc);
    const fields = [
      { id: "name", label: t("fullName"), required: true, placeholder: t("phName"), autocomplete: "name" },
      { id: "phone", label: t("phone"), type: "tel", required: true, placeholder: t("phPhone"), half: true, autocomplete: "tel" },
      { id: "email", label: t("email"), type: "email", placeholder: t("phEmail"), half: true, autocomplete: "email" },
      { id: "brand", label: t("brand"), required: true, placeholder: t("phBrand") },
      { id: "model", label: t("model"), required: true, placeholder: t("phModel"), half: true },
      { id: "issue", label: t("issue"), type: "select", required: true, options: issues, half: true },
      { id: "desc", label: t("description"), type: "textarea", placeholder: t("phDesc") },
      { id: "address", label: t("address"), placeholder: t("phAddress"), hint: t("addressHint"), autocomplete: "street-address" }
    ];
    return {
      label: t("stepRequest"), title: t("qInfo"), crumbs: crumbs(),
      body: whatsappForm(fields, [`${t("device")}: ${loc(d.name)}${isOtherPhone ? " (" + loc(brand().name) + ")" : ""}`])
    };
  }
};

/* =========================================================
   NAVIGATION + RENDER
   ========================================================= */
function go(step, changes = {}) {
  state = { ...state, ...changes, step };
  timeline.push({ ...state });
  history.pushState({ i: timeline.length - 1 }, "");
  render();
}

function restart() {
  const lang = state.lang;
  state = { lang };
  go("device");
}

window.addEventListener("popstate", e => {
  const i = e.state?.i ?? 0;
  timeline.length = i + 1;
  state = { ...timeline[i] };
  render();
});

function render() {
  const view = STEPS[state.step]();
  document.documentElement.lang = state.lang;
  topbar.hidden = !!view.bare;
  backBtn.textContent = `‹ ${t("back")}`;
  backBtn.hidden = state.step === "device";

  app.innerHTML = "";
  if (view.bare) { app.append(view.body); window.scrollTo(0, 0); return; }

  const trail = h("nav", { class: "crumbs", "aria-label": "Breadcrumb" },
    h("button", { type: "button", class: "crumb-home", onclick: () => restart() }, t("home")),
    (view.crumbs || []).map((c, i, arr) => h("span", { class: i === arr.length - 1 ? "crumb current" : "crumb" }, c))
  );

  app.append(h("section", { class: "step" },
    h("p", { class: "step-label" }, view.label),
    h("h1", { class: "step-title" }, view.title),
    trail,
    h("div", { class: "step-body" }, view.body)
  ));
  window.scrollTo(0, 0);
  app.querySelector(".step-title")?.focus?.();
}

/* Header buttons */
document.addEventListener("click", e => {
  const a = e.target.closest("[data-action]");
  if (!a) return;
  if (a.dataset.action === "back") history.back();
  if (a.dataset.action === "home") { state = { lang: state.lang }; go("welcome"); }
});

/* The van illustration from the first site */
const VAN_SVG = `
<svg viewBox="0 0 420 380" class="route-svg">
  <path d="M20 350 C 120 340, 90 230, 190 220 S 300 120, 330 70" fill="none" stroke="var(--road)" stroke-width="34" stroke-linecap="round"/>
  <path class="road-dash" d="M20 350 C 120 340, 90 230, 190 220 S 300 120, 330 70" fill="none" stroke="var(--sun)" stroke-width="4" stroke-dasharray="14 14" stroke-linecap="round"/>
  <g transform="translate(300 10)">
    <path d="M0 50 L45 14 L90 50 V100 H0 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/>
    <rect x="34" y="62" width="22" height="38" fill="var(--sea)"/>
    <circle cx="51" cy="82" r="2.5" fill="var(--sun)"/>
  </g>
  <g class="van"><g transform="translate(-34 -30)">
    <rect x="0" y="6" width="50" height="34" rx="6" fill="var(--sea)"/>
    <path d="M50 14 H62 L70 26 V40 H50 Z" fill="var(--sea)"/>
    <rect x="54" y="17" width="9" height="9" rx="2" fill="var(--sky)"/>
    <rect x="10" y="14" width="12" height="18" rx="2.5" fill="var(--paper)"/>
    <path d="M13 28 L19 18" stroke="var(--sun)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="14" cy="42" r="7" fill="var(--ink)"/><circle cx="56" cy="42" r="7" fill="var(--ink)"/>
    <circle cx="14" cy="42" r="2.5" fill="var(--paper)"/><circle cx="56" cy="42" r="2.5" fill="var(--paper)"/>
  </g></g>
</svg>`;

/* Start */
state.step = "welcome";
timeline.push({ ...state });
history.replaceState({ i: 0 }, "");
render();
