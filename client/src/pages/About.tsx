import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 101px)`
          }}></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <span className="inline-block bg-accent text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              Despre Noi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              DESIGN PENTRU <br />
              <span className="text-accent">CINE EȘTI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Creat din arhitectura personalității tale.
            </p>
          </div>
        </div>
      </section>

      {/* Positioning Statement */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">
                Ce <span className="text-accent bg-black px-2">NU</span> este designul interior
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Designul interior nu e despre industria creativilor din Palatul de Cleștar.
                </p>
                <p>
                  Nu e despre portofoliul unui arhitect „vedetă".
                </p>
                <p>
                  Nu e despre cât de bine arată sufrageria ta într-o revistă în care nu locuiește nimeni.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter">
                Ce <span className="text-black bg-accent px-2">ESTE</span> designul interior
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  E despre bătăile inimii tale la 7 dimineața.
                </p>
                <p>
                  E despre liniștea pe care o simți când închizi ușa după 10 ore de haos.
                </p>
                <p>
                  E despre lumea la care visezi. Despre proiectele pentru care cauți sens și energie.
                </p>
                <p className="font-semibold text-black">
                  E despre starea ta de bine, nu despre egoul lor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statement */}
      <section className="py-24 bg-black text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-4xl font-display font-bold tracking-tight leading-tight mb-8">
              „Unii designeri vor să-și lase semnătura pe pereții tăi. 
              <span className="text-accent"> La SelfDezign construim spațiul care îți permite să ți-o lași tu.</span>"
            </blockquote>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Navigation to Other Pages */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
              Descoperă mai mult despre noi
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Află ce ne motivează, cum gândim și ce principii ne ghidează în fiecare proiect.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/viziune">
              <a className="group block bg-white p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-accent text-sm font-bold uppercase tracking-widest">01</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                  Viziune & Misiune
                </h3>
                <p className="text-gray-600">
                  Unde vrem să ajungem și de ce existăm ca studio de design.
                </p>
              </a>
            </Link>
            
            <Link href="/valori">
              <a className="group block bg-white p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-accent text-sm font-bold uppercase tracking-widest">02</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                  Principii & Valori
                </h3>
                <p className="text-gray-600">
                  Cum lucrăm și ce ne ghidează în fiecare decizie de design.
                </p>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-6">
            Pregătit să-ți transformi spațiul?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Hai să discutăm despre proiectul tău și să vedem cum putem crea împreună un spațiu care te reprezintă.
          </p>
          <Link href="/contact">
            <Button className="bg-accent text-black hover:bg-accent/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
              Începe o conversație
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
