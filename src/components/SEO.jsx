import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://haseeb-codess-portfolio.netlify.app';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEO({ title, description, path = '', keywords = '' }) {
  const fullTitle = title
    ? `${title} | Haseeb Ur Rehman`
    : 'Muhammad Haseeb Ur Rehman | MERN Stack Developer Lahore';

  const fullDescription = description ||
    'Muhammad Haseeb Ur Rehman — MERN Stack Developer based in Lahore, Pakistan. Building full-stack web apps with React, Node.js, Express and MongoDB.';

  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
