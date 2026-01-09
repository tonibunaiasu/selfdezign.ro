import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { mediaAppearances } from "@/data/media-appearances";

const articleImages = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2669&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2647&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop",
];

const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Articles() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-black text-white pt-32 pb-24 px-4">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
                SUNTEM <br/><span className="text-accent">SELFDEZIGN!</span>
              </h1>
              <p className="text-gray-400 max-w-xl text-lg">
                Este firesc ca noi să fim cei mai entuziasmați susținători ai propriei munci! Cu toate acestea proiectele SelfDezign sunt remarcate și de alții.
              </p>
            </div>
            <div className="border-l-2 border-accent pl-6 max-w-md">
              <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Apariții Media</p>
              <p className="text-gray-300 text-sm">
                O serie de publicații de specialitate au prezentat lucrarile noastre, fapt care ne bucură și ne onorează!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mt-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {mediaAppearances.map((article, index) => (
            <article key={article.id} className="group flex flex-col h-full">
              <div className="relative aspect-video overflow-hidden bg-gray-100 mb-6">
                <div className="absolute inset-0 bg-[var(--color-brand-yellow)]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-multiply"></div>
                <img 
                  src={articleImages[index % articleImages.length]} 
                  alt={article.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest z-20">
                  {article.publication}
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider border-b border-gray-100 pb-3 inline-block w-full">
                  {formatDate(article.date)}
                </div>
                <h3 className="text-xl font-display font-bold leading-tight mb-4 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4">
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-black font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                      Citește Articolul <ArrowUpRight className="ml-1 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
