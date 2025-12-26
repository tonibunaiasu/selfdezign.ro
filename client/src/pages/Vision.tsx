import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Target, Eye, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Vision() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
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
              Viziune & Misiune
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              UNDE MERGEM <br />
              <span className="text-accent">ȘI DE CE</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-accent flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  Viziunea noastră
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  Cum vedem viitorul
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  Credem într-o lume în care fiecare spațiu spune o poveste autentică despre cel care îl locuiește.
                </p>
                <p>
                  Ne imaginăm un viitor în care designul interior nu mai este un lux rezervat puținilor, ci un drept fundamental al fiecăruia de a trăi într-un mediu care îi susține bunăstarea, creativitatea și identitatea.
                </p>
                <p>
                  Vrem să redefinim industria designului interior în România, mutând focusul de la tendințe efemere și estetică de suprafață către soluții durabile care pun omul în centru.
                </p>
                <p>
                  Viziunea noastră este să devenim partenerul de încredere al fiecărui client care înțelege că spațiul în care trăiește sau lucrează are puterea de a-i transforma viața.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  Misiunea noastră
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  Ce facem în fiecare zi
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  Transformăm spații în extensii ale personalității tale.
                </p>
                <p>
                  În fiecare proiect, ne propunem să ascultăm mai mult decât să vorbim. Să înțelegem nu doar ce vrei, ci și de ce vrei. Să descoperim tiparele invizibile ale vieții tale de zi cu zi și să le dăm formă fizică.
                </p>
                <p>
                  Misiunea noastră este să creăm spații care funcționează pentru tine, nu invers. Spații care te fac să te simți acasă din prima secundă. Spații care îți susțin rutinele, îți amplifică momentele de bucurie și îți oferă refugiu în cele dificile.
                </p>
                <p>
                  Nu proiectăm pentru reviste. Proiectăm pentru oameni reali, cu vieți reale, cu nevoi care se schimbă și evoluează.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="w-16 h-16 bg-accent flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  Scopul nostru
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  De ce existăm
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-white">
                  Existăm pentru că starea ta de bine contează.
                </p>
                <p>
                  Într-o lume în care petrecem 90% din timp în interior, calitatea spațiilor în care trăim și muncim nu este un moft. Este o necesitate.
                </p>
                <p>
                  Scopul nostru este să demonstrăm că designul interior bun nu înseamnă compromisuri. Poți avea un spațiu frumos care este și funcțional. Poți avea un spațiu personal care este și profesional. Poți avea un spațiu care te reprezintă fără să te ruineze.
                </p>
                <p className="text-accent font-semibold">
                  SelfDezign există pentru a pune designul în slujba ta, nu invers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Link href="/despre">
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">Pagina anterioară</span>
                  <span className="font-display font-bold">Despre SelfDezign</span>
                </div>
              </a>
            </Link>
            <Link href="/valori">
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">Pagina următoare</span>
                  <span className="font-display font-bold">Principii & Valori</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
