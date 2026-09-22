import PageClient from "../../src/app-client/PageClient";
import Contact from "../../src/views/Contact";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.contact);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.contact))}
      />
      <PageClient component={Contact} />
    </>
  );
}
