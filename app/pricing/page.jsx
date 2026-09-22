import PageClient from "../../src/app-client/PageClient";
import Pricing from "../../src/views/Pricing";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.pricing);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.pricing))}
      />
      <PageClient component={Pricing} />
    </>
  );
}
