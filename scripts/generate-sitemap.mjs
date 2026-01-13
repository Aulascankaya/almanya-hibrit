import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// site adresin (production)
const SITE_URL = "https://almanya-hibrit.vercel.app";

// data dosyalarını oku (ESM export olduğu için dynamic import)
const salariesPath = path.join(__dirname, "..", "src", "data", "salaries.js");
const postsPath = path.join(__dirname, "..", "src", "data", "posts.js");

const { salaries } = await import(pathToFileUrl(salariesPath));
const { posts } = await import(pathToFileUrl(postsPath));

// sayfaları listele
const routes = [
  "/",
  "/blog",
  "/maas",
  "/hesaplayici",
  "/hakkinda",
  "/iletisim",
  "/gizlilik",
  ...salaries.map((s) => `/maas/${s.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
];

// xml üret
const urlsXml = routes
  .map(
    (r) => `
  <url>
    <loc>${SITE_URL}${r === "/" ? "/" : r}</loc>
  </url>`
  )
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

const distDir = path.join(__dirname, "..", "dist");
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf-8");

console.log(`✅ sitemap.xml üretildi: ${routes.length} URL`);

function pathToFileUrl(p) {
  const abs = path.resolve(p);
  return new URL(`file://${abs.replace(/\\/g, "/")}`);
}
