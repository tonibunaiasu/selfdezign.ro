import { useEffect, useState } from "react";

type PayloadResponse<T> = {
  docs: T[];
};

export type PayloadPage = {
  id: number | string;
  slug: string;
  title?: string;
  html?: string;
  seoTitle?: string;
  seoDescription?: string;
  renderMode?: "replace" | "prepend" | "append";
  updatedAt?: string;
};

function getPayloadApiBase() {
  const baseUrl =
    import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";
  return `${baseUrl.replace(/\/+$/, "")}/api`;
}

export async function fetchPayloadPage(slug: string) {
  const apiBase = getPayloadApiBase();
  const url = `${apiBase}/pages?where[slug][equals]=${encodeURIComponent(
    slug
  )}&limit=1`;

  const response = await fetch(url, { credentials: "omit" });
  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as PayloadResponse<PayloadPage>;
  return data.docs?.[0] ?? null;
}

export function usePayloadPage(slug: string) {
  const [page, setPage] = useState<PayloadPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    fetchPayloadPage(slug)
      .then((doc) => {
        if (!isActive) return;
        setPage(doc);
      })
      .catch(() => {
        if (!isActive) return;
        setPage(null);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [slug]);

  return { page, isLoading };
}
