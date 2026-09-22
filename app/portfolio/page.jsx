import PageClient from "../../src/app-client/PageClient";
import Portfolio from "../../src/views/Portfolio";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.portfolio);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.portfolio))}
      />
      <PageClient component={Portfolio} />
    </>
  );
}
