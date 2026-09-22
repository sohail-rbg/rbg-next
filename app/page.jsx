import PageClient from "../src/app-client/PageClient";
import Home from "../src/views/Home";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../src/seo/site";

export const metadata = metadataFor(pageSeo.home);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.home))}
      />
      <PageClient component={Home} />
    </>
  );
}
