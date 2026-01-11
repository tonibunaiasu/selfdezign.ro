import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTestimonials } from "@/lib/testimonials";

type TestimonialsProps = {
  title?: string;
  subtitle?: string;
};

export default function Testimonials({ title, subtitle }: TestimonialsProps) {
  const { t, language } = useLanguage();
  const { items } = useTestimonials(language);

  const testimonialTexts = {
    ro: {
      title: "Ce spun clienții noștri",
      subtitle: "Experiențe reale de la oameni care au lucrat cu SelfDezign"
    },
    en: {
      title: "What Our Clients Say",
      subtitle: "Real experiences from people who worked with SelfDezign"
    }
  };

  const texts = testimonialTexts[language as keyof typeof testimonialTexts];
  const resolvedTitle = title || texts.title;
  const resolvedSubtitle = subtitle || texts.subtitle;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            {resolvedTitle}
          </h2>
          <p className="text-lg text-gray-600">
            {resolvedSubtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-8 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-display font-bold text-black">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-accent font-semibold mt-1">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
