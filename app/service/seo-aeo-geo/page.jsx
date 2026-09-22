import PageClient from "../../../src/app-client/PageClient";
import SearchEvolution from "../../../src/views/SearchEvolution";
import ServiceDetailsLayout from "../../../src/views/services/ServiceDetailsLayout";
import {
  jsonLd,
  metadataFor,
  serviceSchema,
  webPageSchema,
} from "../../../src/seo/site";

const seo = {
  title: "SEO, AEO and GEO Strategy | ReBrand Gurus",
  description:
    "Understand why SEO alone is no longer enough and how AEO and GEO help your brand appear in AI answers, recommendations, and modern search experiences.",
  path: "/service/seo-aeo-geo",
  keywords: [
    "SEO AEO GEO",
    "Answer Engine Optimization",
    "Generative Engine Optimization",
    "AI search optimization",
    "SEO strategy",
    "AI visibility",
    "ReBrand Gurus",
  ],
};

export const metadata = metadataFor(seo);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          webPageSchema(seo),
          serviceSchema({
            name: "SEO, AEO and GEO Strategy",
            description: seo.description,
            path: seo.path,
          }),
        ])}
      />
      <PageClient
        component={ServiceDetailsLayout}
        id="6"
        showFeatured={false}
        contentFullBleed
        content={<SearchEvolution />}
      />
    </>
  );
}
