import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.almanyayasam.de";

export default function Seo({ title, description, canonicalPath = "/" }) {
  const canonical =
    canonicalPath === "/"
      ? `${SITE_URL}/`
      : `${SITE_URL}${canonicalPath.startsWith("/") ? "" : "/"}${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
