import PageClient from "../../src/app-client/PageClient";
import NewSeo from "../../src/views/NewSeo";
import { jsonLd, metadataFor, pageSeo, serviceSchema, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.newSeo);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          webPageSchema(pageSeo.newSeo),
          serviceSchema({
            name: "AI Visibility Audit",
            description: pageSeo.newSeo.description,
            path: pageSeo.newSeo.path,
          }),
        ])}
      />
      <PageClient component={NewSeo} />
    </>
  );
}
