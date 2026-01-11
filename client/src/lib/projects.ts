import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectImage } from "@/data/projects-data";
import { projects as fallbackProjects } from "@/data/projects-data";

type PayloadMedia = {
  url?: string;
  alt?: string;
};

type PayloadGalleryItem = {
  image?: PayloadMedia | string | null;
  imageUrl?: string | null;
  alt?: string | null;
};

type PayloadProofPoint = {
  point?: string | null;
};

type PayloadProject = {
  id?: number | string;
  slug: string;
  title: string;
  category: string;
  year?: string | null;
  projectStatus?: string | null;
  location?: string | null;
  photographer?: string | null;
  descriptionHtml?: string | null;
  descriptionText?: string | null;
  proofPoints?: PayloadProofPoint[] | string[] | null;
  process?: string | null;
  materials?: string | null;
  budget?: string | null;
  duration?: string | null;
  coverImage?: PayloadMedia | string | null;
  coverImageUrl?: string | null;
  coverAlt?: string | null;
  gallery?: PayloadGalleryItem[] | null;
  order?: number | null;
};

type PayloadResponse<T> = {
  docs: T[];
};

const CMS_BASE =
  import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";
const SITE_BASE = import.meta.env.VITE_SITE_URL ?? "https://selfdezign.ro";

const normalizeBase = (value: string) => value.replace(/\/+$/, "");

const cmsBaseUrl = normalizeBase(CMS_BASE);
const siteBaseUrl = normalizeBase(SITE_BASE);
const apiBaseUrl = `${cmsBaseUrl}/api`;

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const resolveUrl = (value?: string | null) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/media/")) return `${cmsBaseUrl}${value}`;
  return `${siteBaseUrl}${value}`;
};

const resolveMediaUrl = (
  media?: PayloadMedia | string | null,
  fallback?: string | null
) => {
  if (fallback) return resolveUrl(fallback);
  if (!media) return "";
  if (typeof media === "string") return resolveUrl(media);
  return resolveUrl(media.url);
};

const resolveGallery = (
  project: PayloadProject
): ProjectImage[] => {
  if (!project.gallery) return [];

  return project.gallery
    .map((item) => {
      const src = resolveMediaUrl(item.image, item.imageUrl ?? undefined);
      if (!src) return null;
      const alt =
        item.alt ??
        (typeof item.image === "object" ? item.image?.alt : null) ??
        project.title;
      return { src, alt };
    })
    .filter((item): item is ProjectImage => item !== null);
};

const mapProofPoints = (
  proofPoints?: PayloadProject["proofPoints"]
) => {
  if (!proofPoints) return undefined;
  if (Array.isArray(proofPoints)) {
    return proofPoints
      .map((item) =>
        typeof item === "string" ? item : item.point ?? ""
      )
      .filter(Boolean);
  }
  return undefined;
};

const mapProject = (project: PayloadProject): Project => {
  const descriptionHtml = project.descriptionHtml ?? "";
  const descriptionText =
    project.descriptionText ??
    (descriptionHtml ? stripHtml(descriptionHtml) : "");

  return {
    id: String(project.id ?? project.slug),
    slug: project.slug,
    title: project.title,
    category: project.category,
    categorySlug: slugify(project.category),
    year: project.year ?? "",
    status: project.projectStatus ?? "",
    location: project.location ?? "",
    photographer: project.photographer ?? undefined,
    description: descriptionText ? [descriptionText] : [],
    descriptionHtml: descriptionHtml || undefined,
    descriptionText: descriptionText || undefined,
    proofPoints: mapProofPoints(project.proofPoints),
    process: project.process ?? undefined,
    materials: project.materials ?? undefined,
    budget: project.budget ?? undefined,
    duration: project.duration ?? undefined,
    coverImage: resolveMediaUrl(project.coverImage, project.coverImageUrl),
    gallery: resolveGallery(project),
    order: project.order ?? undefined,
  };
};

const mergeProjects = (cmsProjects: Project[]) => {
  const cmsBySlug = new Map(cmsProjects.map((project) => [project.slug, project]));
  const localOrder = new Map(
    fallbackProjects.map((project, index) => [project.slug, index])
  );

  const merged = fallbackProjects.map((project) =>
    cmsBySlug.get(project.slug) ?? project
  );

  const extras = cmsProjects
    .filter((project) => !localOrder.has(project.slug))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return [...merged, ...extras];
};

const fetchProjects = async () => {
  const url = `${apiBaseUrl}/projects?where[_status][equals]=published&limit=200&depth=2&sort=order`;
  const response = await fetch(url, { credentials: "omit" });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as PayloadResponse<PayloadProject>;
  return data.docs.map(mapProject);
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchProjects()
      .then((cmsProjects) => {
        if (!active) return;
        if (cmsProjects.length === 0) {
          setProjects(fallbackProjects);
          return;
        }
        setProjects(mergeProjects(cmsProjects));
      })
      .catch(() => {
        if (!active) return;
        setProjects(fallbackProjects);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { projects, isLoading };
};

export const useProjectBySlug = (slug?: string) => {
  const { projects, isLoading } = useProjects();

  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [projects, slug]
  );

  return { project, projects, isLoading };
};
