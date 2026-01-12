import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import caseStudiesData from "@/data/case-studies.json";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import { getLocalImageProps, getResponsiveImageProps } from "@/lib/images";

type CaseStudy = {
  title: string;
  slug: string;
  category: string;
  metricValue: string;
  metricLabel: string;
  summary: string;
  coverImage: string;
  draft?: boolean;
};

export default function Home() {
  const { t } = useLanguage();
  const { page } = usePayloadPage("home");
  const homeLayout = page?.homeLayout;
  const hasHomeLayout = Boolean(
    homeLayout &&
      (homeLayout.heroTitlePrefix ||
        homeLayout.heroDescription ||
        homeLayout.featuredCaseStudies?.length ||
        homeLayout.categories?.length)
  );
  const fallbackCaseStudies = useMemo(
    () =>
      (caseStudiesData.items as CaseStudy[]).filter((item) => !item.draft),
    []
  );
  const cmsCaseStudies = useMemo(() => {
    if (!homeLayout?.featuredCaseStudies?.length) return [];
    return homeLayout.featuredCaseStudies.map((item) => ({
      title: item.title,
      slug: item.slug,
      category: item.category ?? "",
      metricValue: item.metricValue ?? "",
      metricLabel: item.metricLabel ?? "",
      summary: item.summary ?? "",
      coverImage: item.coverImageUrl ?? "",
    }));
  }, [homeLayout?.featuredCaseStudies]);
  const caseStudies = cmsCaseStudies.length ? cmsCaseStudies : fallbackCaseStudies;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!caseStudies.length) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [caseStudies.length]);

  const activeCaseStudy = caseStudies[activeIndex] ?? caseStudies[0];
  
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SelfDezign",
    "url": "https://selfdezign.ro",
    "logo": "https://selfdezign.ro/images/logo_selfdezign.webp",
    "description": "Studio de design interior specializat în proiecte comerciale și rezidențiale. Designul interior întâlnește natura umană.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+40-721-528-448",
      "email": "hello@selfdezign.ro",
      "contactType": "Customer Service"
    },
    "sameAs": [
      "https://www.facebook.com/selfdezign",
      "https://www.instagram.com/selfdezign.ro",
      "https://www.linkedin.com/company/selfdezign"
    ]
  };

  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html && !hasHomeLayout ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  if (page?.renderMode === "replace" && page.html) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title={page.seoTitle ?? "Acasă"}
          description={
            page.seoDescription ??
            "SelfDezign - Studio de design interior specializat în proiecte comerciale și rezidențiale. Designul interior întâlnește natura umană."
          }
          url="/"
          structuredData={organizationStructuredData}
        />
        <section className="py-20">
          <div className="container">
            <PayloadHtml html={page.html} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0">
      {payloadMode === "prepend" ? payloadSection : null}
      <SEO 
        title={page?.seoTitle ?? "Acasă"}
        description={
          page?.seoDescription ??
          "SelfDezign - Studio de design interior specializat în proiecte comerciale și rezidențiale. Designul interior întâlnește natura umană."
        }
        url="/"
        structuredData={organizationStructuredData}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.1),_transparent_70%)]"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-brand-yellow)]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-brand-yellow)]/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1 border border-accent/30 rounded-full bg-[var(--color-brand-yellow)]/5 backdrop-blur-sm">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">
                {homeLayout?.heroTagline ?? t.home.tagline}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter">
              {homeLayout?.heroTitlePrefix ?? t.home.heroTitlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {homeLayout?.heroTitleEmphasis ?? t.home.heroTitleEmphasis}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed border-l-2 border-accent pl-6">
              {homeLayout?.heroDescription ?? t.home.heroDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={homeLayout?.heroPrimaryCtaHref ?? "/proiecte"}>
                <a className="inline-block">
                  <Button size="lg" className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest group">
                    {homeLayout?.heroPrimaryCtaLabel ?? t.home.discoverProjects}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Link>
              <Link href={homeLayout?.heroSecondaryCtaHref ?? "/contact"}>
                <a className="inline-block">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest">
                    {homeLayout?.heroSecondaryCtaLabel ?? t.home.contactUs}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          
          {activeCaseStudy && (
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative w-full aspect-[3/4] border border-white/10 p-4">
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent"></div>
                <div className="w-full h-full bg-gray-900 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10"></div>
                  <img 
                    src={activeCaseStudy.coverImage}
                    alt={activeCaseStudy.title}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    {...getLocalImageProps(activeCaseStudy.coverImage, "50vw")}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-xs uppercase tracking-[0.2em]">
                      {homeLayout?.featuredProjectLabel ?? t.home.featuredProject}
                      <span className="inline-block w-2 h-2 bg-[var(--color-brand-yellow)] rounded-full animate-pulse"></span>
                    </span>
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/70 text-white backdrop-blur-sm border border-white/10">
                      <span className="text-2xl font-display font-bold text-accent">{activeCaseStudy.metricValue}</span>
                      <span className="text-sm text-gray-300">{activeCaseStudy.metricLabel}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 space-y-4">
                    <p className="text-accent text-xs uppercase tracking-[0.2em]">{activeCaseStudy.category}</p>
                    <h3 className="text-3xl font-display font-bold text-white group-hover:text-[var(--color-brand-yellow)] transition-colors">
                      {activeCaseStudy.title}
                    </h3>
                    <p className="text-gray-300 max-w-xl leading-relaxed">{activeCaseStudy.summary}</p>
                    <div className="flex items-center gap-3 pt-2">
                      <Link href={`/proiect/${activeCaseStudy.slug}`}>
                        <a>
                          <Button className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none h-12 px-6 uppercase tracking-widest font-bold">
                            {homeLayout?.featuredPrimaryCtaLabel ?? t.projects.viewProject}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </Link>
                      <Link href="/contact">
                        <a>
                          <Button variant="ghost" className="text-white hover:text-[var(--color-brand-yellow)] hover:bg-white/10 rounded-none">
                            {homeLayout?.featuredSecondaryCtaLabel ?? t.home.contactUs}
                          </Button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  {caseStudies.map((item, idx) => (
                    <button
                      key={item.slug}
                      aria-label={`Select ${item.title}`}
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        idx === activeIndex ? "w-10 bg-[var(--color-brand-yellow)]" : "w-4 bg-white/30 hover:bg-white/60"
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-none bg-white/5 text-white border-white/20 hover:bg-white/10"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)}
                    aria-label="Previous case study"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-none bg-white/5 text-white border-white/20 hover:bg-white/10"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % caseStudies.length)}
                    aria-label="Next case study"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Awards Section - Enlarged for better visibility */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="md:w-1/3">
              <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight">
                {homeLayout?.awardsTitle ?? t.home.awardsTitle}
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-wrap items-center justify-center md:justify-end gap-10 md:gap-14">
              {(() => {
                const fallbackLogos = [
                  { imageUrl: "/awards/share-architects-logo.webp", alt: "Share Architects" },
                  { imageUrl: "/awards/design-week-blue.webp", alt: "Design Week" },
                  { imageUrl: "/awards/romanian-design-week.webp", alt: "Romanian Design Week" },
                  { imageUrl: "/awards/big-see-award.webp", alt: "BIG SEE Interior Design Award 2024" },
                  { imageUrl: "/awards/bienala-arhitectura.webp", alt: "Bienala Națională de Arhitectură 2023" },
                ];
                const cmsLogos =
                  homeLayout?.awardsLogos?.filter((logo) => logo?.imageUrl) ?? [];
                const logos = cmsLogos.length ? cmsLogos : fallbackLogos;
                return logos.map((logo, index) => (
                <img
                  key={`${logo.imageUrl}-${index}`}
                  src={logo.imageUrl}
                  alt={logo.alt || "Award logo"}
                  loading="lazy"
                  decoding="async"
                  {...getLocalImageProps(logo.imageUrl, "120px")}
                  className="h-14 md:h-20 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
                />
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(homeLayout?.trustStats?.length
              ? homeLayout.trustStats
              : [
                  { value: "10+", label: t.home.stats.awards },
                  { value: "250", label: t.home.stats.projects },
                  { value: "10,000", label: t.home.stats.area },
                  { value: "2018", label: t.home.stats.since },
                ]
            ).map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="border border-gray-200 p-6 text-center">
                <p className="text-3xl font-display font-bold text-black">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-gray-500 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                 <img 
                  src={homeLayout?.aboutImageUrl ?? "/irina-stoica.webp"} 
                  alt={homeLayout?.aboutImageAlt ?? "Arh. Irina Stoica"} 
                  loading="lazy"
                  decoding="async"
                  {...getLocalImageProps(
                    homeLayout?.aboutImageUrl ?? "/irina-stoica.webp",
                    "(max-width: 1024px) 100vw, 50vw"
                  )}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 max-w-xs hidden md:block">
                <p className="font-display font-bold text-xl mb-2">
                  {homeLayout?.founderName ?? t.home.founderName}
                </p>
                <p className="text-gray-400 text-sm">
                  {homeLayout?.founderRole ?? t.home.founderRole}
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                {homeLayout?.aboutTitle ?? t.home.aboutTitle}
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{homeLayout?.aboutDescription1 ?? t.home.aboutDescription1}</p>
                <p>{homeLayout?.aboutDescription2 ?? t.home.aboutDescription2}</p>
                <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-black font-medium">
                  "{homeLayout?.aboutDescription3 ?? t.home.aboutDescription3}"
                </blockquote>
              </div>
              
              <Link href={homeLayout?.learnMoreHref ?? "/contact"}>
                <a className="inline-block">
                  <Button variant="link" className="text-black font-bold uppercase tracking-widest p-0 hover:text-accent transition-colors text-lg">
                    {homeLayout?.learnMoreLabel ?? t.home.learnMore}{" "}
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials
        title={homeLayout?.testimonialsTitle}
        subtitle={homeLayout?.testimonialsSubtitle}
      />

      {/* Categories Preview */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              {homeLayout?.categoriesTitle ?? t.projects.title}
            </h2>
            <Link href={homeLayout?.categoriesCtaHref ?? "/proiecte"}>
              <a className="inline-block hidden md:block">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest">
                  {homeLayout?.categoriesCtaLabel ?? t.projects.viewProject}
                </Button>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {(homeLayout?.categories?.length
              ? homeLayout.categories
              : [
                  {
                    key: "Restaurant",
                    title: t.projects.categories.restaurant,
                    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
                  },
                  {
                    key: "Office",
                    title: t.projects.categories.office,
                    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
                  },
                  {
                    key: "Hotel",
                    title: t.projects.categories.hotel,
                    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
                  },
                  {
                    key: "Comercial",
                    title: t.projects.categories.comercial,
                    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop",
                  },
                  {
                    key: "Brand Experience",
                    title: t.projects.categories.brandExperience,
                    imageUrl: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop",
                  },
                  {
                    key: "Rezidențial",
                    title: t.projects.categories.rezidential,
                    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
                  },
                ]
            ).map((cat, idx) => (
              <Link key={cat.key} href={`/proiecte?category=${encodeURIComponent(cat.key)}`}>
                <a className="group relative aspect-[4/5] overflow-hidden block bg-gray-900">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    {...getResponsiveImageProps(
                      cat.imageUrl,
                      "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    )}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 group-hover:border-accent transition-colors">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {cat.title}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
