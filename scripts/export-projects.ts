import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects } from "../client/src/data/projects-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(
  __dirname,
  "../../selfdezign-payload/src/seed/projects.json"
);

const payloadSeed = projects.map((project, index) => ({
  title: project.title,
  slug: project.slug,
  category: project.category,
  year: project.year,
  projectStatus: project.status,
  location: project.location,
  photographer: project.photographer ?? null,
  description: project.description,
  proofPoints: project.proofPoints ?? [],
  process: project.process ?? null,
  materials: project.materials ?? null,
  budget: project.budget ?? null,
  duration: project.duration ?? null,
  coverImageUrl: project.coverImage,
  coverAlt: project.title,
  gallery: project.gallery.map((image) => ({
    imageUrl: image.src,
    alt: image.alt,
  })),
  order: index + 1,
}));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(payloadSeed, null, 2));

console.log(`Exported ${payloadSeed.length} projects to ${outputPath}`);
