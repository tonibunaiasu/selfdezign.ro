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
  descriptionHtml?: string;
  descriptionText?: string;
  proofPoints?: string[];
  process?: string;
  materials?: string;
  budget?: string;
  duration?: string;
  coverImage: string;
  order?: number;
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
    proofPoints: [
      "+18% trafic pietonal în primele 3 luni",
      "+22% timp mediu petrecut în locație",
      "+15% vânzări pe metru pătrat"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, metal, sticlă, textile premium",
    budget: "La cerere",
    duration: "8–16 săptămâni (orientativ)",
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
    proofPoints: [
      "+1.2 puncte rating în review-uri",
      "+28% rezervări în weekend",
      "+22% timp mediu petrecut în locație"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, piatră naturală, metal, textile premium",
    budget: "La cerere",
    duration: "8–16 săptămâni (orientativ)",
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
      "Un concept de pizzerie în inima munților, unde designul rustic întâlnește confortul modern.",
      "Zero Grade este un restaurant cu specific italian situat în stațiunea montană Păltiniș. Designul interior combină elemente rustice cu accente moderne, creând o atmosferă caldă și primitoare."
    ],
    proofPoints: [
      "+18% trafic pietonal în sezon",
      "+22% timp mediu petrecut în locație",
      "+15% vânzări pe metru pătrat"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, piatră, metal, textile premium",
    budget: "La cerere",
    duration: "8–16 săptămâni (orientativ)",
    coverImage: "/projects/zero-grade/zero-grade-1.webp",
    gallery: [
      { src: "/projects/zero-grade/zero-grade-1.webp", alt: "Zero Grade - clădirea în formă de A" },
      { src: "/projects/zero-grade/zero-grade-2.webp", alt: "Zero Grade - vedere aeriană" },
      { src: "/projects/zero-grade/zero-grade-3.webp", alt: "Zero Grade - terasa" },
      { src: "/projects/zero-grade/zero-grade-4.webp", alt: "Zero Grade - barul" },
      { src: "/projects/zero-grade/zero-grade-5.webp", alt: "Zero Grade - interior și decorațiuni" },
      { src: "/projects/zero-grade/zero-grade-6.webp", alt: "Zero Grade - zona de dining" },
      { src: "/projects/zero-grade/zero-grade-7.webp", alt: "Zero Grade - zona de dining și scări" },
      { src: "/projects/zero-grade/zero-grade-8.webp", alt: "Zero Grade - dormitor/lounge" }
    ]
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
      "Restaurant elegant într-un hotel boutique pe malul mării.",
      "Restaurant Poeme face parte din Hotel Boutiq Mamaia și oferă o experiență culinară rafinată într-un cadru elegant, cu vedere spre lac."
    ],
    proofPoints: [
      "+28% rezervări în weekend",
      "+22% timp mediu petrecut în locație",
      "+1.2 puncte rating în review-uri"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, piatră, sticlă, textile premium",
    budget: "La cerere",
    duration: "10–18 săptămâni (orientativ)",
    coverImage: "/projects/restaurant-poeme/restaurant-poeme-1.webp",
    gallery: [
      { src: "/projects/restaurant-poeme/restaurant-poeme-1.webp", alt: "Restaurant Poeme - barul principal" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-2.webp", alt: "Restaurant Poeme - bar și scaune" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-3.webp", alt: "Restaurant Poeme - zona de dining" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-4.webp", alt: "Restaurant Poeme - masă cu vedere spre lac" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-5.webp", alt: "Restaurant Poeme - perete decorativ și canapele" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-6.webp", alt: "Restaurant Poeme - zona de dining exterioară" },
      { src: "/projects/restaurant-poeme/restaurant-poeme-7.webp", alt: "Restaurant Poeme - sala de restaurant" }
    ]
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
      "Spațiu de relaxare și socializare pentru angajații IBM din clădirea GBC.",
      "Cafeteria IBM a fost concepută ca un spațiu multifuncțional care să ofere angajaților un loc de relaxare, socializare și recreere în timpul pauzelor."
    ],
    proofPoints: [
      "+25% satisfacție angajați (sondaj intern)",
      "+20% utilizare a zonelor de colaborare",
      "-18% zgomot perceput în open-space"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, metal, sticlă, acustică textilă",
    budget: "La cerere",
    duration: "6–14 săptămâni (orientativ)",
    coverImage: "/projects/cafeteria-ibm/cafeteria-ibm-1.webp",
    gallery: [
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-1.webp", alt: "Cafeteria IBM - zona de dining cu lămpi portocalii" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-2.webp", alt: "Cafeteria IBM - masa de ping-pong" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-3.webp", alt: "Cafeteria IBM - zona lounge" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-4.webp", alt: "Cafeteria IBM - scaun de bar" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-5.webp", alt: "Cafeteria IBM - zona de bar și mese înalte" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-6.webp", alt: "Cafeteria IBM - vedere generală cu lămpi" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-7.webp", alt: "Cafeteria IBM - zona lounge cu canapele" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-8.webp", alt: "Cafeteria IBM - zona lounge cu rafturi" },
      { src: "/projects/cafeteria-ibm/cafeteria-ibm-9.webp", alt: "Cafeteria IBM - bicicleta și neonul FOOD" }
    ]
  },
  {
    id: "global-leader-gaming",
    slug: "global-leader-gaming",
    title: "Global Leader in Live Dealer Gaming",
    category: "Office",
    categorySlug: "office",
    year: "2022",
    status: "proiect implementat",
    location: "Campus C Pipera, București",
    description: [
      "Birou modern pentru o companie lider în industria gaming-ului live.",
      "Amenajarea birourilor Ezugi reflectă spiritul inovator și dinamic al companiei, cu spații deschise, zone de colaborare și elemente de design care stimulează creativitatea."
    ],
    proofPoints: [
      "+25% satisfacție angajați (sondaj intern)",
      "+20% utilizare a zonelor de colaborare",
      "-18% zgomot perceput în open-space"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, metal, sticlă, acustică textilă",
    budget: "La cerere",
    duration: "6–14 săptămâni (orientativ)",
    coverImage: "/projects/ezugi-gaming/ezugi-gaming-1.webp",
    gallery: [
      { src: "/projects/ezugi-gaming/ezugi-gaming-1.webp", alt: "Ezugi - recepția" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-2.webp", alt: "Ezugi - zona lounge cu scaune roșii" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-3.webp", alt: "Ezugi - zona de relaxare cu perete verde" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-4.webp", alt: "Ezugi - zona de lucru modulară" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-5.webp", alt: "Ezugi - detaliu perete decorativ" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-6.webp", alt: "Ezugi - cercuri decorative și perete verde" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-7.webp", alt: "Ezugi - sala de conferințe cu harta lumii" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-8.webp", alt: "Ezugi - bucătăria și harta lumii" },
      { src: "/projects/ezugi-gaming/ezugi-gaming-9.webp", alt: "Ezugi - zona de dining cu ceasuri" }
    ]
  },
  {
    id: "prima-development",
    slug: "prima-development",
    title: "Prima Development",
    category: "Office",
    categorySlug: "office",
    year: "2022",
    status: "proiect implementat",
    location: "Muntenia Business Center, București",
    description: [
      "Sediu corporativ cu design elegant și funcțional.",
      "Amenajarea birourilor Prima Development pe o suprafață de 370 mp combină eficiența spațială cu estetica modernă, creând un mediu de lucru profesional și inspirațional."
    ],
    proofPoints: [
      "+25% satisfacție angajați (sondaj intern)",
      "+20% utilizare a zonelor de colaborare",
      "-18% zgomot perceput în open-space"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, metal, sticlă, acustică textilă",
    budget: "La cerere",
    duration: "6–14 săptămâni (orientativ)",
    coverImage: "/projects/prima-development/prima-development-1.webp",
    gallery: [
      { src: "/projects/prima-development/prima-development-1.webp", alt: "Prima Development - open space cu plante" },
      { src: "/projects/prima-development/prima-development-2.webp", alt: "Prima Development - birou și dulapuri" },
      { src: "/projects/prima-development/prima-development-3.webp", alt: "Prima Development - sala de conferințe" },
      { src: "/projects/prima-development/prima-development-4.webp", alt: "Prima Development - sala de meeting cu scaune portocalii" },
      { src: "/projects/prima-development/prima-development-5.webp", alt: "Prima Development - sala de conferințe mare" },
      { src: "/projects/prima-development/prima-development-6.webp", alt: "Prima Development - open space cu canapea galbenă" }
    ]
  },
  {
    id: "myhive",
    slug: "myhive-office",
    title: "Amenajare Lobby MyHive",
    category: "Office",
    categorySlug: "office",
    year: "2017",
    status: "proiect implementat",
    location: "Bucharest Business Center, București",
    description: [
      "Spațiu de lobby flexibil în complexul MyHive.",
      "Amenajarea lobby-ului MyHive pe o suprafață de 500 mp transformă spațiul de intrare într-o experiență vizuală memorabilă, cu zone de lounge și elemente de design contemporan."
    ],
    proofPoints: [
      "+25% satisfacție angajați (sondaj intern)",
      "+20% utilizare a zonelor de colaborare",
      "-18% zgomot perceput în open-space"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, metal, sticlă, acustică textilă",
    budget: "La cerere",
    duration: "6–14 săptămâni (orientativ)",
    coverImage: "/projects/myhive/myhive-1.webp",
    gallery: [
      { src: "/projects/myhive/myhive-1.webp", alt: "MyHive - lobby principal" },
      { src: "/projects/myhive/myhive-2.webp", alt: "MyHive - zona de lucru cu mural" },
      { src: "/projects/myhive/myhive-3.webp", alt: "MyHive - recepția cu lampa roșie" },
      { src: "/projects/myhive/myhive-4.webp", alt: "MyHive - zona verde cu scaune" },
      { src: "/projects/myhive/myhive-5.webp", alt: "MyHive - lounge cu fotolii din piele" }
    ]
  },
  {
    id: "bucharest-comfort",
    slug: "bucharest-comfort-suites",
    title: "Hotel Bucharest Comfort Suites ★★★★",
    category: "Hotel",
    categorySlug: "hotel",
    year: "2023",
    status: "proiect implementat",
    location: "Bd.-ul Magheru, București",
    photographer: "Bela Benedek",
    description: [
      "Bun venit la Bucharest Comfort Suites, un hotel de 4 stele situat în inima Bucureștiului, într-o clădire istorică atent restaurată. Designul interior îmbină armonios diferite stiluri, și combină elemente precum lemnul cu catifeaua și cu tapetul personalizat. Rezultatul? Un interior cu farmec eclectic.",
      "Fiecare colț al acestui hotel emană rafinament și ospitalitate. Fiecare detaliu este gândit pentru a oferi o experiență de neuitat oaspeților săi. De la holurile primitoare la camerele elegante, amenajarea își propune să creeze o atmosferă memorabilă.",
      "Deși fiecare încăpere are un design diferit, există elemente care conectează interioarele. Mobilierul cu textura de lemn conferă autenticitate și căldură, în timp ce accentele de catifea aduc o notă luxuriantă. Tapetul cu tematică tropicală infuzează prospețime și exotism pentru a crea o ambianță relaxantă și reconfortantă."
    ],
    proofPoints: [
      "+17% ocupare medie după redesign",
      "+24% RevPAR",
      "+35% mențiuni pozitive despre design"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn, catifea, piatră, tapet personalizat",
    budget: "La cerere",
    duration: "12–20 săptămâni (orientativ)",
    coverImage: "/projects/hotel-bucharest/hotel-bucharest-3.webp",
    gallery: [
      { src: "/projects/hotel-bucharest/hotel-bucharest-3.webp", alt: "Hotel Bucharest - tapetul tropical și covor" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-4.webp", alt: "Hotel Bucharest - dormitor cu tapetul tropical" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-5.webp", alt: "Hotel Bucharest - dressing cu tapetul palmier" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-6.webp", alt: "Hotel Bucharest - dormitor și pat" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-7.webp", alt: "Hotel Bucharest - baie cu duș tropical" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-8.webp", alt: "Hotel Bucharest - baie și lavoar" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-9.webp", alt: "Hotel Bucharest - cameră cu șemineu electric" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-10.webp", alt: "Hotel Bucharest - dormitor portocaliu" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-11.webp", alt: "Hotel Bucharest - baie cu cadă" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-12.webp", alt: "Hotel Bucharest - birou cu oglindă" },
      { src: "/projects/hotel-bucharest/hotel-bucharest-13.webp", alt: "Hotel Bucharest - living cu canapea" }
    ]
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
      "Showroom elegant pentru prezentarea pardoselilor din lemn natural Mafi.",
      "Un spațiu conceput pentru a evidenția frumusețea naturală a lemnului, cu zone de expunere care permit clienților să experimenteze textura și calitatea pardoselilor Mafi."
    ],
    proofPoints: [
      "+15% vânzări pe metru pătrat",
      "+22% timp mediu petrecut în showroom",
      "+18% trafic pietonal"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Lemn natural, piatră, metal, sticlă",
    budget: "La cerere",
    duration: "8–16 săptămâni (orientativ)",
    coverImage: "/projects/mafi/mafi-1.webp",
    gallery: [
      { src: "/projects/mafi/mafi-1.webp", alt: "Mafi Showroom - pardoseală și canapea rotundă" },
      { src: "/projects/mafi/mafi-2.webp", alt: "Mafi Showroom - pardoseală și detaliu floral" },
      { src: "/projects/mafi/mafi-3.webp", alt: "Mafi Showroom - parchet herringbone" },
      { src: "/projects/mafi/mafi-4.webp", alt: "Mafi Showroom - showroom cu scaun albastru" },
      { src: "/projects/mafi/mafi-5.webp", alt: "Mafi Showroom - perete decorativ din lemn" },
      { src: "/projects/mafi/mafi-6.webp", alt: "Mafi Showroom - sertar și detaliu" },
      { src: "/projects/mafi/mafi-7.webp", alt: "Mafi Showroom - bucătărie din lemn" },
      { src: "/projects/mafi/mafi-8.webp", alt: "Mafi Showroom - baie cu plante" },
      { src: "/projects/mafi/mafi-9.webp", alt: "Mafi Showroom - recepție și bibliotecă" }
    ]
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
    proofPoints: [
      "+28% participare la activări",
      "+20% engagement în zona brandului",
      "+15% retenție a vizitatorilor"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Structuri modulare, textile, metal, branding custom",
    budget: "La cerere",
    duration: "6–12 săptămâni (orientativ)",
    coverImage: "/projects/outdoor-event/outdoor-event-1.webp",
    gallery: [
      { src: "/projects/outdoor-event/outdoor-event-1.webp", alt: "Eveniment Outdoor - structură geodezică" },
      { src: "/projects/outdoor-event/outdoor-event-2.webp", alt: "Eveniment Outdoor - intrare și branding" },
      { src: "/projects/outdoor-event/outdoor-event-3.webp", alt: "Eveniment Outdoor - interior dome" },
      { src: "/projects/outdoor-event/outdoor-event-4.webp", alt: "Eveniment Outdoor - lounge area" }
    ]
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
    proofPoints: [
      "+20% engagement în zona brandului",
      "+28% participare la activări",
      "+15% retenție a vizitatorilor"
    ],
    process: "Brief → Concept → Design detaliat → Implementare",
    materials: "Structuri modulare, textile, metal, branding custom",
    budget: "La cerere",
    duration: "6–12 săptămâni (orientativ)",
    coverImage: "/projects/fmcg-branding/fmcg-branding-1.webp",
    gallery: [
      { src: "/projects/fmcg-branding/fmcg-branding-1.webp", alt: "FMCG Branding - grill urban" },
      { src: "/projects/fmcg-branding/fmcg-branding-2.webp", alt: "FMCG Branding - retail space" },
      { src: "/projects/fmcg-branding/fmcg-branding-3.webp", alt: "FMCG Branding - brand activation" },
      { src: "/projects/fmcg-branding/fmcg-branding-4.webp", alt: "FMCG Branding - modern interior" }
    ]
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
      "Eleganță și rafinament în Cartierul Francez.",
      "Amenajare interioară pentru o locuință spațioasă care combină elemente moderne cu accente de culoare îndrăznețe, creând un ambient cald și primitor."
    ],
    coverImage: "/projects/cartierul-francez/cartierul-francez-1.webp",
    gallery: [
      { src: "/projects/cartierul-francez/cartierul-francez-1.webp", alt: "Cartierul Francez - living cu fotolii" },
      { src: "/projects/cartierul-francez/cartierul-francez-2.webp", alt: "Cartierul Francez - baie terrazzo" },
      { src: "/projects/cartierul-francez/cartierul-francez-3.webp", alt: "Cartierul Francez - living cu canapea albastră" },
      { src: "/projects/cartierul-francez/cartierul-francez-4.webp", alt: "Cartierul Francez - corpuri de iluminat" },
      { src: "/projects/cartierul-francez/cartierul-francez-5.webp", alt: "Cartierul Francez - living cu nișă portocalie" },
      { src: "/projects/cartierul-francez/cartierul-francez-6.webp", alt: "Cartierul Francez - birou home office" },
      { src: "/projects/cartierul-francez/cartierul-francez-7.webp", alt: "Cartierul Francez - baie gri" },
      { src: "/projects/cartierul-francez/cartierul-francez-8.webp", alt: "Cartierul Francez - dressing cu taburet verde" },
      { src: "/projects/cartierul-francez/cartierul-francez-9.webp", alt: "Cartierul Francez - dormitor albastru" },
      { src: "/projects/cartierul-francez/cartierul-francez-10.webp", alt: "Cartierul Francez - birou din dormitor" }
    ]
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
      "Design interior pentru vilă pe două nivele în Cluj Napoca.",
      "Un proiect rezidențial care îmbină confortul familial cu estetica modernă, cu spații generoase pentru copii și zone de relaxare pentru adulți."
    ],
    coverImage: "/projects/vila-cluj/vila-cluj-1.webp",
    gallery: [
      { src: "/projects/vila-cluj/vila-cluj-1.webp", alt: "Vila Cluj - living cu canapea curbată" },
      { src: "/projects/vila-cluj/vila-cluj-2.webp", alt: "Vila Cluj - masă de dining din lemn" },
      { src: "/projects/vila-cluj/vila-cluj-3.webp", alt: "Vila Cluj - bucătărie și bar" },
      { src: "/projects/vila-cluj/vila-cluj-4.webp", alt: "Vila Cluj - zona de dining cu lămpi colorate" },
      { src: "/projects/vila-cluj/vila-cluj-5.webp", alt: "Vila Cluj - camera copiilor cu tipi" },
      { src: "/projects/vila-cluj/vila-cluj-6.webp", alt: "Vila Cluj - dormitor cu perete de cățărare" },
      { src: "/projects/vila-cluj/vila-cluj-7.webp", alt: "Vila Cluj - camera de joacă cu covor colorat" },
      { src: "/projects/vila-cluj/vila-cluj-8.webp", alt: "Vila Cluj - camera bebelușului" },
      { src: "/projects/vila-cluj/vila-cluj-9.webp", alt: "Vila Cluj - dormitor roz" },
      { src: "/projects/vila-cluj/vila-cluj-10.webp", alt: "Vila Cluj - dressing roz" }
    ]
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
      "Vilă cu 10 camere în zona Piața Domenii, 670 mp.",
      "Design interior contemporan cu accente de culoare și materiale premium. Spațiul combină eleganța clasică cu confortul modern."
    ],
    coverImage: "/projects/vila-domenii/vila-domenii-1.webp",
    gallery: [
      { src: "/projects/vila-domenii/vila-domenii-1.webp", alt: "Vila Domenii - living cu canapea gri" },
      { src: "/projects/vila-domenii/vila-domenii-2.webp", alt: "Vila Domenii - living cu TV" },
      { src: "/projects/vila-domenii/vila-domenii-3.webp", alt: "Vila Domenii - bucătărie cu lămpi suspendate" },
      { src: "/projects/vila-domenii/vila-domenii-4.webp", alt: "Vila Domenii - sală de mese cu scaune albastre" },
      { src: "/projects/vila-domenii/vila-domenii-5.webp", alt: "Vila Domenii - bucătărie cu electrocasnice" },
      { src: "/projects/vila-domenii/vila-domenii-6.webp", alt: "Vila Domenii - dormitor cu scaune albastre" },
      { src: "/projects/vila-domenii/vila-domenii-7.webp", alt: "Vila Domenii - dormitor cu oglindă rotundă" }
    ]
  },
  {
    id: "quadra-trees",
    slug: "quadra-trees",
    title: "Quadra Trees",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2020",
    status: "proiect finalizat",
    location: "București",
    description: [
      "Studio de 42 mp în complexul rezidențial Quadra Trees.",
      "Un spațiu compact dar funcțional, optimizat pentru viața urbană modernă, cu zone bine definite pentru odihnă, lucru și relaxare."
    ],
    coverImage: "/projects/quadra-trees/quadra-trees-1.webp",
    gallery: [
      { src: "/projects/quadra-trees/quadra-trees-1.webp", alt: "Quadra Trees - dormitor și bucătărie" },
      { src: "/projects/quadra-trees/quadra-trees-2.webp", alt: "Quadra Trees - dormitor cu TV" },
      { src: "/projects/quadra-trees/quadra-trees-3.webp", alt: "Quadra Trees - living cu canapea roșie" },
      { src: "/projects/quadra-trees/quadra-trees-4.webp", alt: "Quadra Trees - familie jucându-se" },
      { src: "/projects/quadra-trees/quadra-trees-5.webp", alt: "Quadra Trees - dormitor cu lampă" },
      { src: "/projects/quadra-trees/quadra-trees-6.webp", alt: "Quadra Trees - balcon verde" }
    ]
  },
  {
    id: "vila-andronache",
    slug: "vila-andronache",
    title: "Vilă P+E - Pădurea Andronache",
    category: "Rezidențial",
    categorySlug: "rezidential",
    year: "2021",
    status: "concept",
    location: "Voluntari, București",
    description: [
      "O casă ca un templu - vilă cu 9 camere pe 570 mp.",
      "Un proiect rezidențial ambițios care îmbină arhitectura modernă cu elemente naturale, creând un sanctuar de liniște la marginea pădurii Andronache."
    ],
    coverImage: "/projects/vila-andronache/vila-andronache-1.webp",
    gallery: [
      { src: "/projects/vila-andronache/vila-andronache-1.webp", alt: "Vila Andronache - living cu bibliotecă" },
      { src: "/projects/vila-andronache/vila-andronache-2.webp", alt: "Vila Andronache - living cu scări" },
      { src: "/projects/vila-andronache/vila-andronache-3.webp", alt: "Vila Andronache - bucătărie cu șemineu" },
      { src: "/projects/vila-andronache/vila-andronache-4.webp", alt: "Vila Andronache - bibliotecă și scări" },
      { src: "/projects/vila-andronache/vila-andronache-5.webp", alt: "Vila Andronache - dormitor cu dressing" },
      { src: "/projects/vila-andronache/vila-andronache-6.webp", alt: "Vila Andronache - hol cu dulapuri" },
      { src: "/projects/vila-andronache/vila-andronache-7.webp", alt: "Vila Andronache - lămpi decorative" }
    ]
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (categorySlug: string): Project[] => {
  return projects.filter(p => p.categorySlug === categorySlug);
};
