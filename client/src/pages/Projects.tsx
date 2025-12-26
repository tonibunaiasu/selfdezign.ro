import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  "Toate",
  "Restaurant",
  "Office",
  "Hotel",
  "Comercial",
  "Brand Experience",
  "Rezidențial"
];

const projects = [
  // RESTAURANT / HORECA
  {
    id: 1,
    title: "Bloom - Specialty Coffee",
    category: "Restaurant",
    image: "/projects/bloom-specialty-coffee.webp",
    description: "Coffee shop cu design floral și atmosferă relaxantă"
  },
  {
    id: 2,
    title: "Cafeneaua Veche 9",
    category: "Restaurant",
    image: "/projects/cafeneaua-veche-9.webp",
    description: "Cafenea cu caracter vintage și detalii autentice"
  },
  {
    id: 3,
    title: "Zero Grade - Pizza în Păltiniș",
    category: "Restaurant",
    image: "/projects/zero-grade-paltinis.webp",
    description: "Pizzerie montană cu design rustic modern"
  },
  {
    id: 4,
    title: "Restaurant Poeme - Hotel Boutiq Mamaia",
    category: "Restaurant",
    image: "/projects/restaurant-poeme-1.webp",
    description: "Restaurant de fine dining cu vedere la mare"
  },
  
  // OFFICE
  {
    id: 5,
    title: "Global Leader in Live Dealer Gaming",
    category: "Office",
    image: "/projects/office-global-leader-gaming.webp",
    description: "Sediu corporate pentru lider în industria gaming"
  },
  {
    id: 6,
    title: "Prima Development",
    category: "Office",
    image: "/projects/office-prima-development.webp",
    description: "Birouri moderne pentru dezvoltator imobiliar"
  },
  {
    id: 7,
    title: "MyHive Office",
    category: "Office",
    image: "/projects/office-myhive.webp",
    description: "Spațiu de coworking premium cu design flexibil"
  },
  
  // HOTEL
  {
    id: 8,
    title: "Bucharest Comfort Suites ****",
    category: "Hotel",
    image: "/projects/hotel-bucharest-comfort-1.webp",
    description: "Hotel boutique cu design tropical și modern"
  },
  {
    id: 9,
    title: "Bucharest Comfort Suites - Bathroom",
    category: "Hotel",
    image: "/projects/hotel-bucharest-comfort-bathroom.webp",
    description: "Baie de hotel cu finisaje premium și pattern vegetal"
  },
  
  // COMERCIAL / EXPO
  {
    id: 10,
    title: "mafi Natural Wooden Floors - Showroom",
    category: "Comercial",
    image: "/projects/comercial-mafi-showroom.webp",
    description: "Showroom pentru parchet natural cu design elegant"
  },
  
  // BRAND EXPERIENCE
  {
    id: 11,
    title: "Eveniment Outdoor - Companie Țigarete",
    category: "Brand Experience",
    image: "/projects/brand-experience-outdoor.webp",
    description: "Activare de brand outdoor cu dome geodezic"
  },
  {
    id: 12,
    title: "Branding Locație - Companie FMCG",
    category: "Brand Experience",
    image: "/projects/brand-experience-fmcg.webp",
    description: "Instalație de brand pentru companie FMCG"
  },
  
  // REZIDENȚIAL
  {
    id: 13,
    title: "Locuință cu Spații Ample - Cartierul Francez",
    category: "Rezidențial",
    image: "/projects/rezidential-cartier-francez.webp",
    description: "Eleganță și rafinament într-un apartament spațios"
  },
  {
    id: 14,
    title: "Vilă P+E - Cluj Napoca",
    category: "Rezidențial",
    image: "/projects/rezidential-vila-cluj.webp",
    description: "Domeniul de pe deal - vilă modernă cu living generos"
  },
  {
    id: 15,
    title: "Vilă D+P+E - Piața Domenii",
    category: "Rezidențial",
    image: "/projects/rezidential-piata-domenii.webp",
    description: "Lux și modernitate într-o vilă din București"
  },
  {
    id: 16,
    title: "Quadra Trees - București",
    category: "Rezidențial",
    image: "/projects/rezidential-quadra-trees.webp",
    description: "Capsula modernă - home office integrat în living"
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Toate");

  const filteredProjects = activeCategory === "Toate" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-black text-white pt-32 pb-16 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
            PROIECTE <span className="text-accent">RECENTE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Proiecte de amenajare office, hotel, restaurant, rezidențial care transformă spațiul într-o experiență.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur border-b border-border py-4 overflow-x-auto">
        <div className="container flex gap-2 min-w-max px-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-none uppercase tracking-widest font-bold text-xs h-10 px-6 transition-all",
                activeCategory === cat 
                  ? "bg-accent text-black hover:bg-accent/90 border-accent" 
                  : "border-gray-200 hover:border-black hover:text-black text-gray-500"
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container mt-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-accent text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                    {project.category}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mt-24 px-4">
        <div className="bg-black text-white p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tighter">
            Ai un proiect în minte?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Hai să transformăm viziunea ta într-o realitate. Contactează-ne pentru o consultație gratuită.
          </p>
          <Button 
            className="bg-accent text-black hover:bg-accent/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm"
            onClick={() => window.location.href = '/contact'}
          >
            Începe un proiect
          </Button>
        </div>
      </div>
    </div>
  );
}
