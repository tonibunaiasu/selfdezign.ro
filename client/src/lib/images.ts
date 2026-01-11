type ResponsiveImageProps = {
  srcSet?: string;
  sizes?: string;
};

const UNSPLASH_HOST = "images.unsplash.com";

export function getResponsiveImageProps(
  src: string,
  sizes: string,
  widths: number[] = [480, 768, 1024, 1280, 1600]
): ResponsiveImageProps {
  if (!src.includes(UNSPLASH_HOST)) return {};

  const buildUrl = (width: number) => {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    return url.toString();
  };

  return {
    srcSet: widths.map((width) => `${buildUrl(width)} ${width}w`).join(", "),
    sizes,
  };
}

export function getLocalImageProps(
  src: string,
  sizes: string,
  widths: number[] = [480, 768, 1024, 1280, 1600]
): ResponsiveImageProps {
  if (!src.startsWith("/")) return {};
  const enableSrcset = import.meta.env.VITE_ENABLE_LOCAL_SRCSET === "true";
  if (!enableSrcset) return {};

  const buildUrl = (width: number) =>
    `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;

  return {
    srcSet: widths.map((width) => `${buildUrl(width)} ${width}w`).join(", "),
    sizes,
  };
}
