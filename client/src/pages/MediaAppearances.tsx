import { useLanguage } from "@/contexts/LanguageContext";
import MediaAppearances from "@/components/MediaAppearances";
import SEO from "@/components/SEO";

export default function MediaAppearancesPage() {
  const { t, language } = useLanguage();

  const texts = {
    ro: {
      heroTitle: "Apariții Media",
      heroSubtitle: "Proiectele noastre sunt remarcate și apreciate de publicații de specialitate din România și din străinătate"
    },
    en: {
      heroTitle: "Media Appearances",
      heroSubtitle: "Our projects are recognized and appreciated by specialized publications in Romania and abroad"
    }
  };

  const heroTexts = texts[language as keyof typeof texts];

  return (
    <div className="flex flex-col gap-0">
      <SEO
        title={heroTexts.heroTitle}
        description={heroTexts.heroSubtitle}
        url="/aparitii-media"
      />
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            {heroTexts.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {heroTexts.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Media Appearances Component */}
      <MediaAppearances />
    </div>
  );
}
