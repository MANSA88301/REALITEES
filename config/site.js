/*
 * Realiteez Custom Creations — site content.
 *
 * This is the ONLY file you need to edit to change copy, collections,
 * contact info, and the order form destination. Content below comes from
 * the live Realiteez site.
 */
window.SITE = Object.freeze({
  brand: {
    name: "Realiteez Custom Creations",
    tagline: "Your idea. Your tee. Your Realiteez.",
    pitch:
      "Custom apparel with a creator-first process — personalized designs, DIY print service and original printed tees, all under one roof.",
    url: "https://realiteez-custom-creations.vercel.app",
    // Hero photo, e.g. "/assets/hero.jpg". Empty = the illustrated tee shows instead.
    heroImage: "",
    heroImageAlt: "Realiteez crew wearing custom painted tees in front of a graffiti wall",
  },

  // Leave a field empty ("") to hide it on the site.
  contact: {
    email: "",
    phone: "",
    city: "",
    instagram: "",
    tiktok: "",
    facebook: "",
  },

  // Where the order and order-status forms send requests.
  // Paste a Formspree / Basin / Getform endpoint, e.g. "https://formspree.io/f/abcdwxyz".
  // Empty = the form shows the visitor how to send the request instead.
  formEndpoint: "",

  // "Choose your lane" — the three ways to create.
  lanes: [
    {
      id: "personalized",
      anchor: "personalized",
      title: "Personalized creations",
      body: "Names, memorials, birthdays, teams, reunions and one-of-one statement pieces — built with you, not pulled from a template.",
      cta: "Start a custom design",
      orderItem: "Personalized creation",
    },
    {
      id: "diy",
      anchor: "diy",
      title: "DIY print lab",
      body: "Bring your finished artwork. Choose the garment, placement and quantity, then send it through the protected Design Vault.",
      cta: "Print my artwork",
      orderItem: "DIY print",
    },
    {
      id: "printed",
      anchor: "printed",
      title: "Printed tees",
      body: "Shop original Realiteez drops and ready-to-wear graphics with the same bold print quality as our custom work.",
      cta: "Browse printed tees",
      href: "#collections",
    },
  ],

  pinkSeason: {
    designs: ["You Are Becoming", "Heal. Love. Fly.", "She Fought. She Won. She F.L.Y."],
  },

  // "Choose it. Make it yours." feature checklist.
  checklist: [
    "Template-specific personalization",
    "Private customer photo handling",
    "Protected watermarked proofs",
    "Realistic garment preview",
    "Names, numbers, dates and colors",
    "Required-field validation",
    "Secure order summary",
    "Mobile-ready creation flow",
  ],

  // "This is the work." portfolio of real Realiteez pieces.
  // Add image: "/assets/work/<file>.jpg" to show a photo on a tile.
  portfolio: [
    { category: "Memorial & legacy", title: "Rest in Peace Dad", image: "" },
    { category: "Back-to-school custom", title: "Marcus: School Is in Session", image: "" },
    { category: "Kids first-day custom", title: "Hi, I’m Dior", image: "" },
    { category: "Personal statement piece", title: "Alpha Male", image: "" },
    { category: "Youth brand apparel", title: "Wear the Crown", image: "" },
    { category: "Cultural heritage", title: "Faith With Action", image: "" },
    { category: "Historical tribute", title: "Marcus Garvey", image: "" },
    { category: "Family & fraternity legacy", title: "Coming of Age", image: "" },
  ],

  vault: [
    { title: "Private workspace", body: "Your original files are kept apart from the public shop." },
    { title: "Order-only files", body: "Files are used only to complete your order." },
    { title: "No public gallery", body: "No public gallery or automatic sharing of customer artwork." },
  ],

  steps: [
    { title: "Choose", body: "Select a Realiteez template, DIY print service, or ready-made tee." },
    { title: "Personalize", body: "Add only the names, photos, colors and details supported by that design." },
    { title: "Approve", body: "Review and approve the exact protected proof before production." },
    { title: "Wear", body: "Receive a finished Realiteez piece made for the moment." },
  ],

  faq: [
    {
      q: "Will my sample look exactly like the selected design?",
      a: "Each sample has its own locked Realiteez style master. Your approved fields change while the template’s composition and finish remain protected.",
    },
    {
      q: "When does production begin?",
      a: "Only after payment is confirmed, you approve the current proof, Realiteez approves production and the correct production route is ready.",
    },
    {
      q: "What image quality should I upload?",
      a: "Use the clearest original JPG or transparent PNG available. 300 DPI is preferred for print.",
    },
    {
      q: "How is my photograph protected?",
      a: "Customer files stay private. Public and customer-facing proofs are reduced-resolution and watermarked; clean production artwork is never shown publicly.",
    },
  ],
});
