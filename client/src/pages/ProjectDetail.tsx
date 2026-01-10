import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects-data";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const project = getProjectBySlug(params.slug || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();

  const content = {
    ro: {
      notFound: "Proiect negăsit",
      backToProjects: "Înapoi la proiecte",
      allProjects: "Toate proiectele",
      photo: "Foto",
      aboutProject: "Despre Proiect",
      photoGallery: "Galerie Foto",
      viewImage: "Vezi imaginea",
      galleryComingSoon: "Galeria foto pentru acest proiect va fi adăugată în curând.",
      relatedProjects: "Proiecte Similare",
      ctaTitle: "Ai un proiect în minte?",
      ctaText: "Hai să discutăm despre cum putem transforma spațiul tău într-o experiență unică.",
      contactUs: "CERE O OFERTĂ"
    },
    en: {
      notFound: "Project not found",
      backToProjects: "Back to projects",
      allProjects: "All projects",
      photo: "Photo",
      aboutProject: "About the Project",
      photoGallery: "Photo Gallery",
      viewImage: "View image",
      galleryComingSoon: "The photo gallery for this project will be added soon.",
      relatedProjects: "Related Projects",
      ctaTitle: "Have a project in mind?",
      ctaText: "Let's discuss how we can transform your space into a unique experience.",
      contactUs: "REQUEST A QUOTE"
    }
  };

  const c = content[language];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{c.notFound}</h1>
          <Link href="/proiecte" className="text-accent hover:underline">
            {c.backToProjects}
          </Link>
        </div>
      </div>
    );
  }

  const hasGallery = project.gallery && project.gallery.length > 0;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  // Get related projects from same category
  const relatedProjects = projects
    .filter(p => p.categorySlug === project.categorySlug && p.id !== project.id)
    .slice(0, 3);
  
  // Structured data for project
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description.join(" "),
    "image": `https://selfdezign.ro${project.coverImage}`,
    "creator": {
      "@type": "Organization",
      "name": "SelfDezign"
    },
    "about": project.category,
    "datePublished": project.year
  };

  const galleryStructuredData = hasGallery
    ? {
        "@type": "ImageGallery",
        "name": `${project.title} - Galerie`,
        "associatedMedia": project.gallery.map((image) => ({
          "@type": "ImageObject",
          "contentUrl": `https://selfdezign.ro${image.src}`,
          "caption": image.alt,
        })),
      }
    : null;

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Acasă",
        "item": "https://selfdezign.ro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": c.allProjects,
        "item": "https://selfdezign.ro/proiecte"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://selfdezign.ro/proiect/${project.slug}`
      }
    ]
  };

  return (
    <>
      <SEO 
        title={project.title}
        description={project.description.join(" ")}
        image={project.coverImage}
        imageAlt={project.title}
        url={`/proiect/${project.slug}`}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            projectStructuredData,
            breadcrumbStructuredData,
            ...(galleryStructuredData ? [galleryStructuredData] : []),
          ],
        }}
      />
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={project.coverImage}
            alt={project.title}
            decoding="async"
            fetchpriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full container flex flex-col justify-end pb-16">
          <Link 
            href="/proiecte"
            className="absolute top-8 left-4 lg:left-8 flex items-center gap-2 text-white/80 hover:text-[var(--color-brand-yellow)] transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{c.allProjects}</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-[var(--color-brand-yellow)] text-black text-sm font-medium mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{project.location}</span>
              </div>
              {project.photographer && (
                <div className="flex items-center gap-2">
                  <Camera size={18} />
                  <span>{c.photo}: {project.photographer}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 font-display">{c.aboutProject}</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                {project.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {hasGallery ? (
        <section className="py-24 bg-gray-50">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 font-display text-center"
            >
              {c.photoGallery}
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative overflow-hidden cursor-pointer group rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium px-4 py-2 bg-black/50 rounded">
                      {c.viewImage}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-gray-50">
          <div className="container text-center">
            <p className="text-gray-500">{c.galleryComingSoon}</p>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && hasGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-10 p-2"
            >
              <ChevronRight size={48} />
            </button>
            
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={project.gallery[currentImageIndex].src}
              alt={project.gallery[currentImageIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentImageIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 font-display">{c.relatedProjects}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/proiect/${relatedProject.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden mb-4">
                        <img
                          src={relatedProject.coverImage}
                          alt={relatedProject.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{relatedProject.location}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            {c.ctaTitle}
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {c.ctaText}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[var(--color-brand-yellow)] text-black font-semibold hover:bg-[var(--color-brand-yellow)]/90 transition-colors"
          >
            {c.contactUs}
          </Link>
        </div>
      </section>
    </>
  );
}
