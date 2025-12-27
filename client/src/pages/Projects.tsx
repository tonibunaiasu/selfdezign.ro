import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects as projectsData } from "@/data/projects-data";

const categories = [
  "Toate",
  "Restaurant",
  "Office",
  "Hotel",
  "Comercial",
  "Brand Experience",
  "Rezidențial"
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Toate");

  const filteredProjects = activeCategory === "Toate" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

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
            <Link key={project.id} href={`/proiect/${project.slug}`}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.coverImage} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-accent text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                      {project.category}
                    </div>
                  </div>
                  {project.gallery && project.gallery.length > 0 && (
                    <div className="absolute bottom-4 left-4 z-20 bg-black/70 text-white text-xs px-2 py-1">
                      {project.gallery.length} fotografii
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{project.location} • {project.year}</p>
              </div>
            </Link>
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
