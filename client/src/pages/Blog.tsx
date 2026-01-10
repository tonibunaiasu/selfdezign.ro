import { Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getResponsiveImageProps } from "@/lib/images";

export default function Blog() {
  const { language, t } = useLanguage();

  const content = {
    ro: {
      title1: "JURNAL DE",
      title2: "DESIGN",
      subtitle: "Idei, tendințe și povești din culisele proiectelor noastre. O sursă de inspirație pentru spațiul tău.",
      readMore: "Citește tot"
    },
    en: {
      title1: "DESIGN",
      title2: "JOURNAL",
      subtitle: "Ideas, trends, and stories from behind the scenes of our projects. A source of inspiration for your space.",
      readMore: "Read more"
    }
  };

  const c = content[language];

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title={language === "ro" ? "Blog" : "Blog"}
        description={c.subtitle}
        url="/blog"
      />
      {/* Header */}
      <div className="bg-black text-white pt-32 pb-24 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
            {c.title1} <span className="text-accent">{c.title2}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            {c.subtitle}
          </p>
        </div>
      </div>

      <div className="container mt-12 px-4">
        <div className="border border-gray-100 bg-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              {t.blog.ctaTitle}
            </h2>
            <p className="text-gray-600">
              {t.blog.ctaText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact">
              <Button className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold text-xs px-6">
                {t.blog.ctaButton}
              </Button>
            </Link>
            <a href="https://wa.me/40721528447" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-none uppercase tracking-widest font-bold text-xs px-6">
                {t.nav.bookConsultation}
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mt-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group flex flex-col h-full border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300">
              <Link href={`/blog/${post.slug}`}>
                <a className="block relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    {...getResponsiveImageProps(
                      post.image,
                      "(max-width: 768px) 100vw, 50vw"
                    )}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`}>
                        <a className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 uppercase tracking-widest hover:text-accent transition-colors">
                          {tag}
                        </a>
                      </Link>
                    ))}
                  </div>
                </a>
              </Link>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                
                <Link href={`/blog/${post.slug}`}>
                  <a className="block">
                    <h2 className="text-2xl font-display font-bold leading-tight mb-4 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </a>
                </Link>
                
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="link" className="p-0 h-auto text-black font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                      {c.readMore} <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
