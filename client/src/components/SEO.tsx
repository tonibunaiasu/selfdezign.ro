import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

export default function SEO({ 
  title, 
  description, 
  image = '/images/logo_selfdezign.png',
  url,
  type = 'website',
  structuredData
}: SEOProps) {
  const siteName = 'SelfDezign';
  const fullTitle = `${title} | ${siteName}`;
  const baseUrl = 'https://selfdezign.ro';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

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

    // Basic meta tags
    updateMetaTag('description', description, true);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', fullImage);
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteName);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', fullImage, true);

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
  }, [title, description, image, url, type, structuredData, fullTitle, fullUrl, fullImage]);

  return null;
}
