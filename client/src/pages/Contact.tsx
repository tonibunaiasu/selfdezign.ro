import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";

export default function Contact() {
  const { t } = useLanguage();
  const { page } = usePayloadPage("contact");
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  if (page?.renderMode === "replace" && page.html) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-20">
          <div className="container">
            <PayloadHtml html={page.html} />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      {/* Hero Text */}
      <div className="bg-black text-white pt-32 pb-24 px-4">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 tracking-tighter">
            {t.contact.title}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              {t.contact.subtitle}
            </p>
            <div className="border-l-2 border-accent pl-6">
              <p className="text-gray-400">
                {t.contact.infoTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl font-display font-bold mb-8 uppercase">{t.contact.formTitle}</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.contact.nameLabel}</label>
                <Input id="name" placeholder={t.contact.namePlaceholder} className="bg-white border-gray-200 h-12 rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.contact.emailLabel}</label>
                <Input id="email" type="email" placeholder={t.contact.emailPlaceholder} className="bg-white border-gray-200 h-12 rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.contact.phoneLabel}</label>
                <Input id="phone" type="tel" placeholder={t.contact.phonePlaceholder} className="bg-white border-gray-200 h-12 rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-gray-500">{t.contact.messageLabel}</label>
                <Textarea id="message" placeholder={t.contact.messagePlaceholder} className="bg-white border-gray-200 min-h-[150px] rounded-none focus:ring-accent focus:border-accent" />
              </div>
              <Button size="lg" className="w-full bg-black text-white hover:bg-[var(--color-brand-yellow)] hover:text-black rounded-none h-14 text-base font-bold uppercase tracking-widest transition-colors">
                {t.contact.sendButton}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <Clock className="text-accent w-6 h-6" />
                {t.contact.scheduleTitle}
              </h3>
              <p className="text-gray-600 text-lg">{t.contact.schedule}</p>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <Phone className="text-accent w-6 h-6" />
                {t.contact.phoneTitle}
              </h3>
              <div className="space-y-2">
                <a href="tel:+40721528448" className="block text-lg hover:text-accent transition-colors font-medium">+40-721-528-448</a>
                <a href="mailto:hello@selfdezign.ro" className="block text-lg hover:text-accent transition-colors font-medium">hello@selfdezign.ro</a>
              </div>
              <div className="mt-6">
                <a href="https://wa.me/40721528447" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#25D366] text-black hover:bg-[#25D366]/90 rounded-none uppercase tracking-widest font-bold text-xs px-6">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-accent w-6 h-6" />
                {t.contact.addressTitle}
              </h3>
              <div className="space-y-6">
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">{t.contact.address1}</span>
                  <p className="text-gray-800 font-medium">Strada Politiei, nr. 3, București</p>
                </div>
                <div className="bg-white p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-accent font-bold text-xs uppercase tracking-widest mb-2 block">{t.contact.address2}</span>
                  <p className="text-gray-800 font-medium">Calea Floreasca nr. 246C, etaj 18, București</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
