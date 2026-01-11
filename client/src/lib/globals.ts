import { useEffect, useState } from "react";

type PayloadGlobal<T> = T & {
  id?: number | string;
  updatedAt?: string;
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

export type SiteSettings = PayloadGlobal<{
  siteName?: string;
  logo?: { url?: string };
  logoFooter?: { url?: string };
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
    schedule?: string;
  };
  addresses?: Array<{
    label?: string;
    address?: string;
  }>;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}>;

export type NavigationGlobal = PayloadGlobal<{
  links?: Array<{
    labelRo?: string;
    labelEn?: string;
    href?: string;
  }>;
  cta?: {
    labelRo?: string;
    labelEn?: string;
    href?: string;
  };
}>;

export type FooterGlobal = PayloadGlobal<{
  description?: string;
  newsletterTitle?: string;
  newsletterText?: string;
  offices?: Array<{
    label?: string;
    address?: string;
  }>;
  copyright?: string;
}>;

async function fetchGlobal<T>(slug: string) {
  const response = await fetch(`${apiBaseUrl}/globals/${slug}`, {
    credentials: "omit",
  });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings | null>(null);
  useEffect(() => {
    let active = true;
    fetchGlobal<SiteSettings>("site-settings")
      .then((doc) => {
        if (!active) return;
        setData(doc);
      })
      .catch(() => {
        if (!active) return;
        setData(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return {
    settings: data
      ? {
          ...data,
          logoUrl: resolveUrl(data.logo?.url),
          logoFooterUrl: resolveUrl(data.logoFooter?.url),
        }
      : null,
  };
}

export function useNavigation() {
  const [data, setData] = useState<NavigationGlobal | null>(null);
  useEffect(() => {
    let active = true;
    fetchGlobal<NavigationGlobal>("navigation")
      .then((doc) => {
        if (!active) return;
        setData(doc);
      })
      .catch(() => {
        if (!active) return;
        setData(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return { navigation: data };
}

export function useFooter() {
  const [data, setData] = useState<FooterGlobal | null>(null);
  useEffect(() => {
    let active = true;
    fetchGlobal<FooterGlobal>("footer")
      .then((doc) => {
        if (!active) return;
        setData(doc);
      })
      .catch(() => {
        if (!active) return;
        setData(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return { footer: data };
}
