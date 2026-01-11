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
  aboutLayout?: {
    heroBadge?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    positioningLeftTitle?: string;
    positioningLeftBody?: string;
    positioningRightTitle?: string;
    positioningRightBody?: string;
    quoteLead?: string;
    quoteHighlight?: string;
    signatureTitle?: string;
    navOneLabel?: string;
    navOneHref?: string;
    navTwoLabel?: string;
    navTwoHref?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  homeLayout?: {
    heroTagline?: string;
    heroTitlePrefix?: string;
    heroTitleEmphasis?: string;
    heroDescription?: string;
    heroPrimaryCtaLabel?: string;
    heroPrimaryCtaHref?: string;
    heroSecondaryCtaLabel?: string;
    heroSecondaryCtaHref?: string;
    featuredProjectLabel?: string;
    featuredPrimaryCtaLabel?: string;
    featuredSecondaryCtaLabel?: string;
    featuredCaseStudies?: Array<{
      title: string;
      slug: string;
      category?: string;
      metricValue?: string;
      metricLabel?: string;
      summary?: string;
      coverImageUrl?: string;
    }>;
    awardsTitle?: string;
    awardsLogos?: Array<{
      imageUrl: string;
      alt?: string;
    }>;
    trustStats?: Array<{
      value: string;
      label: string;
    }>;
    aboutTitle?: string;
    aboutDescription1?: string;
    aboutDescription2?: string;
    aboutDescription3?: string;
    aboutImageUrl?: string;
    aboutImageAlt?: string;
    founderName?: string;
    founderRole?: string;
    learnMoreLabel?: string;
    learnMoreHref?: string;
    categoriesTitle?: string;
    categoriesCtaLabel?: string;
    categoriesCtaHref?: string;
    categories?: Array<{
      key: string;
      title: string;
      imageUrl: string;
    }>;
  };
  visionLayout?: {
    ro?: Record<string, string>;
    en?: Record<string, string>;
  };
  valuesLayout?: {
    ro?: {
      backLinkLabel?: string;
      backLinkHref?: string;
      badge?: string;
      title1?: string;
      title2?: string;
      subtitle?: string;
      valuesTitle?: string;
      valuesSubtitle?: string;
      valuesItems?: Array<{
        iconKey?: string;
        title?: string;
        subtitle?: string;
        description?: string;
        color?: string;
      }>;
      principlesTitle?: string;
      principlesSubtitle?: string;
      principlesItems?: Array<{
        number?: string;
        title?: string;
        description?: string;
      }>;
      promiseTitle?: string;
      promiseText?: string;
      promiseHighlight?: string;
      ctaTitle?: string;
      ctaText?: string;
      ctaPrimaryLabel?: string;
      ctaPrimaryHref?: string;
      ctaSecondaryLabel?: string;
      ctaSecondaryHref?: string;
      prevPageLabel?: string;
      prevPageTitle?: string;
      prevPageHref?: string;
    };
    en?: {
      backLinkLabel?: string;
      backLinkHref?: string;
      badge?: string;
      title1?: string;
      title2?: string;
      subtitle?: string;
      valuesTitle?: string;
      valuesSubtitle?: string;
      valuesItems?: Array<{
        iconKey?: string;
        title?: string;
        subtitle?: string;
        description?: string;
        color?: string;
      }>;
      principlesTitle?: string;
      principlesSubtitle?: string;
      principlesItems?: Array<{
        number?: string;
        title?: string;
        description?: string;
      }>;
      promiseTitle?: string;
      promiseText?: string;
      promiseHighlight?: string;
      ctaTitle?: string;
      ctaText?: string;
      ctaPrimaryLabel?: string;
      ctaPrimaryHref?: string;
      ctaSecondaryLabel?: string;
      ctaSecondaryHref?: string;
      prevPageLabel?: string;
      prevPageTitle?: string;
      prevPageHref?: string;
    };
  };
  teamLayout?: {
    heroTitle?: string;
    heroSubtitle?: string;
    members?: Array<{
      name?: string;
      roleRo?: string;
      roleEn?: string;
      bioRo?: string;
      bioEn?: string;
      image?: { url?: string } | number | string;
      linkedin?: string;
      email?: string;
    }>;
    joinTitle?: string;
    joinText?: string;
    joinCtaLabel?: string;
    joinCtaHref?: string;
    noteText?: string;
  };
  contactLayout?: {
    ro?: {
      heroTitle?: string;
      heroSubtitle?: string;
      infoTitle?: string;
      formTitle?: string;
      responseTime?: string;
      trustNote?: string;
      scheduleTitle?: string;
      scheduleText?: string;
      phoneTitle?: string;
      phone?: string;
      email?: string;
      whatsapp?: string;
      whatsappLabel?: string;
      addressTitle?: string;
      addresses?: Array<{
        label?: string;
        address?: string;
      }>;
    };
    en?: {
      heroTitle?: string;
      heroSubtitle?: string;
      infoTitle?: string;
      formTitle?: string;
      responseTime?: string;
      trustNote?: string;
      scheduleTitle?: string;
      scheduleText?: string;
      phoneTitle?: string;
      phone?: string;
      email?: string;
      whatsapp?: string;
      whatsappLabel?: string;
      addressTitle?: string;
      addresses?: Array<{
        label?: string;
        address?: string;
      }>;
    };
  };
  mediaLayout?: {
    ro?: {
      heroTitle?: string;
      heroSubtitle?: string;
      sectionTitle?: string;
      sectionSubtitle?: string;
      asSeenOnLabel?: string;
      readMoreLabel?: string;
      stats?: Array<{
        value?: string;
        label?: string;
      }>;
    };
    en?: {
      heroTitle?: string;
      heroSubtitle?: string;
      sectionTitle?: string;
      sectionSubtitle?: string;
      asSeenOnLabel?: string;
      readMoreLabel?: string;
      stats?: Array<{
        value?: string;
        label?: string;
      }>;
    };
  };
  updatedAt?: string;
};

function getPayloadBaseUrl() {
  const baseUrl =
    import.meta.env.VITE_PAYLOAD_URL ?? "https://cms.selfdezign.ro";
  return baseUrl.replace(/\/+$/, "");
}

function getPayloadApiBase() {
  return `${getPayloadBaseUrl()}/api`;
}

export function resolvePayloadMediaUrl(value?: string | null) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return `${getPayloadBaseUrl()}${normalized}`;
}

export async function fetchPayloadPage(slug: string) {
  const apiBase = getPayloadApiBase();
  const url = `${apiBase}/pages?where[slug][equals]=${encodeURIComponent(
    slug
  )}&limit=1&depth=1`;

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
