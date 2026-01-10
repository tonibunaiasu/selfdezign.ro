import { Link, useRoute } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { getResponsiveImageProps } from "@/lib/images";

export default function BlogTag() {
  const { language, t } = useLanguage();
  const [match, params] = useRoute("/blog/tag/:tag");
  const tag = match ? decodeURIComponent(params.tag) : "";

  const filtered = blogPosts.filter((post) => post.tags.includes(tag));

  return (
    <div className="min-h-screen bg-background pb-24">
      <SEO
        title={`${t.blog.tagsTitle}: ${tag}`}
        description={t.blog.subtitle}
        url={`/blog/tag/${encodeURIComponent(tag)}`}
      />
      {/* Header */}
      <div className="bg-black text-white pt-32 pb-24 px-4">
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{t.blog.tagsTitle}</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
            {tag}
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            {t.blog.subtitle}
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mt-16 px-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">Niciun articol pentru acest tag.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {filtered.map((post) => (
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
                      {post.tags.slice(0, 2).map(tagItem => (
                        <Link key={tagItem} href={`/blog/tag/${encodeURIComponent(tagItem)}`}>
                          <a className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 uppercase tracking-widest hover:text-accent transition-colors">
                            {tagItem}
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
                        {language === "ro" ? "Citește tot" : "Read more"} <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
