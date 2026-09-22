import PageClient from "../../src/app-client/PageClient";
import Consultation from "../../src/views/Consultation";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.consultation);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.consultation))}
      />
      <PageClient component={Consultation} />
    </>
  );
}
