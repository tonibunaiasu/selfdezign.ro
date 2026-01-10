import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects as projectsData } from "@/data/projects-data";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import { getLocalImageProps } from "@/lib/images";

export default function Projects() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("projects");
  const [location] = useLocation();
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Read category from URL parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [location]);

  const categories = [
    { key: "all", label: t.projects.allCategories },
    { key: "Restaurant", label: t.projects.categories.restaurant },
    { key: "Office", label: t.projects.categories.office },
    { key: "Hotel", label: t.projects.categories.hotel },
    { key: "Comercial", label: t.projects.categories.comercial },
    { key: "Brand Experience", label: t.projects.categories.brandExperience },
    { key: "Rezidențial", label: t.projects.categories.rezidential }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  if (page?.renderMode === "replace" && page.html) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container">
            <PayloadHtml html={page.html} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {payloadMode === "prepend" ? payloadSection : null}
      {/* Header */}
      <div className="bg-black text-white pt-32 pb-16 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
            {t.projects.title}
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            {t.projects.subtitle}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-border py-4 overflow-x-auto">
        <div className="container flex gap-2 min-w-max px-4">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={activeCategory === cat.key ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "rounded-none uppercase tracking-widest font-bold text-xs h-10 px-6 transition-all",
                activeCategory === cat.key 
                  ? "bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 border-accent" 
                  : "border-gray-200 hover:border-black hover:text-black text-gray-500"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
            <Link key={project.id} href={`/proiect/${project.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    {...getLocalImageProps(
                      project.coverImage,
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    )}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                      {project.category}
                    </div>
                  </div>
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="absolute bottom-4 left-4 z-20 bg-black/70 text-white text-xs px-2 py-1">
                      {project.gallery.length} {language === 'ro' ? 'fotografii' : 'photos'}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{project.location} • {project.year}</p>
                {project.proofPoints && project.proofPoints.length > 0 ? (
                  <ul className="mt-4 space-y-1 text-xs uppercase tracking-widest text-gray-500">
                    {project.proofPoints.slice(0, 2).map((point) => (
                      <li key={point}>• {point}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mt-24 px-4">
        <div className="bg-black text-white p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tighter">
            {language === 'ro' ? 'Ai un proiect în minte?' : 'Have a project in mind?'}
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            {language === 'ro' 
              ? 'Hai să transformăm viziunea ta într-o realitate. Contactează-ne pentru o consultație gratuită.'
              : "Let's transform your vision into reality. Contact us for a free consultation."}
          </p>
          <Link href="/contact">
            <a>
              <Button 
                className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm"
              >
                {t.nav.bookCall}
              </Button>
            </a>
          </Link>
        </div>
      </div>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
