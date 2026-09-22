import PageClient from "../../../src/app-client/PageClient";
import ServiceDetailsLayout from "../../../src/views/services/ServiceDetailsLayout";
import SeoContent from "../../../src/views/services/SeoContent";
import WebDesignContent from "../../../src/views/services/WebDesignContent";
import { faqSchema, jsonLd, metadataFor, serviceSchema, webPageSchema } from "../../../src/seo/site";

const serviceFaqs = {
  "web-design": [
    {
      id: "panel1",
      question: "What are website redesign services?",
      answer: `<p>Website redesign services are design solutions that aim to update, modify and improve the experience of an existing website</p>
      <p>Agencies will provide redesign services to website owners to tackle current customer pain points and target digital opportunities, ultimately transforming their digital presence.</p>`,
    },
    {
      id: "panel2",
      question: "How much do website redesign services cost?",
      answer: `<p>The cost of website redesign services varies depending on the size and requirements of the project.</p>
      <p>A complete set of custom website redesign services, from design and development to website maintenance services, will cost much more than a smaller website refresh, for instance.</p>`,
    },
    {
      id: "panel3",
      question: "How can I tell if my existing website needs a web redesign?",
      answer: `<p>First impressions count. In fact, it takes just 7 seconds for a consumer to make up their mind about your product or services.</p>
      <p><strong>Do you believe that your website will win them over in these initial phases?</strong></p>
      <p>Even the slightest user experience inconvenience, such as a slow loading speed, or user interface issue, such as poor color contrasts or a lack of white space, can cause a user to bounce from your website.</p>
      <p>So, unless you are absolutely sure that your website ticks all of the consumer satisfaction boxes, it is time to invest in website redesign services.</p>`,
    },
  ],
  seo: [
    {
      id: "panel1",
      question: "What is SEO and why is it important for my business?",
      answer: `<p>SEO, or Search Engine Optimization, is the practice of improving your website's visibility on search engines like Google. It's important for your business because higher visibility means more traffic to your website, which can lead to more leads, sales, and growth. At ReBrand Gurus, we use proven SEO strategies to help your business rank higher in search results, attract more visitors, and ultimately achieve your online marketing goals.</p>`,
    },
    {
      id: "panel2",
      question: "How long does it take to see results from SEO?",
      answer: `<p>SEO is a long-term investment and results typically take time to manifest. While some improvements can be seen within the first few months, it generally takes 6 to 12 months to see significant results. This timeframe can vary depending on your industry, the competitiveness of your keywords, and the current state of your website. ReBrand Gurus focuses on sustainable, long-term growth through ethical SEO practices to ensure lasting results.</p>`,
    },
    {
      id: "panel3",
      question: "What SEO services does ReBrand Gurus offer?",
      answer: `<p>ReBrand Gurus offers a comprehensive range of SEO services to improve your website's search engine ranking and online presence. Our services include keyword research, on-page optimization, technical SEO, content creation, link building, local SEO, and analytics tracking. We tailor our strategies to meet the unique needs of your business, ensuring the most effective approach for your specific goals.</p>`,
    },
    {
      id: "panel4",
      question: "How do you measure the success of an SEO campaign?",
      answer: `<p>We measure the success of an SEO campaign using various key performance indicators (KPIs). These include organic traffic growth, keyword rankings, conversion rates, bounce rates, and the overall return on investment (ROI). At ReBrand Gurus, we provide detailed monthly reports that outline your website's performance, allowing you to see the tangible benefits of our SEO efforts. Our goal is to ensure transparency and keep you informed about the progress of your campaign.</p>`,
    },
  ],
};

const services = {
  "web-design": {
    id: "0",
    title: "Web Design",
    description:
      "Custom web design services from ReBrand Gurus for modern, conversion-focused websites.",
    content: WebDesignContent,
  },
  seo: {
    id: "1",
    title: "SEO",
    description:
      "SEO services from ReBrand Gurus for technical optimization, content, visibility, and growth.",
    content: SeoContent,
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services[slug] || services["web-design"];
  return metadataFor({
    title: service.title,
    description: service.description,
    path: `/service/${slug}`,
    type: "website",
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const service = services[slug] || services["web-design"];
  const Content = service.content;
  const path = `/service/${slug}`;
  const schemas = [
    webPageSchema({
      title: service.title,
      description: service.description,
      path,
    }),
    serviceSchema({
      name: service.title,
      description: service.description,
      path,
    }),
  ];

  if (serviceFaqs[slug]) {
    schemas.push(faqSchema({ faqs: serviceFaqs[slug], path }));
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(schemas)}
      />
      <PageClient
        component={ServiceDetailsLayout}
        id={service.id}
        variant={slug === "web-design" ? "wd" : undefined}
        showFeatured={slug !== "web-design"}
        content={<Content />}
      />
    </>
  );
}
