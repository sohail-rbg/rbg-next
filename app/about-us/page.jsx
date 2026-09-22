import PageClient from "../../src/app-client/PageClient";
import AboutUs from "../../src/views/AboutUs";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.about);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.about))}
      />
      <PageClient component={AboutUs} />
    </>
  );
}
