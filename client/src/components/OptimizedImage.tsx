import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  webp?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webp,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  placeholder,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E');

  useEffect(() => {
    // Check if WebP is supported
    const webpSupported = () => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    };

    const srcToLoad = webp && webpSupported() ? webp : src;
    const img = new Image();
    img.onload = () => {
      setImageSrc(srcToLoad);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // Fallback to original if WebP fails
      if (srcToLoad !== src) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          setImageSrc(src);
          setIsLoaded(true);
        };
        fallbackImg.src = src;
      } else {
        setIsLoaded(true);
      }
    };
    img.src = srcToLoad;
  }, [src, webp]);

  return (
    <picture>
      {webp && (
        <source
          srcSet={webp}
          type="image/webp"
        />
      )}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${!isLoaded ? 'opacity-50 blur-sm' : 'opacity-100 transition-opacity duration-300'}`}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
      />
    </picture>
  );
};

export default OptimizedImage;
