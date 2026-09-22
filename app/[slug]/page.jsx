import PageClient from "../../src/app-client/PageClient";
import PageLayout from "../../src/views/PageLayout";
import { defaultDescription, jsonLd, metadataFor, siteUrl, webPageSchema } from "../../src/seo/site";

async function getHygraphPageSeo(slug) {
  const endpoint = process.env.HYGRAPH_ENDPOINT;
  const token = process.env.HYGRAPH_TOKEN;

  if (!endpoint || !token) {
    return {
      title: "ReBrand Gurus",
      description: defaultDescription,
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GetPageSeo($slug: String!) {
            page(where: { slug: $slug }) {
              title
              metaTitle
              metaDescription
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Hygraph metadata request failed.");
    }

    const data = await response.json();
    const page = data?.data?.page;

    return {
      title: page?.metaTitle || page?.title || "ReBrand Gurus",
      description: page?.metaDescription || defaultDescription,
    };
  } catch {
    return {
      title: "ReBrand Gurus",
      description: defaultDescription,
    };
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const seo = await getHygraphPageSeo(slug);

  return metadataFor({
    title: seo.title,
    description: seo.description,
    path: `/${slug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const seo = await getHygraphPageSeo(slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          webPageSchema({
            title: seo.title,
            description: seo.description,
            path: new URL(`/${slug}`, siteUrl).pathname,
          })
        )}
      />
      <PageClient component={PageLayout} />
    </>
  );
}
