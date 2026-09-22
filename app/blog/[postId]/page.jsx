import PageClient from "../../../src/app-client/PageClient";
import SinglePost from "../../../src/views/blog/SinglePost";
import { jsonLd, metadataFor, siteUrl, webPageSchema } from "../../../src/seo/site";

const WORDPRESS_API = "https://wp.rebrandgurus.com/wp-json/wp/v2";
const fallbackDescription = "Read this ReBrand Gurus blog post.";

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

async function getPostSeo(postId) {
  try {
    const response = await fetch(`${WORDPRESS_API}/posts/${postId}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Post metadata request failed.");
    }

    const post = await response.json();
    const title = stripHtml(
      post.yoast_meta?.yoast_wpseo_title || post.title?.rendered || "Blog Post"
    );
    const description = stripHtml(
      post.yoast_meta?.yoast_wpseo_metadesc ||
        post.excerpt?.rendered ||
        fallbackDescription
    );

    return { title, description };
  } catch {
    return {
      title: "Blog Post",
      description: fallbackDescription,
    };
  }
}

export async function generateMetadata({ params }) {
  const { postId } = await params;
  const seo = await getPostSeo(postId);

  return metadataFor({
    title: seo.title,
    description: seo.description,
    path: `/blog/${postId}`,
    type: "article",
  });
}

export default async function Page({ params }) {
  const { postId } = await params;
  const seo = await getPostSeo(postId);
  const schema = webPageSchema({
    title: seo.title,
    description: seo.description,
    path: `/blog/${postId}`,
  });
  schema["@type"] = "BlogPosting";
  schema.mainEntityOfPage = `${siteUrl}/blog/${postId}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <PageClient component={SinglePost} />
    </>
  );
}
