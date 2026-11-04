/* =========================================================
   BUSINESS SETTINGS  (edit these first)
   ========================================================= */
const CONFIG = {
  businessName: "911 Phone Repair",
  // Locations shown in the dropdown before sending. Each has its own
  // WhatsApp Business number: country code + number, digits only (1 = USA)
  // Example: (561) 555-0100  ->  "15615550100"
  // Text messages (SMS) go to the same number, unless a location has its own
  // sms: "1..." number set.
  // Each location also has its own page: /fort-myers/ and /bonita-springs/
  // (the page's <body data-location="..."> matches the id here).
  // lat/lng: on the main page the visitor's nearest location is picked
  // automatically (if they allow location access).
  // region: once the visitor's location is known, the dropdown only lists
  // cities in their region (currently all "southwest").
  locations: [
    { id: "fortMyers",      name: "Fort Myers",      whatsapp: "13052161675", region: "southwest", lat: 26.6406, lng: -81.8723,  // TODO: real Fort Myers number
      area: { en: "Serving Fort Myers & nearby", es: "Servicio en Fort Myers y alrededores" } },
    // The southwest cities below share the 305 number
    { id: "capeCoral",      name: "Cape Coral",      whatsapp: "13052161675", region: "southwest", lat: 26.5629, lng: -81.9495,
      area: { en: "Serving Cape Coral & nearby", es: "Servicio en Cape Coral y alrededores" } },
    { id: "naples",         name: "Naples",          whatsapp: "13052161675", region: "southwest", lat: 26.1420, lng: -81.7948,
      area: { en: "Serving Naples & nearby", es: "Servicio en Naples y alrededores" } },
    { id: "lehighAcres",    name: "Lehigh Acres",    whatsapp: "13052161675", region: "southwest", lat: 26.6254, lng: -81.6248,
      area: { en: "Serving Lehigh Acres & nearby", es: "Servicio en Lehigh Acres y alrededores" } },
    { id: "northFortMyers", name: "North Fort Myers", whatsapp: "13052161675", region: "southwest", lat: 26.6673, lng: -81.8801,
      area: { en: "Serving North Fort Myers & nearby", es: "Servicio en North Fort Myers y alrededores" } },
    { id: "bonitaSprings",  name: "Bonita Springs",  whatsapp: "13052161675", region: "southwest", lat: 26.3398, lng: -81.7787,
      area: { en: "Serving Bonita Springs & nearby", es: "Servicio en Bonita Springs y alrededores" } }
  ],
  // Message pre-typed when someone taps the floating WhatsApp button
  chatMessage: {
    en: "Hi! I have a question about a repair.",
    es: "¡Hola! Tengo una pregunta sobre una reparación."
  },
  // Social profiles shown on the welcome screen. Paste the full link;
  // an empty one ("") still shows its icon but goes nowhere.
  social: {
    facebook:  "",  // TODO: e.g. "https://www.facebook.com/yourpage"
    instagram: "",  // TODO: e.g. "https://www.instagram.com/yourhandle"
    tiktok:    ""   // TODO: e.g. "https://www.tiktok.com/@yourhandle"
  },
  area: {
    en: "Serving all of Florida",
    es: "Servicio en todo Florida"
  },
  currency: "$"
};
