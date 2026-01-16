import { Link } from "wouter";
import { ArrowLeft, Heart, Users, Lightbulb, Shield, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import SEO from "@/components/SEO";



export default function Values() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("values");
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  const iconMap: Record<string, typeof Heart> = {
    heart: Heart,
    users: Users,
    lightbulb: Lightbulb,
    shield: Shield,
    leaf: Leaf,
    sparkles: Sparkles,
  };





  return (
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      <SEO
        title={t.values.badge}
        description={t.values.introLead}
        url="/valori"
      />
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        </div>
        <div className="container relative z-10">
          <Link href={t.values.aboutLink}>
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">
                {t.values.backLink}
              </span>
            </a>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              {t.values.badge}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {t.values.title1} <br />
              <span className="text-accent">
                {t.values.title2}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              {t.values.introLead}
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
              {t.values.valuesSectionTitle}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t.values.introP1}
            </p>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t.values.introP2}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: t.values.value1Title,
                description: t.values.value1Text,
                color: "bg-[var(--color-brand-yellow)]"
              },
              {
                icon: Users,
                title: t.values.value2Title,
                description: t.values.value2Text,
                color: "bg-black"
              },
              {
                icon: Lightbulb,
                title: t.values.value3Title,
                description: t.values.value3Text,
                color: "bg-[var(--color-brand-yellow)]"
              },
              {
                icon: Shield,
                title: t.values.value4Title,
                description: t.values.value4Text,
                color: "bg-black"
              },
              {
                icon: Leaf,
                title: t.values.value5Title,
                description: t.values.value5Text,
                color: "bg-[var(--color-brand-yellow)]"
              },
              {
                icon: Sparkles,
                title: t.values.value6Title,
                description: t.values.value6Text,
                color: "bg-black"
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              const colorClass = value.color;

              return (
              <div key={index} className="group p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className={`w-14 h-14 ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {IconComponent ? (
                    <IconComponent
                      className={`w-7 h-7 ${
                        colorClass === "bg-[var(--color-brand-yellow)]"
                          ? "text-black"
                          : "text-accent"
                      }`}
                    />
                  ) : null}
                </div>
                <h3 className="text-2xl font-display font-bold mb-1">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )})}
          </div>
        </div>
      </section>
      {/* Principles */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                {t.values.principlesSectionTitle}
              </h2>
              <p className="text-gray-600">
                {t.values.introP1}
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  number: t.values.principle1Number,
                  title: t.values.principle1Title,
                  description: t.values.principle1Description
                },
                {
                  number: t.values.principle2Number,
                  title: t.values.principle2Title,
                  description: t.values.principle2Description
                },
                {
                  number: t.values.principle3Number,
                  title: t.values.principle3Title,
                  description: t.values.principle3Description
                },
                {
                  number: t.values.principle4Number,
                  title: t.values.principle4Title,
                  description: t.values.principle4Description
                },
                {
                  number: t.values.principle5Number,
                  title: t.values.principle5Title,
                  description: t.values.principle5Description
                }
              ].map((principle, index) => (
                <div key={index} className="flex gap-6 p-6 bg-white border-l-4 border-accent">
                  <span className="text-4xl font-display font-bold text-accent/30">{principle.number}</span>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-8">
              {t.values.promiseLead}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {t.values.promiseP1}
            </p>
            <p className="text-2xl font-display font-bold text-accent">
              {t.values.promiseP2}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-6">
            {t.values.ctaTitle}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {t.values.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={t.values.aboutLink}>
              <Button className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                {t.nav.contact}
              </Button>
            </Link>
            <Link href={t.nav.projects}>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                {t.nav.projects}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex justify-start">
            <Link href={t.values.visionLink}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {t.values.prevPage}
                  </span>
                  <span className="font-display font-bold">
                    {t.values.prevTitle}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
