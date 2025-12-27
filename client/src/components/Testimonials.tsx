import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexandra Popescu",
    role: "Hotel Manager",
    image: "/testimonials/client-1.webp",
    rating: 5,
    text: "Irina și echipa SelfDezign au transformat complet viziunea noastră pentru hotelul nostru. Atenția la detalii și creativitatea lor au depășit toate așteptările. Clienții noștri adoră noul design!",
    project: "Hotel Bucharest Comfort Suites"
  },
  {
    id: 2,
    name: "Cristian Gheorghe",
    role: "Business Owner",
    image: "/testimonials/client-2.webp",
    rating: 5,
    text: "Colaborarea cu SelfDezign a fost o experiență excelentă. Profesionalismul și inovația lor au adus o nouă dimensiune biroului nostru. Recomand cu încredere!",
    project: "Office Space Design"
  },
  {
    id: 3,
    name: "Mirela Ionescu",
    role: "Restaurant Owner",
    image: "/testimonials/client-3.webp",
    rating: 5,
    text: "SelfDezign a creat o atmosferă magică în restaurantul nostru. Fiecare colț este o capodoperă. Clienții comentează constant despre frumusețea spațiului!",
    project: "Cafeneaua Veche 9"
  },
  {
    id: 4,
    name: "Andrei Marinescu",
    role: "Chef & Owner",
    image: "/testimonials/client-4.webp",
    rating: 5,
    text: "Designul interior al SelfDezign a ridicat experiența gastronomică la un nivel nou. Combinația perfectă între funcționalitate și estetică. Mulțumesc, Irina!",
    project: "Culinary Experience"
  }
];

export default function Testimonials() {
  const { t, language } = useLanguage();

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

  return (
    <section className="py-24 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            {texts.title}
          </h2>
          <p className="text-lg text-gray-600">
            {texts.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
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
