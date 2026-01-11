import { useEffect, useMemo, useState } from "react";
import { blogPosts as fallbackPosts } from "@/data/blog-posts";

type PayloadMedia = {
  url?: string;
  alt?: string;
};

type PayloadTag = {
  tag?: string | null;
};

type PayloadRelatedProject = {
  slug?: string | null;
};

type PayloadAuthor = {
  name?: string | null;
  role?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  photo?: PayloadMedia | null;
};

type PayloadBlogPost = {
  id?: number | string;
  slug: string;
  title: string;
  excerpt?: string | null;
  contentHtml?: string | null;
  author?: PayloadAuthor | number | null;
  authorName?: string | null;
  authorRole?: string | null;
  authorBio?: string | null;
  authorLinkedIn?: string | null;
  authorImageUrl?: string | null;
  authorImageAlt?: string | null;
  coverImage?: PayloadMedia | string | null;
  coverImageUrl?: string | null;
  tags?: PayloadTag[] | null;
  relatedProjects?: PayloadRelatedProject[] | null;
  faqs?: { question?: string | null; answer?: string | null }[] | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

type PayloadResponse<T> = {
  docs: T[];
};

const CMS_BASE =
  import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";

const normalizeBase = (value: string) => value.replace(/\/+$/, "");
const cmsBaseUrl = normalizeBase(CMS_BASE);
const apiBaseUrl = `${cmsBaseUrl}/api`;

const resolveUrl = (value?: string | null) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/media/")) return `${cmsBaseUrl}${value}`;
  return `${cmsBaseUrl}${value}`;
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

const mapTags = (tags?: PayloadTag[] | null) =>
  tags?.map((tag) => tag.tag ?? "").filter(Boolean) ?? [];

const mapRelatedProjects = (items?: PayloadRelatedProject[] | null) =>
  items?.map((item) => item.slug ?? "").filter(Boolean) ?? [];

const mapFaqs = (
  faqs?: { question?: string | null; answer?: string | null }[] | null
) =>
  faqs?.map((faq) => ({
    question: faq.question ?? "",
    answer: faq.answer ?? "",
  })).filter((faq) => faq.question && faq.answer) ?? [];

const mapPost = (post: PayloadBlogPost) => {
  const author =
    typeof post.author === "object" && post.author ? post.author : undefined;
  const fallback = fallbackPosts.find((item) => item.slug === post.slug);
  const image = resolveMediaUrl(post.coverImage, post.coverImageUrl) || fallback?.image || "";

  return {
    id: String(post.id ?? post.slug),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? fallback?.excerpt ?? "",
    content: post.contentHtml ?? "",
    author: post.authorName ?? author?.name ?? "",
    authorRole: post.authorRole ?? author?.role ?? undefined,
    authorBio: post.authorBio ?? author?.bio ?? undefined,
    authorLinkedIn: post.authorLinkedIn ?? author?.linkedin ?? undefined,
    authorImage: resolveUrl(post.authorImageUrl ?? author?.photo?.url ?? undefined),
    authorImageAlt: post.authorImageAlt ?? author?.photo?.alt ?? undefined,
    date: post.publishedAt ?? post.createdAt ?? "",
    image,
    tags: mapTags(post.tags),
    relatedProjects: mapRelatedProjects(post.relatedProjects),
    faqs: mapFaqs(post.faqs),
  };
};

const fetchPosts = async () => {
  const url = `${apiBaseUrl}/blog-posts?where[_status][equals]=published&limit=200&depth=2&sort=-publishedAt`;
  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) return [];
  const data = (await response.json()) as PayloadResponse<PayloadBlogPost>;
  return data.docs.map(mapPost);
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useState(fallbackPosts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchPosts()
      .then((cmsPosts) => {
        if (!active) return;
        if (cmsPosts.length === 0) {
          setPosts(fallbackPosts);
          return;
        }
        setPosts(cmsPosts);
      })
      .catch(() => {
        if (!active) return;
        setPosts(fallbackPosts);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { posts, isLoading };
};

export const useBlogPostBySlug = (slug?: string) => {
  const { posts, isLoading } = useBlogPosts();
  const post = useMemo(
    () => posts.find((item) => item.slug === slug),
    [posts, slug]
  );

  return { post, posts, isLoading };
};
