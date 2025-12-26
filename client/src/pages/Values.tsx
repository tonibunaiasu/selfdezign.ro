import { Link } from "wouter";
import { ArrowLeft, Heart, Users, Lightbulb, Shield, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Autenticitate",
    subtitle: "Fii tu însuți",
    description: "Credem că cele mai bune spații sunt cele care reflectă cine ești cu adevărat, nu cine crezi că ar trebui să fii. Nu urmăm tendințe orbește. Ascultăm, observăm și creăm soluții unice pentru fiecare client.",
    color: "bg-accent"
  },
  {
    icon: Users,
    title: "Colaborare",
    subtitle: "Împreună, nu pentru tine",
    description: "Nu suntem artiști solitari care lucrează în izolare. Suntem parteneri în procesul tău de transformare. Fiecare decizie o luăm împreună, fiecare pas îl facem alături de tine.",
    color: "bg-black"
  },
  {
    icon: Lightbulb,
    title: "Funcționalitate",
    subtitle: "Frumos și util",
    description: "Un spațiu frumos care nu funcționează este doar o scenografie. Prioritizăm întotdeauna utilitatea și confortul, apoi găsim modalități creative de a le face și estetice.",
    color: "bg-accent"
  },
  {
    icon: Shield,
    title: "Integritate",
    subtitle: "Promisiuni ținute",
    description: "Spunem ce facem și facem ce spunem. Bugetele sunt respectate, termenele sunt onorate, surprizele neplăcute sunt evitate. Transparența nu este opțională.",
    color: "bg-black"
  },
  {
    icon: Leaf,
    title: "Sustenabilitate",
    subtitle: "Design responsabil",
    description: "Alegem materiale durabile, furnizori locali și soluții care rezistă în timp. Un design bun nu ar trebui să coste planeta sau să se demodeze în doi ani.",
    color: "bg-accent"
  },
  {
    icon: Sparkles,
    title: "Excelență",
    subtitle: "Detaliile contează",
    description: "Nu ne mulțumim cu 'suficient de bun'. Fiecare îmbinare, fiecare nuanță, fiecare finisaj primește atenția pe care o merită. Calitatea se vede în detalii.",
    color: "bg-black"
  }
];

const principles = [
  {
    number: "01",
    title: "Ascultăm înainte să vorbim",
    description: "Fiecare proiect începe cu întrebări, nu cu răspunsuri. Vrem să înțelegem cum trăiești, ce te deranjează, ce te face fericit. Abia apoi deschidem caietul de schițe."
  },
  {
    number: "02",
    title: "Designul servește omul, nu invers",
    description: "Nu vei fi nevoit să-ți schimbi obiceiurile pentru a te potrivi spațiului. Spațiul se va adapta la tine, la rutinele tale, la modul tău unic de a trăi."
  },
  {
    number: "03",
    title: "Transparență totală",
    description: "Știi exact ce primești, cât costă și când va fi gata. Fără costuri ascunse, fără termene amânate, fără surprize. Comunicarea deschisă este fundația încrederii."
  },
  {
    number: "04",
    title: "Calitate fără compromis",
    description: "Preferăm să spunem nu unui proiect decât să livrăm ceva sub standardele noastre. Reputația se construiește proiect cu proiect, și fiecare contează."
  },
  {
    number: "05",
    title: "Evoluție continuă",
    description: "Industria se schimbă, materialele evoluează, tehnicile se îmbunătățesc. Investim constant în educație și experimentare pentru a oferi cele mai bune soluții."
  }
];

export default function Values() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        </div>
        <div className="container relative z-10">
          <Link href="/despre">
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">Înapoi la Despre Noi</span>
            </a>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-accent text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              Principii & Valori
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              CUM GÂNDIM <br />
              <span className="text-accent">ȘI CUM LUCRĂM</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Valorile nu sunt cuvinte pe un perete. Sunt deciziile pe care le luăm când nimeni nu se uită.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
              Valorile noastre
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Șase piloni care ne ghidează în fiecare proiect și în fiecare interacțiune.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className={`w-14 h-14 ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-7 h-7 ${value.color === 'bg-accent' ? 'text-black' : 'text-accent'}`} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-1">{value.title}</h3>
                <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">{value.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                Principiile noastre de lucru
              </h2>
              <p className="text-gray-600">
                Regulile nescrise care definesc modul în care abordăm fiecare proiect.
              </p>
            </div>
            
            <div className="space-y-8">
              {principles.map((principle, index) => (
                <div key={index} className="flex gap-6 p-6 bg-white border-l-4 border-accent">
                  <span className="text-4xl font-display font-bold text-accent/30">{principle.number}</span>
                  <div>
                    <h3 className="text-xl font-display font-bold mb-2">{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-8">
              Promisiunea noastră
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Nu îți vom livra un spațiu care arată bine în fotografii dar nu funcționează în viața reală. 
              Nu îți vom impune gusturile noastre. Nu îți vom depăși bugetul fără să te anunțăm. 
              Nu vom dispărea după predare.
            </p>
            <p className="text-2xl font-display font-bold text-accent">
              Îți vom livra un spațiu în care te vei simți acasă.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-6">
            Rezonezi cu valorile noastre?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Hai să vedem dacă suntem potriviți pentru proiectul tău. O conversație nu te obligă la nimic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-accent text-black hover:bg-accent/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                Contactează-ne
              </Button>
            </Link>
            <Link href="/proiecte">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                Vezi proiectele
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex justify-start">
            <Link href="/viziune">
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">Pagina anterioară</span>
                  <span className="font-display font-bold">Viziune & Misiune</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
