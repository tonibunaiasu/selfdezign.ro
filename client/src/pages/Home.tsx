import { Button } from "@/components/ui/button";
import { ArrowRight, Award, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(204,255,0,0.1),_transparent_70%)]"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-block px-4 py-1 border border-accent/30 rounded-full bg-accent/5 backdrop-blur-sm">
              <span className="text-accent text-xs font-bold tracking-widest uppercase">You are the designer</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter">
              DESIGNUL <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">INTERIOR</span> <br/>
              ÎNTÂLNEȘTE <br/>
              <span className="text-accent">NATURA UMANĂ</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed border-l-2 border-accent pl-6">
              Vino să creăm experiențe care transformă designul interior într-o declarație a identității personale sau de brand.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/proiecte">
                <Button size="lg" className="bg-accent text-black hover:bg-accent/90 rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest group">
                  Descoperă Proiectele
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-black rounded-none h-14 px-8 text-base font-bold uppercase tracking-widest">
                  Contactează-ne
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full aspect-[3/4] border border-white/10 p-4">
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent"></div>
              <div className="w-full h-full bg-gray-900 overflow-hidden relative group">
                {/* Placeholder for Hero Image - In real implementation use actual image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src="/images/hero-placeholder.jpg" 
                  alt="Interior Design" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop";
                  }}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Featured Project</p>
                  <h3 className="text-2xl font-display font-bold text-white">Sky Tower Office</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/4">
              <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Premii și <br/>Distincții</h3>
            </div>
            <div className="md:w-3/4 flex flex-wrap justify-center md:justify-end gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Logos placeholders */}
              <div className="h-12 flex items-center font-bold text-gray-400">BIG SEE</div>
              <div className="h-12 flex items-center font-bold text-gray-400">Romanian Design Week</div>
              <div className="h-12 flex items-center font-bold text-gray-400">SHARE Architects</div>
              <div className="h-12 flex items-center font-bold text-gray-400">Bienala de Arhitectură</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                 <img 
                  src="/images/irina-stoica.jpg" 
                  alt="Arh. Irina Stoica" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 max-w-xs hidden md:block">
                <p className="font-display font-bold text-xl mb-2">arh. Irina Stoica</p>
                <p className="text-gray-400 text-sm">Fondator SelfDezign</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                DESIGN INTERIOR <br/>
                ȘI <span className="text-accent bg-black px-2">ARHITECTURĂ</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Spațiile interioare în care îți petreci cel mai mult timp din viață sunt esențiale pentru starea ta de bine. Simți că te reprezintă, că te susțin, că te inspiră?
                </p>
                <p>
                  SelfDezign a pornit ca un studio de design interior în misiunea de a transpune personalitațile în habitat. Suntem specializați în crearea de soluții creative și inovatoare pentru spații de birouri, hoteluri, cafenele, dar și zone rezidențiale.
                </p>
                <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-black font-medium">
                  "Transformă-ți spațiul într-o operă de artă care te reprezintă. 100% autentică. 100% funcțională."
                </blockquote>
              </div>
              
              <Link href="/contact">
                <Button variant="link" className="text-black font-bold uppercase tracking-widest p-0 hover:text-accent transition-colors text-lg">
                  Discută cu noi <ChevronRight className="ml-1 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">
              DOMENII DE <br/><span className="text-accent">EXPERTIZĂ</span>
            </h2>
            <Link href="/proiecte">
              <Button variant="outline" className="hidden md:flex border-white/20 text-white hover:bg-white hover:text-black rounded-none uppercase tracking-widest">
                Vezi toate proiectele
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { title: "Restaurant", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop" },
              { title: "Office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" },
              { title: "Hotel", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop" },
              { title: "Comercial", img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2670&auto=format&fit=crop" },
              { title: "Brand Experience", img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2670&auto=format&fit=crop" },
              { title: "Rezidențial", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop" }
            ].map((cat, idx) => (
              <Link key={idx} href="/proiecte">
                <a className="group relative aspect-[4/5] overflow-hidden block bg-gray-900">
                  <img 
                    src={cat.img} 
                    alt={cat.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 border-t border-white/10 group-hover:border-accent transition-colors">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">0{idx + 1}</span>
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">{cat.title}</h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
