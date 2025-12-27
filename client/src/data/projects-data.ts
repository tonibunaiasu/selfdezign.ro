// Projects data with full gallery information

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  year: string;
  status: string;
  location: string;
  photographer?: string;
  description: string[];
  coverImage: string;
  gallery: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "bloom",
    slug: "bloom-specialty-coffee",
    title: "Bloom - Specialty Coffee",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2023",
    status: "proiect implementat",
    location: "Romexpo, București",
    photographer: "Stelian Popa",
    description: [
      "Oază urbană cu design modern și arome rafinate.",
      "Bloom Specialty Coffee este un concept de cafenea care îmbină designul contemporan cu atmosfera relaxantă a naturii. Spațiul a fost gândit pentru a oferi clienților o experiență completă - de la cafeaua de specialitate până la ambianța vizuală."
    ],
    coverImage: "/projects/bloom/bloom-1.webp",
    gallery: [
      { src: "/projects/bloom/bloom-1.webp", alt: "Bloom - vedere generală interior" },
      { src: "/projects/bloom/bloom-2.webp", alt: "Bloom - zona de bar" },
      { src: "/projects/bloom/bloom-3.webp", alt: "Bloom - zona de preparare cafea" },
      { src: "/projects/bloom/bloom-4.webp", alt: "Bloom - rafturi și produse" },
      { src: "/projects/bloom/bloom-5.webp", alt: "Bloom - vedere cu bar și scaune" },
      { src: "/projects/bloom/bloom-6.webp", alt: "Bloom - tejghea cu logo" },
      { src: "/projects/bloom/bloom-7.webp", alt: "Bloom - perete interactiv How do you feel" },
      { src: "/projects/bloom/bloom-8.webp", alt: "Bloom - ferestre și meniu" },
      { src: "/projects/bloom/bloom-9.webp", alt: "Bloom - bar și terasă" },
      { src: "/projects/bloom/bloom-10.webp", alt: "Bloom - vedere terasă" },
      { src: "/projects/bloom/bloom-11.webp", alt: "Bloom - cafea servită" },
      { src: "/projects/bloom/bloom-12.webp", alt: "Bloom - barista preparând cafea" }
    ]
  },
  {
    id: "cafeneaua-veche",
    slug: "cafeneaua-veche-9",
    title: "Cafeneaua Veche 9",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2022",
    status: "proiect implementat",
    location: "Bd.-ul Buzesti, București",
    photographer: "Stelian Popa",
    description: [
      "Cafeneaua Veche 9 de astăzi este Cafeneaua Veche de la 1812, pe care o frecventau Eminescu, Veronica Micle, Caragiale și Regele Carol al II-lea.",
      "Provocarea? Conservarea valorii istorice, dar în același timp necesitatea de a o face relevantă în prezent.",
      "Parterul, cu încăperi dispuse în trepte, este compus din 4 săli (restaurant & coffee shop) cu acoperiș tip boltă încrucișată și o bucătărie profesională. Sălile cu ferestrele înalte, arcuite, sunt separate de arcade al căror capăt de perspectivă este \"Copacul Vieții\" - simbol al renașterii Cafenelei.",
      "Oaspeții descoperă un loc nou cu fiecare vizită. Dimineața, în coffee shop, muncă remote în zona de canapele. La prânz, pizza la barul central. Cina, în salonul principal, discuții de afaceri în lounge-ul VIP. Seara, un spectacol de jazz în galerie."
    ],
    coverImage: "/projects/cafeneaua-veche/cafeneaua-veche-1.webp",
    gallery: [
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-1.webp", alt: "Cafeneaua Veche - bar și scaune înalte" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-2.webp", alt: "Cafeneaua Veche - canapele" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-3.webp", alt: "Cafeneaua Veche - zona verde cu bar" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-4.webp", alt: "Cafeneaua Veche - arcadă și candelabru" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-5.webp", alt: "Cafeneaua Veche - cuptor de pizza" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-6.webp", alt: "Cafeneaua Veche - bar și boltă" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-7.webp", alt: "Cafeneaua Veche - sala albastră cu candelabru circular" },
      { src: "/projects/cafeneaua-veche/cafeneaua-veche-8.webp", alt: "Cafeneaua Veche - zona de dining" }
    ]
  },
  {
    id: "zero-grade",
    slug: "zero-grade-paltinis",
    title: "Zero Grade - Pizza în Păltiniș",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2021",
    status: "proiect implementat",
    location: "Păltiniș, Sibiu",
    description: [
      "Un concept de pizzerie în inima munților, unde designul rustic întâlnește confortul modern."
    ],
    coverImage: "/projects/zero-grade-paltinis.webp",
    gallery: []
  },
  {
    id: "restaurant-poeme",
    slug: "restaurant-poeme",
    title: "Restaurant Poeme - Hotel Boutiq Mamaia",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2020",
    status: "proiect implementat",
    location: "Mamaia",
    description: [
      "Restaurant elegant într-un hotel boutique pe malul mării."
    ],
    coverImage: "/projects/restaurant-poeme-mamaia.webp",
    gallery: []
  },
  {
    id: "cafeteria-ibm",
    slug: "cafeteria-ibm",
    title: "Cafeteria IBM - Clădirea GBC",
    category: "Restaurant",
    categorySlug: "restaurant",
    year: "2019",
    status: "proiect implementat",
    location: "București",
    description: [
      "Spațiu de relaxare și socializare pentru angajații IBM din clădirea GBC."
    ],
    coverImage: "/projects/bloom/bloom-1.webp",
    gallery: []
  },
  {
    id: "global-leader-gaming",
    slug: "global-leader-gaming",
    title: "Global Leader in Live Dealer Gaming",
    category: "Office",
    categorySlug: "office",
    year: "2022",
    status: "proiect implementat",
    location: "București",
    description: [
      "Birou modern pentru o companie lider în industria gaming-ului live."
    ],
    coverImage: "/projects/office-global-leader-gaming.webp",
    gallery: []
  },
  {
    id: "prima-development",
    slug: "prima-development",
    title: "Prima Development",
    category: "Office",
    categorySlug: "office",
    year: "2021",
    status: "proiect implementat",
    location: "București",
    description: [
      "Sediu corporativ cu design elegant și funcțional."
    ],
    coverImage: "/projects/office-prima-development.webp",
    gallery: []
  },
  {
    id: "myhive",
    slug: "myhive-office",
    title: "MyHive Office",
    category: "Office",
    categorySlug: "office",
    year: "2020",
    status: "proiect implementat",
    location: "București",
    description: [
      "Spațiu de birouri flexibil în complexul MyHive."
    ],
    coverImage: "/projects/office-myhive.webp",
    gallery: []
  },
  {
    id: "bucharest-comfort",
    slug: "bucharest-comfort-suites",
    title: "Bucharest Comfort Suites",
    category: "Hotel",
    categorySlug: "hotel",
    year: "2021",
    status: "proiect implementat",
    location: "București",
    description: [
      "Hotel boutique cu camere confortabile și design contemporan."
    ],
    coverImage: "/projects/hotel-bucharest-comfort-1.webp",
    gallery: []
  },
  {
    id: "mafi-showroom",
    slug: "mafi-showroom",
    title: "Mafi Natural Wooden Floors Showroom",
    category: "Comercial",
    categorySlug: "comercial",
    year: "2020",
    status: "proiect implementat",
    location: "București",
    description: [
      "Showroom elegant pentru prezentarea pardoselilor din lemn natural Mafi."
    ],
    coverImage: "/projects/comercial-mafi-showroom.webp",
    gallery: []
  },
  {
    id: "outdoor-event",
    slug: "outdoor-event",
    title: "Eveniment Outdoor - Companie Țigarete",
    category: "Brand Experience",
    categorySlug: "brand-experience",
    year: "2019",
    status: "proiect implementat",
    location: "România",
    description: [
      "Design și amenajare pentru eveniment outdoor de brand."
    ],
    coverImage: "/projects/brand-experience-outdoor.webp",
    gallery: []
  },
  {
    id: "fmcg-branding",
    slug: "fmcg-branding",
    title: "Branding Locație - Companie FMCG",
    category: "Brand Experience",
    categorySlug: "brand-experience",
    year: "2019",
    status: "proiect implementat",
    location: "România",
    description: [
      "Concept de branding pentru locație comercială."
    ],
    coverImage: "/projects/brand-experience-fmcg.webp",
    gallery: []
  },
  {
    id: "cartier-francez",
    slug: "cartier-francez",
    title: "Locuință cu Spații Ample - Cartierul Francez",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2022",
    status: "proiect implementat",
    location: "București",
    description: [
      "Amenajare interioară pentru o locuință spațioasă în Cartierul Francez."
    ],
    coverImage: "/projects/rezidential-cartier-francez.webp",
    gallery: []
  },
  {
    id: "vila-cluj",
    slug: "vila-cluj",
    title: "Vilă P+E - Cluj Napoca",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2021",
    status: "proiect implementat",
    location: "Cluj Napoca",
    description: [
      "Design interior pentru vilă pe două nivele în Cluj Napoca."
    ],
    coverImage: "/projects/rezidential-vila-cluj.webp",
    gallery: []
  },
  {
    id: "piata-domenii",
    slug: "piata-domenii",
    title: "Vilă D+P+E - Piața Domenii",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2020",
    status: "proiect implementat",
    location: "București",
    description: [
      "Renovare și design interior pentru vilă în zona Piața Domenii."
    ],
    coverImage: "/projects/rezidential-piata-domenii.webp",
    gallery: []
  },
  {
    id: "quadra-trees",
    slug: "quadra-trees",
    title: "Quadra Trees",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2022",
    status: "proiect implementat",
    location: "București",
    description: [
      "Apartament modern în complexul rezidențial Quadra Trees."
    ],
    coverImage: "/projects/rezidential-quadra-trees.webp",
    gallery: []
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (categorySlug: string): Project[] => {
  return projects.filter(p => p.categorySlug === categorySlug);
};
