/* =========================================================
   BUSINESS SETTINGS  (edit these first)
   ========================================================= */
const CONFIG = {
  businessName: "911 Phone Repair",
  // Locations shown in the dropdown before sending. Each has its own
  // WhatsApp Business number: country code + number, digits only (1 = USA)
  // Example: (561) 555-0100  ->  "15615550100"
  // Each location also has its own page: /fort-myers/ and /fort-lauderdale/
  // (the page's <body data-location="..."> matches the id here).
  // lat/lng: on the main page the visitor's nearest location is picked
  // automatically (if they allow location access).
  locations: [
    
    { id: "fortLauderdale", name: "Fort Lauderdale", whatsapp: "19549557572", lat: 26.1224, lng: -80.1373,
      area: { en: "Serving Fort Lauderdale & nearby", es: "Servicio en Fort Lauderdale y alrededores" } },
    // TODO: the cities below use the Fort Lauderdale number until they have their own
    { id: "hollywood",      name: "Hollywood",       whatsapp: "19549557572", lat: 26.0112, lng: -80.1495,
      area: { en: "Serving Hollywood & nearby", es: "Servicio en Hollywood y alrededores" } },
    { id: "miami",          name: "Miami",           whatsapp: "19549557572", lat: 25.7617, lng: -80.1918,
      area: { en: "Serving Miami & nearby", es: "Servicio en Miami y alrededores" } },
    { id: "bocaRaton",      name: "Boca Raton",      whatsapp: "19549557572", lat: 26.3683, lng: -80.1289,
      area: { en: "Serving Boca Raton & nearby", es: "Servicio en Boca Raton y alrededores" } },
    { id: "pompanoBeach",   name: "Pompano Beach",   whatsapp: "19549557572", lat: 26.2379, lng: -80.1248,
      area: { en: "Serving Pompano Beach & nearby", es: "Servicio en Pompano Beach y alrededores" } },
    { id: "boyntonBeach",   name: "Boynton Beach",   whatsapp: "19549557572", lat: 26.5318, lng: -80.0905,
      area: { en: "Serving Boynton Beach & nearby", es: "Servicio en Boynton Beach y alrededores" } },
    { id: "palmBeach",      name: "Palm Beach",      whatsapp: "19549557572", lat: 26.7056, lng: -80.0364,
      area: { en: "Serving Palm Beach & nearby", es: "Servicio en Palm Beach y alrededores" } },
    { id: "hialeah",        name: "Hialeah",         whatsapp: "19549557572", lat: 25.8576, lng: -80.2781,
      area: { en: "Serving Hialeah & nearby", es: "Servicio en Hialeah y alrededores" } },
    { id: "pembrokePines",  name: "Pembroke Pines",  whatsapp: "19549557572", lat: 26.0078, lng: -80.2963,
      area: { en: "Serving Pembroke Pines & nearby", es: "Servicio en Pembroke Pines y alrededores" } },
      { id: "fortMyers",      name: "Fort Myers",      whatsapp: "13052161675", lat: 26.6406, lng: -81.8723,  // TODO: real Fort Myers number
      area: { en: "Serving Fort Myers & nearby", es: "Servicio en Fort Myers y alrededores" } }
  ],
  // Message pre-typed when someone taps the floating WhatsApp button
  chatMessage: {
    en: "Hi! I have a question about a repair.",
    es: "¡Hola! Tengo una pregunta sobre una reparación."
  },
  area: {
    en: "Serving all of Florida",
    es: "Servicio en todo Florida"
  },
  currency: "$"
};
