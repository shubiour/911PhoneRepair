/* =========================================================
   CATALOG: devices, brands, series, models, parts, prices
   To change prices, edit PARTS below.
   To give one model its own prices, add it to MODEL_PRICES.
   ========================================================= */

/* Top-level devices.
   flow: "phone" = brand > series > model > part
   flow: "form"  = go straight to the customer form          */
const DEVICES = [
  { id: "tablet", icon: "tablet", flow: "form",  name: { en: "Tablets", es: "Tabletas" },          sub: { en: "iPad, Samsung, and more", es: "iPad, Samsung y más" } },
  { id: "phone",  icon: "phone",  flow: "phone", name: { en: "Phone", es: "Teléfono" },            sub: { en: "Apple, Samsung, Motorola…", es: "Apple, Samsung, Motorola…" } },
  { id: "watch",  icon: "watch",  flow: "form",  name: { en: "Watch", es: "Reloj" },               sub: { en: "Apple Watch, Galaxy Watch…", es: "Apple Watch, Galaxy Watch…" } },
  { id: "laptop", icon: "laptop", flow: "form",  name: { en: "Laptops / PC", es: "Laptops / PC" }, sub: { en: "MacBook, Windows, and more", es: "MacBook, Windows y más" } }
];

/* Phone brands. A brand with flow "form" skips straight to the form. */
const BRANDS = [
  { id: "apple",    name: "Apple",        sub: { en: "iPhone 7 – 17", es: "iPhone 7 – 17" } },
  { id: "samsung",  name: "Samsung",      sub: { en: "Galaxy S / A / Z / Note", es: "Galaxy S / A / Z / Note" } },
  { id: "motorola", name: "Motorola",     sub: { en: "Moto G / Edge / Razr", es: "Moto G / Edge / Razr" } },
  { id: "pixel",    name: "Google Pixel", sub: { en: "Pixel 3 – 9", es: "Pixel 3 – 9" } },
  { id: "other",    name: { en: "Other brand", es: "Otra marca" }, sub: { en: "Huawei, Xiaomi, OnePlus, LG, and more", es: "Huawei, Xiaomi, OnePlus, LG y más" }, flow: "form", wide: true }
];

/* Series and models for each brand */
const SERIES = {
  apple: [
    { name: "iPhone Air Series", models: ["iPhone Air"] },
    { name: "iPhone 17 Series",  models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17e", "iPhone 17"] },
    { name: "iPhone 16 Series",  models: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16", "iPhone 16e"] },
    { name: "iPhone 15 Series",  models: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15"] },
    { name: "iPhone 14 Series",  models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14"] },
    { name: "iPhone 13 Series",  models: ["iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini"] },
    { name: "iPhone 12 Series",  models: ["iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini"] },
    { name: "iPhone 11 Series",  models: ["iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11"] },
    { name: "iPhone X Series",   models: ["iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X"] },
    { name: "iPhone SE Series",  models: ["iPhone SE (3rd gen)", "iPhone SE (2nd gen)"] },
    { name: "iPhone 8 Series",   models: ["iPhone 8 Plus", "iPhone 8"] },
    { name: "iPhone 7 Series",   models: ["iPhone 7 Plus", "iPhone 7"] }
  ],
  samsung: [
    { name: "Galaxy S Series",    models: ["Galaxy S25 Ultra", "Galaxy S25+", "Galaxy S25", "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S22 Ultra", "Galaxy S22"] },
    { name: "Galaxy A Series",    models: ["Galaxy A56", "Galaxy A36", "Galaxy A26", "Galaxy A16", "Galaxy A55", "Galaxy A35", "Galaxy A25", "Galaxy A15"] },
    { name: "Galaxy Z Series",    models: ["Galaxy Z Fold7", "Galaxy Z Flip7", "Galaxy Z Fold6", "Galaxy Z Flip6", "Galaxy Z Fold5", "Galaxy Z Flip5"] },
    { name: "Galaxy Note Series", models: ["Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10+", "Galaxy Note 10"] }
  ],
  motorola: [
    { name: "Moto G Series", models: ["Moto G Power", "Moto G Stylus", "Moto G", "Moto G Play"] },
    { name: "Edge Series",   models: ["Motorola Edge", "Motorola Edge+"] },
    { name: "Razr Series",   models: ["Razr+", "Razr"] }
  ],
  pixel: [
    { name: "Pixel 9 Series", models: ["Pixel 9 Pro XL", "Pixel 9 Pro", "Pixel 9", "Pixel 9a"] },
    { name: "Pixel 8 Series", models: ["Pixel 8 Pro", "Pixel 8", "Pixel 8a"] },
    { name: "Pixel 7 Series", models: ["Pixel 7 Pro", "Pixel 7", "Pixel 7a"] },
    { name: "Pixel 6 Series", models: ["Pixel 6 Pro", "Pixel 6", "Pixel 6a"] },
    { name: "Pixel 5 Series", models: ["Pixel 5", "Pixel 5a"] },
    { name: "Pixel 4 Series", models: ["Pixel 4 XL", "Pixel 4", "Pixel 4a"] },
    { name: "Pixel 3 Series", models: ["Pixel 3 XL", "Pixel 3", "Pixel 3a"] }
  ]
};

/* Parts and default prices (used for every phone model).
   price: a number, a [min, max] range, or null = "Ask for price".
   qualities: optional list of options (shown as an extra step). */
const PARTS = [
  { id: "screen", name: { en: "Screen", es: "Pantalla" },
    qualities: [
      { id: "premium", name: { en: "Premium", es: "Premium" }, price: 230 },
      { id: "economy", name: { en: "Economy", es: "Económica" }, price: 150 }
    ] },
  { id: "backGlass",    name: { en: "Back glass", es: "Vidrio trasero" },                    price: 120 },
  { id: "battery",      name: { en: "Battery", es: "Batería" },                              price: 150 },
  { id: "chargingPort", name: { en: "Charging port", es: "Puerto de carga" },                price: 175 },
  { id: "board",        name: { en: "Motherboard / microsoldering", es: "Placa / microsoldadura" }, price: [150, 350] },
  { id: "dataRecovery", name: { en: "Data recovery", es: "Recuperación de datos" },          price: 150 },
  { id: "cameraLens",   name: { en: "Camera lens", es: "Lente de cámara" },                  price: null },
  { id: "loudSpeaker",  name: { en: "Loud speaker", es: "Altavoz" },                         price: 100 },
  { id: "microphone",   name: { en: "Microphone", es: "Micrófono" },                         price: 175 },
  { id: "backCamera",   name: { en: "Back camera", es: "Cámara trasera" },                   price: 350 },
  { id: "frontCamera",  name: { en: "Front camera", es: "Cámara frontal" },                  price: 200 },
  { id: "faceId",       name: { en: "Face ID / Touch ID", es: "Face ID / Touch ID" },        price: 200 },
  { id: "powerButton",  name: { en: "Power button", es: "Botón de encendido" },              price: 140 },
  { id: "volumeButton", name: { en: "Volume button", es: "Botón de volumen" },               price: 140 },
  { id: "frame",        name: { en: "Frame / housing", es: "Marco / carcasa" },              price: 480 },
  { id: "earSpeaker",   name: { en: "Ear speaker", es: "Auricular" },                        price: 100 }
];

/* Optional: different prices for a specific model.
   Example:
   "iPhone 13": { battery: 99, screen: { premium: 180, economy: 110 } }  */
const MODEL_PRICES = {
};

/* What the screen quality step says about each option */
const QUALITY_INFO = {
  premium: {
    badges: { en: ["Feels like the original", "Best quality"], es: ["Como el original", "Mejor calidad"] },
    good: {
      en: ["Bright, vivid colors and deep blacks", "Fits exactly like the original", "Fast, accurate touch", "Sensors, True Tone and auto-brightness keep working", "Uses less battery"],
      es: ["Colores vivos y negros profundos", "Encaja igual que el original", "Toque rápido y preciso", "Sensores, True Tone y brillo automático funcionan", "Usa menos batería"]
    }
  },
  economy: {
    bad: {
      en: ["Colors look less vivid, blacks look grayish", "Slightly thicker fit", "Touch is a little slower", "True Tone and auto-brightness are off", "May use more battery"],
      es: ["Colores menos vivos, negros grisáceos", "Un poco más grueso", "Toque un poco más lento", "True Tone y brillo automático apagados", "Puede usar más batería"]
    },
    good: { en: ["Good choice for carrier trade-ins"], es: ["Buena opción para entregar al operador"] }
  }
};

/* Issue choices on the customer form (tablet, watch, laptop, other brands) */
const ISSUES = {
  common: [
    { en: "Cracked or broken screen", es: "Pantalla rota" },
    { en: "Battery problem", es: "Problema de batería" },
    { en: "Won't charge", es: "No carga" },
    { en: "Won't turn on", es: "No enciende" },
    { en: "Water damage", es: "Daño por agua" }
  ],
  laptop: [
    { en: "Keyboard or trackpad", es: "Teclado o touchpad" },
    { en: "Running slow", es: "Funciona lento" }
  ],
  watch: [
    { en: "Back cover or sensor glass", es: "Tapa trasera o sensor" }
  ],
  other: [
    { en: "Something else", es: "Otro problema" }
  ]
};
