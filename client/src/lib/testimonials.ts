import { useEffect, useState } from "react";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { resolvePayloadMediaUrl } from "@/lib/payload";

type PayloadMedia = {
  url?: string;
};

type PayloadTestimonial = {
  id?: number | string;
  name?: string | null;
  role?: {
    ro?: string | null;
    en?: string | null;
  };
  text?: {
    ro?: string | null;
    en?: string | null;
  };
  project?: {
    ro?: string | null;
    en?: string | null;
  };
  image?: PayloadMedia | null;
  imageUrl?: string | null;
  rating?: number | null;
  order?: number | null;
};

type PayloadResponse<T> = {
  docs: T[];
};

type TestimonialItem = {
  id: string | number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  project: string;
};

const CMS_BASE =
  import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";
const apiBaseUrl = `${CMS_BASE.replace(/\/+$/, "")}/api`;

const mapTestimonial = (
  item: PayloadTestimonial,
  language: "ro" | "en"
): TestimonialItem | null => {
  const role = language === "ro" ? item.role?.ro ?? "" : item.role?.en ?? "";
  const text = language === "ro" ? item.text?.ro ?? "" : item.text?.en ?? "";
  const project =
    language === "ro" ? item.project?.ro ?? "" : item.project?.en ?? "";

  if (!item.name || !text) return null;

  return {
    id: item.id ?? item.name,
    name: item.name,
    role,
    text,
    project,
    rating: item.rating ?? 5,
    image: resolvePayloadMediaUrl(item.imageUrl ?? item.image?.url ?? ""),
  };
};

const fetchTestimonials = async (language: "ro" | "en") => {
  const url = `${apiBaseUrl}/testimonials?where[_status][equals]=published&limit=200&depth=1&sort=order`;
  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) return [];
  const data = (await response.json()) as PayloadResponse<PayloadTestimonial>;
  return data.docs
    .map((item) => mapTestimonial(item, language))
    .filter((item): item is TestimonialItem => Boolean(item));
};

export const useTestimonials = (language: "ro" | "en") => {
  const [items, setItems] = useState<TestimonialItem[]>(fallbackTestimonials);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetchTestimonials(language)
      .then((cmsItems) => {
        if (!active) return;
        if (cmsItems.length === 0) {
          setItems(fallbackTestimonials);
          return;
        }
        setItems(cmsItems);
      })
      .catch(() => {
        if (!active) return;
        setItems(fallbackTestimonials);
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [language]);

  return { items, isLoading };
};
