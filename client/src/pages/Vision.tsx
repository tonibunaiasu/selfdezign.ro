import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Target, Eye, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import SEO from "@/components/SEO";

export default function Vision() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("vision");
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;



  return (
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      <SEO
        title={t.vision.badge}
        description={t.vision.vision.lead}
        url="/viziune"
      />
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="container relative z-10">
          <Link href={t.vision.aboutLink}>
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">
                {t.vision.backLink}
              </span>
            </a>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              {t.vision.badge}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {t.vision.title1} <br />
              <span className="text-accent">
                {t.vision.title2}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-[var(--color-brand-yellow)] flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  {t.vision.vision.title}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {t.vision.vision.subtitle}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  {t.vision.vision.lead}
                </p>
                <p>{t.vision.vision.p1}</p>
                <p>{t.vision.vision.p2}</p>
                <p>{t.vision.vision.p3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  {t.vision.mission.title}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {t.vision.mission.subtitle}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  {t.vision.mission.lead}
                </p>
                <p>{t.vision.mission.p1}</p>
                <p>{t.vision.mission.p2}</p>
                <p>{t.vision.mission.p3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-[var(--color-brand-yellow)] flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  {t.vision.purpose.title}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {t.vision.purpose.subtitle}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-white">
                  {t.vision.purpose.lead}
                </p>
                <p>{t.vision.purpose.p1}</p>
                <p>{t.vision.purpose.p2}</p>
                <p className="text-accent font-semibold">
                  {t.vision.purpose.p3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link href={t.vision.aboutLink}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {t.vision.prevPage}
                  </span>
                  <span className="font-display font-bold">
                    {t.vision.prevTitle}
                  </span>
                </div>
              </a>
            </Link>
            <Link href={t.vision.valuesLink}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {t.vision.nextPage}
                  </span>
                  <span className="font-display font-bold">
                    {t.vision.nextTitle}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
