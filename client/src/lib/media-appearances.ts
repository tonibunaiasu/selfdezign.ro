import { useEffect, useState } from "react";
import {
  mediaAppearances,
  mediaAppearancesEN,
} from "@/data/media-appearances";
import { resolvePayloadMediaUrl } from "@/lib/payload";

type PayloadMedia = {
  url?: string;
};

type PayloadMediaAppearance = {
  id?: number | string;
  title?: {
    ro?: string | null;
    en?: string | null;
  };
  publication?: string | null;
  date?: string | null;
  description?: {
    ro?: string | null;
    en?: string | null;
  };
  link?: string | null;
  image?: PayloadMedia | null;
  imageUrl?: string | null;
  category?: "award" | "press" | "feature" | null;
};

type PayloadResponse<T> = {
  docs: T[];
};

type MediaAppearanceItem = {
  id: string | number;
  title: string;
  publication: string;
  date: string;
  description: string;
  link: string;
  image?: string;
  category: "award" | "press" | "feature";
};

const CMS_BASE =
  import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";
const cmsBaseUrl = CMS_BASE.replace(/\/+$/, "");
const apiBaseUrl = `${cmsBaseUrl}/api`;

const mapAppearance = (
  item: PayloadMediaAppearance,
  language: "ro" | "en"
): MediaAppearanceItem | null => {
  const title =
    language === "ro" ? item.title?.ro ?? "" : item.title?.en ?? "";
  const description =
    language === "ro"
      ? item.description?.ro ?? ""
      : item.description?.en ?? "";

  if (!title || !description || !item.publication || !item.date) {
    return null;
  }

  return {
    id: String(item.id ?? `${item.publication}-${item.date}`),
    title,
    publication: item.publication,
    date: item.date,
    description,
    link: item.link ?? "#",
    image: resolvePayloadMediaUrl(item.imageUrl ?? item.image?.url ?? ""),
    category: item.category ?? "feature",
  };
};

const fetchAppearances = async (language: "ro" | "en") => {
  const url = `${apiBaseUrl}/media-appearances?where[_status][equals]=published&limit=200&depth=1&sort=-date`;
  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) return [];
  const data = (await response.json()) as PayloadResponse<PayloadMediaAppearance>;
  return data.docs
    .map((item) => mapAppearance(item, language))
    .filter((item): item is MediaAppearanceItem => Boolean(item));
};

export const useMediaAppearances = (language: "ro" | "en") => {
  const [items, setItems] = useState<MediaAppearanceItem[]>(
    language === "ro" ? mediaAppearances : mediaAppearancesEN
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetchAppearances(language)
      .then((cmsItems) => {
        if (!active) return;
        if (cmsItems.length === 0) {
          setItems(language === "ro" ? mediaAppearances : mediaAppearancesEN);
          return;
        }
        setItems(cmsItems);
      })
      .catch(() => {
        if (!active) return;
        setItems(language === "ro" ? mediaAppearances : mediaAppearancesEN);
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
