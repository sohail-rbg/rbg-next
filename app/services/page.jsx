import PageClient from "../../src/app-client/PageClient";
import ServicePage from "../../src/views/ServicePage";
import { jsonLd, metadataFor, pageSeo, serviceSchema, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.services);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          webPageSchema(pageSeo.services),
          serviceSchema({
            name: "Digital Marketing and Creative Services",
            description: pageSeo.services.description,
            path: pageSeo.services.path,
          }),
        ])}
      />
      <PageClient component={ServicePage} />
    </>
  );
}
