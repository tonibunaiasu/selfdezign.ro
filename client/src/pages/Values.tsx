import { Link } from "wouter";
import { ArrowLeft, Heart, Users, Lightbulb, Shield, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import SEO from "@/components/SEO";

const valuesData = {
  ro: [
    {
      icon: Heart,
      title: "Autenticitate",
      subtitle: "Fii tu însuți",
      description: "Credem că cele mai bune spații sunt cele care reflectă cine ești cu adevărat, nu cine crezi că ar trebui să fii. Nu urmăm tendințe orbește. Ascultăm, observăm și creăm soluții unice pentru fiecare client.",
      color: "bg-[var(--color-brand-yellow)]"
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
      color: "bg-[var(--color-brand-yellow)]"
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
      color: "bg-[var(--color-brand-yellow)]"
    },
    {
      icon: Sparkles,
      title: "Excelență",
      subtitle: "Detaliile contează",
      description: "Nu ne mulțumim cu 'suficient de bun'. Fiecare îmbinare, fiecare nuanță, fiecare finisaj primește atenția pe care o merită. Calitatea se vede în detalii.",
      color: "bg-black"
    }
  ],
  en: [
    {
      icon: Heart,
      title: "Authenticity",
      subtitle: "Be yourself",
      description: "We believe the best spaces are those that reflect who you truly are, not who you think you should be. We don't follow trends blindly. We listen, observe, and create unique solutions for each client.",
      color: "bg-[var(--color-brand-yellow)]"
    },
    {
      icon: Users,
      title: "Collaboration",
      subtitle: "Together, not for you",
      description: "We're not solitary artists working in isolation. We're partners in your transformation process. Every decision is made together, every step is taken alongside you.",
      color: "bg-black"
    },
    {
      icon: Lightbulb,
      title: "Functionality",
      subtitle: "Beautiful and useful",
      description: "A beautiful space that doesn't work is just a stage set. We always prioritize utility and comfort, then find creative ways to make them aesthetic as well.",
      color: "bg-[var(--color-brand-yellow)]"
    },
    {
      icon: Shield,
      title: "Integrity",
      subtitle: "Promises kept",
      description: "We say what we do and do what we say. Budgets are respected, deadlines are honored, unpleasant surprises are avoided. Transparency is not optional.",
      color: "bg-black"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      subtitle: "Responsible design",
      description: "We choose durable materials, local suppliers, and solutions that stand the test of time. Good design shouldn't cost the planet or go out of style in two years.",
      color: "bg-[var(--color-brand-yellow)]"
    },
    {
      icon: Sparkles,
      title: "Excellence",
      subtitle: "Details matter",
      description: "We don't settle for 'good enough'. Every joint, every shade, every finish receives the attention it deserves. Quality shows in the details.",
      color: "bg-black"
    }
  ]
};

const principlesData = {
  ro: [
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
  ],
  en: [
    {
      number: "01",
      title: "We listen before we speak",
      description: "Every project starts with questions, not answers. We want to understand how you live, what bothers you, what makes you happy. Only then do we open the sketchbook."
    },
    {
      number: "02",
      title: "Design serves people, not the other way around",
      description: "You won't have to change your habits to fit the space. The space will adapt to you, to your routines, to your unique way of living."
    },
    {
      number: "03",
      title: "Total transparency",
      description: "You know exactly what you're getting, how much it costs, and when it will be ready. No hidden costs, no postponed deadlines, no surprises. Open communication is the foundation of trust."
    },
    {
      number: "04",
      title: "Quality without compromise",
      description: "We'd rather say no to a project than deliver something below our standards. Reputation is built project by project, and each one counts."
    },
    {
      number: "05",
      title: "Continuous evolution",
      description: "The industry changes, materials evolve, techniques improve. We constantly invest in education and experimentation to offer the best solutions."
    }
  ]
};

export default function Values() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("values");
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  const iconMap: Record<string, typeof Heart> = {
    heart: Heart,
    users: Users,
    lightbulb: Lightbulb,
    shield: Shield,
    leaf: Leaf,
    sparkles: Sparkles,
  };

  const values = valuesData[language];
  const principles = principlesData[language];

  const content = {
    ro: {
      backLink: "Înapoi la Despre Noi",
      badge: "Principii & Valori",
      title1: "CUM GÂNDIM",
      title2: "ȘI CUM LUCRĂM",
      subtitle: "Valorile nu sunt cuvinte pe un perete. Sunt deciziile pe care le luăm când nimeni nu se uită.",
      valuesTitle: "Valorile noastre",
      valuesSubtitle: "Șase piloni care ne ghidează în fiecare proiect și în fiecare interacțiune.",
      principlesTitle: "Principiile noastre de lucru",
      principlesSubtitle: "Regulile nescrise care definesc modul în care abordăm fiecare proiect.",
      promiseTitle: "Promisiunea noastră",
      promiseText: "Nu îți vom livra un spațiu care arată bine în fotografii dar nu funcționează în viața reală. Nu îți vom impune gusturile noastre. Nu îți vom depăși bugetul fără să te anunțăm. Nu vom dispărea după predare.",
      promiseHighlight: "Îți vom livra un spațiu în care te vei simți acasă.",
      ctaTitle: "Rezonezi cu valorile noastre?",
      ctaText: "Hai să vedem dacă suntem potriviți pentru proiectul tău. O conversație nu te obligă la nimic.",
      prevPage: "Pagina anterioară",
      prevTitle: "Viziune & Misiune"
    },
    en: {
      backLink: "Back to About Us",
      badge: "Principles & Values",
      title1: "HOW WE THINK",
      title2: "AND HOW WE WORK",
      subtitle: "Values aren't words on a wall. They're the decisions we make when no one is watching.",
      valuesTitle: "Our Values",
      valuesSubtitle: "Six pillars that guide us in every project and every interaction.",
      principlesTitle: "Our Working Principles",
      principlesSubtitle: "The unwritten rules that define how we approach every project.",
      promiseTitle: "Our Promise",
      promiseText: "We won't deliver a space that looks good in photos but doesn't work in real life. We won't impose our tastes on you. We won't exceed your budget without telling you. We won't disappear after handover.",
      promiseHighlight: "We will deliver a space where you will feel at home.",
      ctaTitle: "Do our values resonate with you?",
      ctaText: "Let's see if we're right for your project. A conversation doesn't commit you to anything.",
      prevPage: "Previous page",
      prevTitle: "Vision & Mission"
    }
  };

  const c = content[language];
  const cmsLayout = page?.valuesLayout?.[language];
  const cmsValues = cmsLayout?.valuesItems?.length ? cmsLayout.valuesItems : null;
  const cmsPrinciples = cmsLayout?.principlesItems?.length
    ? cmsLayout.principlesItems
    : null;

  return (
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      <SEO
        title={cmsLayout?.badge ?? content[language].badge}
        description={cmsLayout?.subtitle ?? content[language].subtitle}
        url="/valori"
      />
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/20 rounded-full"></div>
        </div>
        <div className="container relative z-10">
          <Link href={cmsLayout?.backLinkHref ?? "/despre"}>
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">
                {cmsLayout?.backLinkLabel ?? c.backLink}
              </span>
            </a>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              {cmsLayout?.badge ?? c.badge}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {cmsLayout?.title1 ?? c.title1} <br />
              <span className="text-accent">
                {cmsLayout?.title2 ?? c.title2}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              {cmsLayout?.subtitle ?? c.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
              {cmsLayout?.valuesTitle ?? c.valuesTitle}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {cmsLayout?.valuesSubtitle ?? c.valuesSubtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(cmsValues ?? values).map((value, index) => {
              const iconKey = "iconKey" in value ? value.iconKey : undefined;
              const IconComponent = iconKey ? iconMap[iconKey] : value.icon;
              const colorClass = value.color ?? "bg-black";

              return (
              <div key={index} className="group p-8 border border-gray-200 hover:border-accent transition-colors">
                <div className={`w-14 h-14 ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {IconComponent ? (
                    <IconComponent
                      className={`w-7 h-7 ${
                        colorClass === "bg-[var(--color-brand-yellow)]"
                          ? "text-black"
                          : "text-accent"
                      }`}
                    />
                  ) : null}
                </div>
                <h3 className="text-2xl font-display font-bold mb-1">{value.title}</h3>
                <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">{value.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                {cmsLayout?.principlesTitle ?? c.principlesTitle}
              </h2>
              <p className="text-gray-600">
                {cmsLayout?.principlesSubtitle ?? c.principlesSubtitle}
              </p>
            </div>
            
            <div className="space-y-8">
              {(cmsPrinciples ?? principles).map((principle, index) => (
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
              {cmsLayout?.promiseTitle ?? c.promiseTitle}
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {cmsLayout?.promiseText ?? c.promiseText}
            </p>
            <p className="text-2xl font-display font-bold text-accent">
              {cmsLayout?.promiseHighlight ?? c.promiseHighlight}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-6">
            {cmsLayout?.ctaTitle ?? c.ctaTitle}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            {cmsLayout?.ctaText ?? c.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={cmsLayout?.ctaPrimaryHref ?? "/contact"}>
              <Button className="bg-[var(--color-brand-yellow)] text-black hover:bg-[var(--color-brand-yellow)]/90 rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                {cmsLayout?.ctaPrimaryLabel ?? t.nav.contact}
              </Button>
            </Link>
            <Link href={cmsLayout?.ctaSecondaryHref ?? "/proiecte"}>
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white rounded-none uppercase tracking-widest font-bold px-8 py-6 text-sm">
                {cmsLayout?.ctaSecondaryLabel ?? t.nav.projects}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container">
          <div className="flex justify-start">
            <Link href={cmsLayout?.prevPageHref ?? "/viziune"}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {cmsLayout?.prevPageLabel ?? c.prevPage}
                  </span>
                  <span className="font-display font-bold">
                    {cmsLayout?.prevPageTitle ?? c.prevTitle}
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
