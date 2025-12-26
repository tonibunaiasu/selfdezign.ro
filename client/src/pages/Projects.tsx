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
  {
    id: 1,
    title: "Sky Tower Office",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
    description: "Spațiu de birouri modern cu vedere panoramică"
  },
  {
    id: 2,
    title: "Urban Garden Restaurant",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop",
    description: "Terasă restaurant cu design biofilic"
  },
  {
    id: 3,
    title: "Hotel MM Reception",
    category: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
    description: "Recepție hotel minimalistă"
  },
  {
    id: 4,
    title: "Concept Store",
    category: "Comercial",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop",
    description: "Spațiu comercial vibrant"
  },
  {
    id: 5,
    title: "Festival Lounge",
    category: "Brand Experience",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop",
    description: "Activare de brand outdoor"
  },
  {
    id: 6,
    title: "Nordic Apartment",
    category: "Rezidențial",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    description: "Apartament rezidențial modern"
  },
  // Duplicate for grid filling
  {
    id: 7,
    title: "Tech Hub",
    category: "Office",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop",
    description: "Birouri open-space"
  },
  {
    id: 8,
    title: "Bistro 55",
    category: "Restaurant",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
    description: "Design interior bistro"
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
    </div>
  );
}
