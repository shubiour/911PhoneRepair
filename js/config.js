/* =========================================================
   BUSINESS SETTINGS  (edit these first)
   ========================================================= */
const CONFIG = {
  businessName: "911 Phone Repair",
  // Locations shown in the dropdown before sending. Each has its own
  // WhatsApp Business number: country code + number, digits only (1 = USA)
  // Example: (561) 555-0100  ->  "15615550100"
  locations: [
    { id: "fortMyers",      name: "Fort Myers",      whatsapp: "13052161675" },  // TODO: real Fort Myers number
    { id: "fortLauderdale", name: "Fort Lauderdale", whatsapp: "19549557572" }
  ],
  // Message pre-typed when someone taps the floating WhatsApp button
  chatMessage: {
    en: "Hi! I have a question about a repair.",
    es: "¡Hola! Tengo una pregunta sobre una reparación."
  },
  area: {
    en: "Serving all of Fort Lauderdale & Fort Myers",
    es: "Servicio en todo Fort Lauderdale y Fort Myers"
  },
  currency: "$"
};
