import { useRoute, Link } from "wouter";
import { blogPosts } from "@/data/blog-posts";
import NotFound from "@/pages/NotFound";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = match ? blogPosts.find(p => p.slug === params.slug) : null;

  // Inject JSON-LD for SEO/LLM
  useEffect(() => {
    if (post) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [post.image],
        "datePublished": post.date,
        "author": [{
            "@type": "Person",
            "name": post.author,
            "url": "https://selfdezign.ro/despre"
          }],
        "publisher": {
           "@type": "Organization",
           "name": "SelfDezign",
           "logo": {
             "@type": "ImageObject",
             "url": "https://selfdezign.ro/logo.png"
           }
        },
        "description": post.excerpt,
        "mainEntityOfPage": {
           "@type": "WebPage",
           "@id": `https://selfdezign.ro/blog/${post.slug}`
        }
      });
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      }
    }
  }, [post]);

  if (!match || !post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 p-4 pb-12">
          <div className="container">
            <Link href="/blog">
              <Button variant="outline" className="mb-8 border-white/30 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest text-xs">
                <ArrowLeft className="mr-2 w-4 h-4" /> Înapoi la Blog
              </Button>
            </Link>
            <div className="flex gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="bg-accent text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white max-w-4xl leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-200 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> {post.date}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-accent" /> {post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-16 px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section for SEO/LLM */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-display font-bold mb-8">Întrebări Frecvente (FAQ)</h3>
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-gray-50 p-8 border border-gray-100 sticky top-24">
            <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-widest">Despre Autor</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                <img src="/images/irina-stoica.jpg" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Arhitect & Designer</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Pasionată de spațiile care spun povești și de intersecția dintre natură și arhitectură.
            </p>
            <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest text-xs">
              Vezi Portofoliul
            </Button>
          </div>

          <div>
            <h3 className="font-display font-bold text-xl mb-6 uppercase tracking-widest">Share</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-none border-gray-200 hover:border-accent hover:text-accent">
                <Share2 className="w-4 h-4" />
              </Button>
              {/* Add real share buttons here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
