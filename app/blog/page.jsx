import PageClient from "../../src/app-client/PageClient";
import Blog from "../../src/views/Blog";
import { jsonLd, metadataFor, pageSeo, webPageSchema } from "../../src/seo/site";

export const metadata = metadataFor(pageSeo.blog);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(webPageSchema(pageSeo.blog))}
      />
      <PageClient component={Blog} />
    </>
  );
}
