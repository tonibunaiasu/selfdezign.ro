import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { blogPosts } from "../client/src/data/blog-posts";
import { projects } from "../client/src/data/projects-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://selfdezign.ro";
const PUBLIC_DIR = path.resolve(__dirname, "..", "client", "public");
const SITEMAP_PATH = path.join(PUBLIC_DIR, "sitemap.xml");

const formatDate = (date: Date) => date.toISOString().slice(0, 10);

const buildUrl = (pathName: string) => `${BASE_URL}${pathName}`;

const staticRoutes = [
  "/",
  "/proiecte",
  "/contact",
  "/blog",
  "/articole",
  "/despre",
  "/viziune",
  "/valori",
  "/echipa",
  "/aparitii-media",
];

const blogRoutes = blogPosts.map((post) => ({
  loc: buildUrl(`/blog/${post.slug}`),
  lastmod: post.date,
}));

const projectRoutes = projects.map((project) => ({
  loc: buildUrl(`/proiect/${project.slug}`),
}));

const tagSet = new Set<string>();
blogPosts.forEach((post) => {
  post.tags.forEach((tag) => tagSet.add(tag));
});

const tagRoutes = Array.from(tagSet).map((tag) => ({
  loc: buildUrl(`/blog/tag/${encodeURIComponent(tag)}`),
}));

const today = formatDate(new Date());

const urlEntries = [
  ...staticRoutes.map((route) => ({
    loc: buildUrl(route),
    lastmod: today,
  })),
  ...blogRoutes,
  ...projectRoutes.map((route) => ({
    ...route,
    lastmod: today,
  })),
  ...tagRoutes.map((route) => ({
    ...route,
    lastmod: today,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries
  .map((entry) => {
    const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : "";
    return `  <url>
    <loc>${entry.loc}</loc>
    ${lastmod}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.writeFileSync(SITEMAP_PATH, xml);

console.log(`Sitemap generated at ${SITEMAP_PATH}`);
