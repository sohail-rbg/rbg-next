/**
 * ---------------------------------------------------------------------------
 * DRAFT EDITORIAL COPY — VINTAGE / OLD-SCHOOL HOMEPAGE
 * ---------------------------------------------------------------------------
 * Everything the homepage says lives in this one file, so the client can edit
 * the narrative without touching a single component.
 *
 * NOTE: the prose below is freshly written brand-story copy (placeholder
 * voice). Swap in client-approved facts where marked [VERIFY].
 * ---------------------------------------------------------------------------
 */

export const masthead = {
  eyebrow: "ReBrand Gurus — A Digital Atelier",
  title: "The Story Comes First",
  deck: "We are a small, stubborn studio of designers, writers and search-folk who hold that a brand is not a logo — it is a long-form argument for why you exist. Ours is set out here in five chapters.",
  imprint: [
    "Vol. I",
    "No. V",
    "Printed on the Wasatch Front",
    "Four minutes, well spent",
  ],
  ctaLabel: "Turn to Chapter One",
  ctaHref: "#chapter-one",
};

export const chapters = [
  { id: "chapter-one", numeral: "I", label: "In Which We Explain Ourselves" },
  { id: "chapter-two", numeral: "II", label: "The Particulars of the Trade" },
  { id: "chapter-three", numeral: "III", label: "Plates from the Portfolio" },
  { id: "chapter-four", numeral: "IV", label: "Letters from the Desk" },
  { id: "chapter-five", numeral: "V", label: "The Almanac" },
];

/* --------------------------------------------------------------------------
 * CHAPTER ONE — THE OPENING
 * ------------------------------------------------------------------------ */
export const opening = {
  numeral: "I",
  kicker: "Chapter One",
  title: "In Which We Explain Ourselves",
  lede: "There was a time, and not so long ago, when a business could hang a shingle and be believed. The sign was enough. Then every storefront became a screen, and every screen began to shout.",
  paragraphs: [
    "We started ReBrand Gurus for the people who were never going to win a shouting match — and should not have to. The baker on the corner. The surgeon with twenty years of steady hands. The founder who built something good in a garage and now has to explain it in nine seconds.",
    "Our work is unfashionably slow at the start. We read the old brochures. We sit in on sales calls. We ask what your first customer said yes to, and why. Only then do we draw anything, because a mark drawn before the story is known is decoration, and decoration has never saved a business.",
    "What comes out the other end is a brand that can be read: a sentence you can say out loud, a look you can recognise across a crowded feed, and a website that behaves like a good shopkeeper — answers the question, shows the goods, and does not block the door.",
  ],
  marginalia: [
    {
      heading: "A note on method",
      body: "We begin with the sentence, never the swatch. Colour is the last decision, not the first.",
    },
    {
      heading: "On restraint",
      body: "White space is not empty. It is the room in which a reader decides to trust you.",
    },
    {
      heading: "On the web",
      body: "A fast, legible page outlives every clever animation. We build for the year five, not the launch week.",
    },
  ],
  pullQuote: {
    text: "Anyone can make you louder. We would rather make you legible.",
    cite: "The house style, pinned to the wall since the beginning",
  },
  figure: {
    caption: "Fig. 1 — The view from our window. Salt Lake City, where the studio keeps its hours.",
  },
};

/* --------------------------------------------------------------------------
 * CHAPTER TWO — SERVICES
 * ------------------------------------------------------------------------ */
export const trade = {
  numeral: "II",
  kicker: "Chapter Two",
  title: "The Particulars of the Trade",
  standfirst:
    "Five disciplines, practised in one room. We take on the whole of it, or the part you are missing — and we will tell you plainly which.",
  entries: [
    {
      numeral: "I",
      title: "Brand & Identity",
      body: "Naming, marks, type and the small grammar that keeps them honest across every surface you will ever print or post.",
      href: "/services",
    },
    {
      numeral: "II",
      title: "Websites, Cut to Measure",
      body: "Design and build in sturdy modern timber — Next.js and friends. Fast to load, easy to edit, impossible to mistake for a template.",
      href: "/services",
    },
    {
      numeral: "III",
      title: "Search & Storytelling",
      body: "Search, answer-engine and generative optimisation for the way people actually look for you now — in a search box, in a chat, in a map.",
      href: "/seo-aeo-geo",
    },
    {
      numeral: "IV",
      title: "Social & Reputation",
      body: "A steady public voice, and a careful watch over what is said about you when you are not in the room.",
      href: "/services",
    },
    {
      numeral: "V",
      title: "Products & Applications",
      body: "Online products and mobile applications for founders whose idea has outgrown a spreadsheet and a landing page.",
      href: "/services",
    },
  ],
  footerNote: "Engagements are quoted by the chapter, not by the hour. See the particulars on pricing.",
  footerHref: "/pricing",
};

/* --------------------------------------------------------------------------
 * CHAPTER THREE — PORTFOLIO PLATES
 * ------------------------------------------------------------------------ */
export const plates = {
  numeral: "III",
  kicker: "Chapter Three",
  title: "Plates from the Portfolio",
  standfirst:
    "A selection of recent work, printed here as plates. Each one began as a conversation about what the business was actually for.",
  items: [
    {
      plate: "I",
      title: "Beauti Lounge",
      caption: "Identity and web for a salon that wanted calm rather than clamour.",
      href: "/portfolio",
    },
    {
      plate: "II",
      title: "Gaia Spa",
      caption: "A quieter kind of luxury — type, palette and a booking flow with no sharp edges.",
      href: "/portfolio",
    },
    {
      plate: "III",
      title: "Outer Banks",
      caption: "Coastal hospitality, rebuilt for the season when everyone books at once.",
      href: "/portfolio",
    },
    {
      plate: "IV",
      title: "Simply",
      caption: "A name, a wordmark and nine seconds of clarity for a crowded category.",
      href: "/portfolio",
    },
    {
      plate: "V",
      title: "TBT",
      caption: "Throwback campaign work — archive photography, modern typography.",
      href: "/portfolio",
    },
    {
      plate: "VI",
      title: "Yacht Life",
      caption: "Charter and membership, presented without a single stock handshake.",
      href: "/portfolio",
    },
  ],
  footerNote: "The full portfolio runs to considerably more than six plates.",
  footerHref: "/portfolio",
};

/* --------------------------------------------------------------------------
 * CHAPTER FOUR — LETTERS
 * ------------------------------------------------------------------------ */
export const letters = {
  numeral: "IV",
  kicker: "Chapter Four",
  title: "Letters from the Desk",
  standfirst:
    "We keep the correspondence. These arrived, unsolicited, from people who were kind enough to write afterwards.",
  items: [
    {
      body: "We came in asking for a website and left with a position in the market. They argued with us about the things that mattered and then got out of the way on everything else. Six months on, our enquiries are up and, more usefully, they are the right enquiries.",
      signature: "A. Whitaker",
      role: "Founder, hospitality group",
    },
    {
      body: "What struck me was the reading. They had gone through ten years of our old material before the first call, and it showed. Nothing was generic. The brand they handed back is one our own staff can recite.",
      signature: "M. Osei",
      role: "Director, healthcare practice",
    },
    {
      body: "I had been quoted three times this amount by agencies who never once asked what we sell. These people asked first, drew second, and delivered a fortnight early. I do not often recommend suppliers. I recommend them.",
      signature: "R. Delgado",
      role: "Owner, independent retail",
    },
  ],
  footnote:
    "Names and details appear with permission. [VERIFY — replace with signed-off testimonials before publication.]",
};

/* --------------------------------------------------------------------------
 * CHAPTER FIVE — THE ALMANAC
 * ------------------------------------------------------------------------ */
export const almanac = {
  numeral: "V",
  kicker: "Chapter Five",
  title: "The Almanac",
  standfirst:
    "Figures from the ledger, offered without embellishment. We would rather be measured than described.",
  items: [
    {
      number: "500",
      suffix: "+",
      label: "Projects completed",
      note: "Since the studio opened its doors.",
    },
    {
      number: "93",
      suffix: "%",
      label: "Clients who return",
      note: "Most engagements begin with a second one.",
    },
    {
      number: "5",
      suffix: "+",
      label: "Years in practice",
      note: "Long enough to have seen trends come around twice.",
    },
    {
      number: "27",
      suffix: "%",
      label: "Average ROI lift",
      note: "Measured across retained accounts. [VERIFY]",
    },
  ],
  footnote: "Figures compiled from internal records, Salt Lake City. Subject to revision each spring.",
};

/* --------------------------------------------------------------------------
 * COLOPHON — CLOSING / CALL TO ACTION
 * ------------------------------------------------------------------------ */
export const colophon = {
  title: "Begin Your Chapter",
  body: "If you have read this far, you are probably the sort of business we do our best work for. Tell us the story as it stands — the messy version will do — and we will tell you what we would do with it.",
  primaryCta: { label: "Request a consultation", href: "/consultation" },
  secondaryCta: { label: "Write to the studio", href: "/contact-us" },
  contact: {
    phone: "+1 (435)-395-0079",
    phoneHref: "tel:+14353950079",
    place: "Downtown Salt Lake City, Utah",
  },
  colophonLines: [
    "Set in Recoleta and Georgia.",
    "Typeset in the browser and printed on demand.",
    "© " + new Date().getFullYear() + " ReBrand Gurus. All rights reserved.",
  ],
};
