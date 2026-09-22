import PageClient from "../src/app-client/PageClient";
import Page404 from "../src/views/Page404";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <PageClient component={Page404} />;
}
