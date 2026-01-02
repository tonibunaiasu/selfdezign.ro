import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import Testimonials from "@/components/Testimonials";
import SEO from "@/components/SEO";
import { OptimizedImage } from "@/components/OptimizedImage";

export default function Home() {
  const { t } = useLanguage();
  
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SelfDezign",
    "url": "https://selfdezign.ro",
    "logo": "https://selfdezign.ro/images/logo_selfdezign.png",
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

  return (
    <div className="flex flex-col gap-0">
      <SEO 
        title="Acasă"
        description="SelfDezign - Studio de design interior specializat în proiecte comerciale și rezidențiale. Designul interior întâlnește natura umană."
        url="/"
        structuredData={organizationStructuredData}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.1),_transparent_70%)]"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">{t.home.tagline}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              {t.home.heroTitle1} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{t.home.heroTitle2}</span> <br/>
              {t.home.heroTitle3} <br/>
              <span className="text-accent">{t.home.heroTitle4}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed border-l-2 border-accent pl-6">
              {t.home.heroDescription}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/proiecte">
                <a className="inline-block">
                  <Button size="lg" className="bg-accent text-black hover:bg-accent/90 rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest group">
                    {t.home.discoverProjects}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </Link>
              <Link href="/contact">
                <a className="inline-block">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest">
                    {t.home.contactUs}
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full aspect-[3/4] border border-white/10 p-4">
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent"></div>
              <div className="w-full h-full bg-gray-900 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src="/projects/cafeneaua-veche/cafeneaua-veche-4.webp" 
                  alt="Cafeneaua Veche 9 - Interior Design" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <a href="/proiect/cafeneaua-veche-9" className="absolute bottom-8 left-8 z-20 cursor-pointer block hover:opacity-80 transition-opacity" onClick={(e) => { e.preventDefault(); window.location.href = '/proiect/cafeneaua-veche-9'; }}>
                  <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">{t.home.featuredProject}</p>
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">Cafeneaua Veche 9</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section - Enlarged for better visibility */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
            <div className="md:w-1/3">
              <h3 className="font-display font-bold text-3xl md:text-4xl uppercase tracking-tight">{t.home.awardsTitle}</h3>
            </div>
            <div className="md:w-2/3 flex flex-wrap items-center justify-center md:justify-end gap-10 md:gap-14">
              <img 
                src="/awards/share-architects-logo.webp" 
                alt="Share Architects" 
                className="h-14 md:h-20 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img 
                src="/awards/design-week-blue.webp" 
                alt="Design Week" 
                className="h-16 md:h-24 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img 
                src="/awards/romanian-design-week.webp" 
                alt="Romanian Design Week" 
                className="h-16 md:h-24 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img 
                src="/awards/big-see-award.webp" 
                alt="BIG SEE Interior Design Award 2024" 
                className="h-16 md:h-24 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
              <img 
                src="/awards/bienala-arhitectura.webp" 
                alt="Bienala Națională de Arhitectură 2023" 
                className="h-14 md:h-20 object-contain opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105"
              />
            </div>
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
                  src="/irina-stoica.webp" 
                  alt="Arh. Irina Stoica" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 max-w-xs hidden md:block">
                <p className="font-display font-bold text-xl mb-2">{t.home.founderName}</p>
                <p className="text-gray-400 text-sm">{t.home.founderRole}</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                {t.home.aboutTitle}
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{t.home.aboutDescription1}</p>
                <p>{t.home.aboutDescription2}</p>
                <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-black font-medium">
                  "{t.home.aboutDescription3}"
                </blockquote>
              </div>
              
              <Link href="/contact">
                <a className="inline-block">
                  <Button variant="link" className="text-black font-bold uppercase tracking-widest p-0 hover:text-accent transition-colors text-lg">
                    {t.home.learnMore} <ChevronRight className="ml-1 w-5 h-5" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Categories Preview */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              {t.projects.title}
            </h2>
            <Link href="/proiecte">
              <a className="inline-block hidden md:block">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest">
                  {t.projects.viewProject}
                </Button>
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              // Map categories to projects
              // Fixed nested anchor tags issue
              { title: t.projects.categories.restaurant, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop" },
              { title: t.projects.categories.office, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" },
              { title: t.projects.categories.hotel, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop" },
              { title: t.projects.categories.comercial, img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop" },
              { title: t.projects.categories.brandExperience, img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop" },
              { title: t.projects.categories.rezidential, img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop" }
            ].map((cat, idx) => {
              const categoryMap: Record<string, string> = {
                [t.projects.categories.restaurant]: 'Restaurant',
                [t.projects.categories.office]: 'Office',
                [t.projects.categories.hotel]: 'Hotel',
                [t.projects.categories.comercial]: 'Comercial',
                [t.projects.categories.brandExperience]: 'Brand Experience',
                [t.projects.categories.rezidential]: 'Rezidențial'
              };
              const handleCategoryClick = () => {
                const categoryKey = categoryMap[cat.title];
                window.location.href = `/proiecte?category=${encodeURIComponent(categoryKey)}`;
              };
              return (
                <div key={idx} onClick={handleCategoryClick} className="group relative aspect-[4/5] overflow-hidden block bg-gray-900 cursor-pointer">
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 group-hover:border-accent transition-colors">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">0{idx + 1}</span>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">{cat.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
