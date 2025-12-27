import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mediaAppearances, mediaAppearancesEN } from "@/data/media-appearances";

export default function MediaAppearances() {
  const { language } = useLanguage();
  
  const appearances = language === "ro" ? mediaAppearances : mediaAppearancesEN;

  const texts = {
    ro: {
      title: "Apariții Media",
      subtitle: "Proiectele SelfDezign sunt remarcate și apreciate de publicații de specialitate",
      awards: "Premii",
      press: "Presă",
      features: "Articole",
      readMore: "Citește articolul"
    },
    en: {
      title: "Media Appearances",
      subtitle: "SelfDezign projects are recognized and appreciated by specialized publications",
      awards: "Awards",
      press: "Press",
      features: "Features",
      readMore: "Read Article"
    }
  };

  const t = texts[language as keyof typeof texts];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "award":
        return "bg-yellow-50 border-yellow-200";
      case "press":
        return "bg-blue-50 border-blue-200";
      case "feature":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "award":
        return "bg-accent text-black";
      case "press":
        return "bg-blue-500 text-white";
      case "feature":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "award":
        return t.awards;
      case "press":
        return t.press;
      case "feature":
        return t.features;
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === "ro"
      ? date.toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.subtitle}
          </p>
        </div>

        {/* Media Appearances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appearances.map((appearance) => (
            <div
              key={appearance.id}
              className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${getCategoryColor(appearance.category)}`}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${getCategoryBadgeColor(appearance.category)}`}>
                  {getCategoryLabel(appearance.category)}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {formatDate(appearance.date)}
                </span>
              </div>

              {/* Publication */}
              <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-widest">
                {appearance.publication}
              </p>

              {/* Title */}
              <h3 className="text-lg font-display font-bold mb-3 leading-tight">
                {appearance.link && appearance.link !== "#" ? (
                  <a
                    href={appearance.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-accent transition-colors"
                  >
                    {appearance.title}
                  </a>
                ) : (
                  <span className="text-black">{appearance.title}</span>
                )}
              </h3>

              {/* Description */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {appearance.description}
              </p>

              {/* Link */}
              {appearance.link && appearance.link !== "#" && (
                <a
                  href={appearance.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors text-sm"
                >
                  {t.readMore}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
