import "../src/index.css";
import "../src/App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/components/css/visitbutton.css";
import "../src/components/css/offerModal.css";
import "../src/components/css/sectionHeading.css";
import "../src/components/css/scrolltop.css";
import "../src/components/css/productFaq.css";
import "../src/components/css/slick.css";
import "../src/components/css/addressCrousel.css";
import "../src/components/css/embla.css";
import "../src/components/css/roundBtn.css";
import "../src/components/css/button.css";
import "../src/components/css/pageheader.css";
import "../src/components/css/packageBox.css";
import "../src/components/css/contactPage.css";
import "../src/components/css/iconBox.css";
import "../src/components/header/intro.css";
import "../src/components/header/header.css";
import "../src/components/footer/footer.css";
import "../src/views/home/css/whychoose.css";
import "../src/views/home/css/weeklydrop.css";
import "../src/views/home/css/home.css";
import "../src/views/home/css/homeBanner.css";
import "../src/views/home/css/homeportfolio.css";
import "../src/views/home/css/howwework.css";
import "../src/views/home/css/teamsection.css";
import "../src/views/home/css/homeAbout.css";
import "../src/views/home/css/homePort.css";
import "../src/views/services/webdesign/webserviceTab.css";
import "../src/views/services/webdesign/webskills.css";
import "../src/views/services/webdesign/processwebdesign.css";
import "../src/views/services/webdesign/processtab.css";
import "../src/views/services/webdesign/beforeAfter.css";
import "../src/views/services/css/testimonial.css";
import "../src/views/services/css/servicepage.css";
import "../src/views/services/css/faqs.css";
import "../src/views/services/css/pageStucture.css";
import "../src/views/services/css/clientLogo.css";
import "../src/views/services/seo/seo.css";
import "../src/views/work/work.css";
import "../src/views/work/numberBox.css";
import "../src/views/contact/contactform.css";
import "../src/views/blog/css/singlepage.css";
import "../src/views/blog/blogItem.css";
import "../src/views/blog/css/navigation.css";
import "../src/views/blog/css/blog.css";
import "../src/views/about/css/welcomeAbout.css";
import "../src/views/about/css/videoTestimonial.css";
import "../src/views/ma/style.css";
import "../src/views/newSeo.css";
import "../src/views/searchEvolution.css";
import "../src/responsive.css";
// Website Redesign Services rebuild — loaded after responsive.css so it owns its page.
import "../src/views/services/css/webdesignPage.css";
// Enhanced slide-in menu — loaded last so it wins over the legacy menu rules.
import "../src/components/header/menu.css";
import Providers from "../src/app-client/Providers";
import {
  preloaderBootScript,
  preloaderNoScriptStyle,
} from "../src/components/preloader/preloaderBoot";
import {
  defaultDescription,
  defaultKeywords,
  defaultOgImage,
  jsonLd,
  organizationSchema,
  professionalServiceSchema,
  siteUrl,
  websiteSchema,
} from "../src/seo/site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReBrand Gurus",
    template: "%s | ReBrand Gurus",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "ReBrand Gurus",
    description: defaultDescription,
    url: siteUrl,
    siteName: "ReBrand Gurus",
    images: [
      {
        url: defaultOgImage,
        width: 512,
        height: 512,
        alt: "ReBrand Gurus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReBrand Gurus",
    description: defaultDescription,
    images: [defaultOgImage],
  },
  verification: {
    google: "Bkt5THxHCBbYiWrTlQSHITaGcZOvtnNQTynMKnjUYgY",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: locks the page behind the brand intro. */}
        <script dangerouslySetInnerHTML={{ __html: preloaderBootScript }} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: preloaderNoScriptStyle }} />
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([
            organizationSchema,
            websiteSchema,
            professionalServiceSchema,
          ])}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
