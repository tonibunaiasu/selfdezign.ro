import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
  robots?: string;
}

export default function SEO({ 
  title, 
  description, 
  image = '/og/default.svg',
  imageAlt,
  url,
  type = 'website',
  structuredData,
  robots
}: SEOProps) {
  const siteName = 'SelfDezign';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://selfdezign.ro';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const fullImageAlt = imageAlt || title;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }

      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', description, true);
    if (robots) {
      updateMetaTag('robots', robots, true);
      updateMetaTag('googlebot', robots, true);
    }
    updateLinkTag('canonical', fullUrl);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', fullImage);
    updateMetaTag('og:image:alt', fullImageAlt);
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteName);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', fullImage, true);
    updateMetaTag('twitter:image:alt', fullImageAlt, true);

    // Structured data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, image, url, type, structuredData, fullTitle, fullUrl, fullImage, robots]);

  return null;
}
