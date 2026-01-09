import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";

export default function About() {
  const { t } = useLanguage();
  const { page } = usePayloadPage("about");
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
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 101px)`
          }}></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              {t.nav.about}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {t.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">
                {t.about.notAbout1}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{t.about.notAbout2}</p>
                <p>{t.about.notAbout3}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">
                {t.about.isAbout1}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>{t.about.isAbout2}</p>
                <p>{t.about.isAbout3}</p>
                <p className="font-semibold text-black">{t.about.isAbout4}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statement */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-4xl font-display font-bold tracking-tight leading-tight mb-8">
              „{t.about.conclusion1}
              <span className="text-accent"> {t.about.conclusion2}</span>"
            </blockquote>
            <div className="w-24 h-1 bg-[var(--color-brand-yellow)] mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Pages */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
              {t.about.signature}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/viziune">
              <a className="group block bg-white p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-accent text-sm font-bold uppercase tracking-widest">01</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                  {t.about.visionLink}
                </h3>
              </a>
            </Link>
            
            <Link href="/valori">
              <a className="group block bg-white p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-accent text-sm font-bold uppercase tracking-widest">02</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                  {t.about.valuesLink}
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container text-center">
          <Link href="/contact">
            <Button className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
              {t.nav.contact}
            </Button>
          </Link>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
