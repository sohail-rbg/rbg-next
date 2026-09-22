export const siteUrl = "https://www.rebrandgurus.com";

export const defaultDescription =
  "ReBrand Gurus is a digital creative and branding agency specializing in SEO, social media, ORM services, web design, online products, and mobile applications.";

export const defaultKeywords = [
  "ReBrand Gurus",
  "digital branding agency",
  "web design",
  "SEO services",
  "social media marketing",
  "online reputation management",
  "Utah web design",
  "Salt Lake City SEO",
];

export const defaultOgImage = "/logo512.png";

export function metadataFor({
  title,
  description = defaultDescription,
  path = "/",
  keywords = defaultKeywords,
  image = defaultOgImage,
  type = "website",
}) {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ReBrand Gurus",
      images: [
        {
          url: image,
          width: 512,
          height: 512,
          alt: "ReBrand Gurus",
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReBrand Gurus",
  url: siteUrl,
  logo: `${siteUrl}/logo192.png`,
  email: "info@rebrandgurus.com",
  telephone: "+1-435-395-0079",
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO Box 980457",
    addressLocality: "Park City",
    addressRegion: "UT",
    postalCode: "84098",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.facebook.com/rebrandgurus",
    "https://www.instagram.com/rebrandgurus",
    "https://www.linkedin.com/company/rebrandgurus",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ReBrand Gurus",
  url: siteUrl,
  publisher: organizationSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ReBrand Gurus",
  url: siteUrl,
  image: `${siteUrl}/logo512.png`,
  logo: `${siteUrl}/logo192.png`,
  email: "info@rebrandgurus.com",
  telephone: "+1-435-395-0079",
  priceRange: "$$",
  address: organizationSchema.address,
  areaServed: [
    {
      "@type": "State",
      name: "Utah",
    },
    {
      "@type": "Country",
      name: "United States",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
    {
      "@type": "Country",
      name: "United Kingdom",
    },
  ],
  knowsAbout: [
    "Web design",
    "Search engine optimization",
    "Brand strategy",
    "Social media optimization",
    "Online reputation management",
    "AI visibility optimization",
  ],
};

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function webPageSchema({ title, description, path = "/" }) {
  const url = new URL(path, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".sectionHeading_wrp"],
    },
    publisher: {
      "@type": "Organization",
      name: organizationSchema.name,
      logo: organizationSchema.logo,
    },
  };
}

export function faqSchema({ faqs, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: new URL(path, siteUrl).toString(),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: stripHtml(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answer),
      },
    })),
  };
}

export function serviceSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: organizationSchema,
    areaServed: ["United States", "India", "United Arab Emirates"],
    url: new URL(path, siteUrl).toString(),
  };
}

export function jsonLd(schemas) {
  return {
    __html: JSON.stringify(Array.isArray(schemas) ? schemas : [schemas]),
  };
}

export const pageSeo = {
  home: {
    title:
      "Digital Branding and Creative Agency in Utah, Best Website Revamp Agency in Utah",
    description:
      "ReBrand Gurus is a leading digital creative and branding agency in Utah, specializing in SEO, social media, ORM Services, Web design, online products and mobile application.",
    path: "/",
  },
  about: {
    title: "About ReBrand Gurus",
    description:
      "Meet ReBrand Gurus, a creative digital agency helping brands grow through web design, SEO, branding, content, and digital strategy.",
    path: "/about-us",
  },
  contact: {
    title: "Contact Us for Assistance and Inquiries",
    description:
      "Contact ReBrand Gurus for web design, SEO, branding, social media, and digital marketing support.",
    path: "/contact-us",
  },
  portfolio: {
    title: "Portfolio Showcase: Explore Our Creative Works",
    description:
      "Explore ReBrand Gurus portfolio work across websites, branding, SEO, and creative digital experiences.",
    path: "/portfolio",
  },
  blog: {
    title: "Blog | ReBrandGurus",
    description:
      "Read insights from ReBrand Gurus on web design, branding, SEO, social media, and digital marketing.",
    path: "/blog",
  },
  services: {
    title: "Our Comprehensive Services: Transforming Ideas into Reality",
    description:
      "Discover our range of services for strategy, branding, web design, SEO, social media, and digital growth.",
    path: "/services",
  },
  consultation: {
    title: "Book a Consultation | ReBrand Gurus",
    description:
      "Book a consultation with ReBrand Gurus to discuss your brand, website, SEO, or digital marketing goals.",
    path: "/consultation",
  },
  pricing: {
    title: "Pricing",
    description: "Explore ReBrand Gurus pricing for SEO and digital marketing packages.",
    path: "/pricing",
  },
  newSeo: {
    title: "New SEO | AI Visibility Audit by ReBrand Gurus",
    description:
      "AI search is changing SEO. Get an AI visibility audit for ChatGPT, Gemini, Claude, Perplexity, and the platforms customers use to discover brands.",
    path: "/new-seo",
  },
  comingSoon: {
    title: "Coming Soon | ReBrand Gurus",
    description: defaultDescription,
    path: "/coming-soon",
  },
};
