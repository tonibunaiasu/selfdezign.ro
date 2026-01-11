import { useLanguage } from "@/contexts/LanguageContext";
import MediaAppearances from "@/components/MediaAppearances";
import SEO from "@/components/SEO";
import { usePayloadPage } from "@/lib/payload";

export default function MediaAppearancesPage() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("aparitii-media");
  const cmsLayout = page?.mediaLayout?.[language];

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
  const heroTitle = cmsLayout?.heroTitle || heroTexts.heroTitle;
  const heroSubtitle = cmsLayout?.heroSubtitle || heroTexts.heroSubtitle;
  const sectionTitle = cmsLayout?.sectionTitle;
  const sectionSubtitle = cmsLayout?.sectionSubtitle;
  const asSeenOnLabel = cmsLayout?.asSeenOnLabel;
  const readMoreLabel = cmsLayout?.readMoreLabel;
  const stats = cmsLayout?.stats?.length
    ? cmsLayout.stats.map((stat) => ({
        value: stat.value || "",
        label: stat.label || "",
      }))
    : undefined;
  const seoTitle = page?.seoTitle || heroTitle;
  const seoDescription = page?.seoDescription || heroSubtitle;

  return (
    <div className="flex flex-col gap-0">
      <SEO
        title={seoTitle}
        description={seoDescription}
        url="/aparitii-media"
      />
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter mb-6">
            {heroTitle}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Media Appearances Component */}
      <MediaAppearances
        title={sectionTitle}
        subtitle={sectionSubtitle}
        asSeenOnLabel={asSeenOnLabel}
        readMoreLabel={readMoreLabel}
        stats={stats}
      />
    </div>
  );
}
