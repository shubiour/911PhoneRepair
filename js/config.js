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
    { id: "fortMyers",      name: "Fort Myers",      whatsapp: "13052161675", lat: 26.6406, lng: -81.8723,  // TODO: real Fort Myers number
      area: { en: "Serving Fort Myers & nearby", es: "Servicio en Fort Myers y alrededores" } },
    { id: "fortLauderdale", name: "Fort Lauderdale", whatsapp: "19549557572", lat: 26.1224, lng: -80.1373,
      area: { en: "Serving Fort Lauderdale & nearby", es: "Servicio en Fort Lauderdale y alrededores" } }
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
