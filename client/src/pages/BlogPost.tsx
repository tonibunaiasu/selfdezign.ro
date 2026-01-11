import { useRoute, Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import NotFound from "@/pages/NotFound";
import { Calendar, User, ArrowLeft, Share2, Link as LinkIcon, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getLocalImageProps, getResponsiveImageProps } from "@/lib/images";
import { projects } from "@/data/projects-data";
import { trackEvent } from "@/lib/analytics";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = match ? blogPosts.find(p => p.slug === params.slug) : null;
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const content = {
    ro: {
      backToBlog: "Înapoi la Blog",
      faqTitle: "Întrebări Frecvente (FAQ)",
      relatedTitle: "Citește și alte articole",
      aboutAuthor: "Despre Autor",
      authorRole: "Arhitect & Designer",
      authorBio: "Pasionată de spațiile care spun povești și de intersecția dintre natură și arhitectură.",
      viewPortfolio: "Vezi Portofoliul",
      share: "Share"
    },
    en: {
      backToBlog: "Back to Blog",
      faqTitle: "Frequently Asked Questions (FAQ)",
      relatedTitle: "Read more articles",
      aboutAuthor: "About the Author",
      authorRole: "Architect & Designer",
      authorBio: "Passionate about spaces that tell stories and the intersection of nature and architecture.",
      viewPortfolio: "View Portfolio",
      share: "Share"
    }
  };

  const c = { ...content[language], ...{
    ctaTitle: t.blog.ctaTitle,
    ctaText: t.blog.ctaText,
    ctaButton: t.blog.ctaButton
  }};
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, [params?.slug]);

  const readingTime = useMemo(() => {
    if (!post?.content) return null;
    const text = post.content.replace(/<[^>]+>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [post?.content]);

  const tocItems = useMemo(() => {
    if (!post?.content) return [];
    const regex = /<(h2|h3)>(.*?)<\/\1>/gi;
    const items: { id: string; text: string; level: "h2" | "h3" }[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(post.content)) !== null) {
      const level = match[1] as "h2" | "h3";
      const text = match[2].replace(/<[^>]+>/g, "").trim();
      if (!text) continue;
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      items.push({ id, text, level });
    }
    return items;
  }, [post?.content]);

  if (!match || !post) return <NotFound />;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "author": [
      {
        "@type": "Person",
        "name": post.author,
        "url": "https://selfdezign.ro/despre",
      },
    ],
    "publisher": {
      "@type": "Organization",
      "name": "SelfDezign",
      "logo": {
        "@type": "ImageObject",
        "url": "https://selfdezign.ro/images/logo_selfdezign.png",
      },
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://selfdezign.ro/blog/${post.slug}`,
    },
  };

  const relatedProjects = post.relatedProjects
    ? projects.filter((project) => post.relatedProjects?.includes(project.slug))
    : [];

  const handleShare = async () => {
    if (!shareUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copiază linkul articolului:", shareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={`/og/blog-${post.slug}.svg`}
        imageAlt={post.title}
        url={`/blog/${post.slug}`}
        type="article"
        structuredData={structuredData}
      />
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={post.image} 
          alt={post.title}
          decoding="async"
          fetchPriority="high"
          {...getResponsiveImageProps(post.image, "100vw")}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-4 pb-12">
          <div className="container">
            <Link href="/blog">
              <Button variant="outline" className="mb-8 border-white/30 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest text-xs">
                <ArrowLeft className="mr-2 w-4 h-4" /> {c.backToBlog}
              </Button>
            </Link>
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {post.date}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-accent" /> {post.author}</span>
              {readingTime ? (
                <span className="flex items-center gap-2">{readingTime} {t.blog.readTime}</span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                  <a className="text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1 hover:text-accent transition-colors">
                    {tag}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-16 px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {tocItems.length > 0 ? (
            <div className="mb-10 border border-gray-100 bg-white p-6">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Cuprins</p>
              <ul className="space-y-2 text-sm">
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === "h3" ? "pl-4 text-gray-500" : "text-gray-800"}>
                    <a href={`#${item.id}`} className="hover:text-accent transition-colors">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <article 
            className="blog-prose"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(
                /<(h2|h3)>(.*?)<\/\1>/gi,
                (_match, level, text) => {
                  const plain = String(text).replace(/<[^>]+>/g, "").trim();
                  const id = plain
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                  return `<${level} id="${id}">${text}</${level}>`;
                }
              ),
            }}
          />

          {/* FAQ Section for SEO/LLM */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold mb-8">{c.faqTitle}</h3>
              <div className="space-y-6">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 border-l-4 border-accent">
                    <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

      {/* Related Articles for Internal Linking SEO */}
      <div className="mt-16 pt-12 border-t border-gray-200">
        <h3 className="text-2xl font-display font-bold mb-8">{c.relatedTitle}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(related => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <a className="group block">
                      <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          loading="lazy"
                          decoding="async"
                          {...getResponsiveImageProps(
                            related.image,
                            "(max-width: 768px) 100vw, 50vw"
                          )}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">{related.title}</h4>
                    </a>
                  </Link>
                ))}
            </div>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold mb-8">{t.blog.relatedProjects}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProjects.slice(0, 2).map((project) => (
                  <Link key={project.id} href={`/proiect/${project.slug}`}>
                    <a className="group block">
                      <div className="aspect-video bg-gray-100 mb-4 overflow-hidden">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          {...getLocalImageProps(
                            project.coverImage,
                            "(max-width: 768px) 100vw, 33vw"
                          )}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">{project.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{project.location} • {project.year}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-white border border-gray-100 p-6 sticky top-24">
            <h3 className="font-display font-bold text-xl mb-3">{c.ctaTitle}</h3>
            <p className="text-gray-600 text-sm mb-6">
              {c.ctaText}
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/contact">
                <Button
                  className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold text-xs"
                  onClick={() => trackEvent("cta_click", { placement: "blog_post_sidebar", label: c.ctaButton })}
                >
                  {c.ctaButton}
                </Button>
              </Link>
              <a
                href="https://wa.me/40721528447"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { placement: "blog_post_sidebar" })}
              >
                <Button variant="outline" className="rounded-none uppercase tracking-widest font-bold text-xs w-full">
                  {t.nav.bookConsultation}
                </Button>
              </a>
            </div>
          </div>

          <div className="bg-gray-50 p-8 border border-gray-100 sticky top-24">
            <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-widest">{c.aboutAuthor}</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src="/irina-stoica.webp"
                  alt="Author"
                  loading="lazy"
                  decoding="async"
                  {...getLocalImageProps("/irina-stoica.webp", "64px")}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{c.authorRole}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              {c.authorBio}
            </p>
            <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest text-xs">
              {c.viewPortfolio}
            </Button>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-widest">{c.share}</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-none border-gray-200 hover:border-accent hover:text-accent uppercase tracking-widest text-xs"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {copied ? "Link copiat" : "Share"}
              </Button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="rounded-none border-gray-200 hover:border-accent hover:text-accent uppercase tracking-widest text-xs">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="rounded-none border-gray-200 hover:border-accent hover:text-accent uppercase tracking-widest text-xs">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
              >
                <Button variant="outline" size="sm" className="rounded-none border-gray-200 hover:border-accent hover:text-accent uppercase tracking-widest text-xs">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
