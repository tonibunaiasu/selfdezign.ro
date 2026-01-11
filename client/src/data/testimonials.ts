export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  project: string;
}

export const testimonials: Testimonial[] = [
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
