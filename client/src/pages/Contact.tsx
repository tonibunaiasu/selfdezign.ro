import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Text */}
      <div className="bg-black text-white pt-32 pb-24 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 tracking-tighter">
            SUNTEM MEREU <br/><span className="text-accent">LA LUCRU</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Sesiuni de creație, cercetare, proiectare, prospectare furnizori, vizite în șantier, depunere documentație legală, prezentări la clienți, workshopuri...
            </p>
            <div className="border-l-2 border-accent pl-6">
              <p className="text-gray-400">
                Dar ne facem timp să îți răspundem la mesaje, chiar dacă uneori o facem cu întârziere. Îți mulțumim pentru înțelegere.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl font-display font-bold mb-8 uppercase">Salut!</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">Nume</label>
                <Input id="name" placeholder="Numele tău" className="bg-white border-gray-200 h-12 rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">Email</label>
                <Input id="email" type="email" placeholder="adresa@email.com" className="bg-white border-gray-200 h-12 rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-500">Mesaj</label>
                <Textarea id="message" placeholder="Spune-ne despre proiectul tău..." className="bg-white border-gray-200 min-h-[150px] rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <Button size="lg" className="w-full bg-black text-white hover:bg-accent hover:text-black rounded-none h-14 text-base font-bold uppercase tracking-widest transition-colors">
                Trimite Mesajul
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <Clock className="text-accent w-6 h-6" />
                PROGRAM DE LUCRU
              </h3>
              <p className="text-gray-600 text-lg">Luni - Vineri</p>
              <p className="text-gray-600 text-lg">09:00 AM la 06:00 PM</p>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <Phone className="text-accent w-6 h-6" />
                CONTACT DIRECT
              </h3>
              <div className="space-y-2">
                <a href="tel:+40721528448" className="block text-lg hover:text-accent transition-colors font-medium">+40-721-528-448</a>
                <a href="mailto:hello@selfdezign.ro" className="block text-lg hover:text-accent transition-colors font-medium">hello@selfdezign.ro</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-accent w-6 h-6" />
                VIZITE LA BIROURI
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">Sediu Central</span>
                  <p className="text-gray-800 font-medium">Strada Politiei, nr. 3, București</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">Sky Tower</span>
                  <p className="text-gray-800 font-medium">Calea Floreasca nr. 246C, etaj 18, București</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
