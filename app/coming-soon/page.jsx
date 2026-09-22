import PageClient from "../../src/app-client/PageClient";
import ComingSoon from "../../src/views/ComingSoon";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.comingSoon);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.comingSoon))}
      />
      <PageClient component={ComingSoon} />
    </>
  );
}
