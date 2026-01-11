import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Target, Eye, Compass } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PayloadHtml from "@/components/PayloadHtml";
import { usePayloadPage } from "@/lib/payload";
import SEO from "@/components/SEO";

export default function Vision() {
  const { t, language } = useLanguage();
  const { page } = usePayloadPage("vision");
  const payloadMode = page?.renderMode ?? "append";
  const payloadSection = page?.html ? (
    <section className="py-16 bg-white">
      <div className="container">
        <PayloadHtml html={page.html} />
      </div>
    </section>
  ) : null;

  const content = {
    ro: {
      backLink: "Înapoi la Despre Noi",
      badge: "Viziune & Misiune",
      title1: "UNDE MERGEM",
      title2: "ȘI DE CE",
      vision: {
        title: "Viziunea noastră",
        subtitle: "Cum vedem viitorul",
        lead: "Credem într-o lume în care fiecare spațiu spune o poveste autentică despre cel care îl locuiește.",
        p1: "Ne imaginăm un viitor în care designul interior nu mai este un lux rezervat puținilor, ci un drept fundamental al fiecăruia de a trăi într-un mediu care îi susține bunăstarea, creativitatea și identitatea.",
        p2: "Vrem să redefinim industria designului interior în România, mutând focusul de la tendințe efemere și estetică de suprafață către soluții durabile care pun omul în centru.",
        p3: "Viziunea noastră este să devenim partenerul de încredere al fiecărui client care înțelege că spațiul în care trăiește sau lucrează are puterea de a-i transforma viața."
      },
      mission: {
        title: "Misiunea noastră",
        subtitle: "Ce facem în fiecare zi",
        lead: "Transformăm spații în extensii ale personalității tale.",
        p1: "În fiecare proiect, ne propunem să ascultăm mai mult decât să vorbim. Să înțelegem nu doar ce vrei, ci și de ce vrei. Să descoperim tiparele invizibile ale vieții tale de zi cu zi și să le dăm formă fizică.",
        p2: "Misiunea noastră este să creăm spații care funcționează pentru tine, nu invers. Spații care te fac să te simți acasă din prima secundă. Spații care îți susțin rutinele, îți amplifică momentele de bucurie și îți oferă refugiu în cele dificile.",
        p3: "Nu proiectăm pentru reviste. Proiectăm pentru oameni reali, cu vieți reale, cu nevoi care se schimbă și evoluează."
      },
      purpose: {
        title: "Scopul nostru",
        subtitle: "De ce existăm",
        lead: "Existăm pentru că starea ta de bine contează.",
        p1: "Într-o lume în care petrecem 90% din timp în interior, calitatea spațiilor în care trăim și muncim nu este un moft. Este o necesitate.",
        p2: "Scopul nostru este să demonstrăm că designul interior bun nu înseamnă compromisuri. Poți avea un spațiu frumos care este și funcțional. Poți avea un spațiu personal care este și profesional. Poți avea un spațiu care te reprezintă fără să te ruineze.",
        p3: "SelfDezign există pentru a pune designul în slujba ta, nu invers."
      },
      prevPage: "Pagina anterioară",
      prevTitle: "Despre SelfDezign",
      nextPage: "Pagina următoare",
      nextTitle: "Principii & Valori"
    },
    en: {
      backLink: "Back to About Us",
      badge: "Vision & Mission",
      title1: "WHERE WE'RE GOING",
      title2: "AND WHY",
      vision: {
        title: "Our Vision",
        subtitle: "How we see the future",
        lead: "We believe in a world where every space tells an authentic story about the person who inhabits it.",
        p1: "We envision a future where interior design is no longer a luxury reserved for the few, but a fundamental right for everyone to live in an environment that supports their well-being, creativity, and identity.",
        p2: "We want to redefine the interior design industry in Romania, shifting focus from ephemeral trends and surface aesthetics to sustainable solutions that put people first.",
        p3: "Our vision is to become the trusted partner of every client who understands that the space they live or work in has the power to transform their life."
      },
      mission: {
        title: "Our Mission",
        subtitle: "What we do every day",
        lead: "We transform spaces into extensions of your personality.",
        p1: "In every project, we aim to listen more than we speak. To understand not just what you want, but why you want it. To discover the invisible patterns of your daily life and give them physical form.",
        p2: "Our mission is to create spaces that work for you, not the other way around. Spaces that make you feel at home from the first second. Spaces that support your routines, amplify your moments of joy, and offer refuge in difficult times.",
        p3: "We don't design for magazines. We design for real people, with real lives, with needs that change and evolve."
      },
      purpose: {
        title: "Our Purpose",
        subtitle: "Why we exist",
        lead: "We exist because your well-being matters.",
        p1: "In a world where we spend 90% of our time indoors, the quality of the spaces we live and work in is not a whim. It's a necessity.",
        p2: "Our purpose is to demonstrate that good interior design doesn't mean compromises. You can have a beautiful space that is also functional. You can have a personal space that is also professional. You can have a space that represents you without breaking the bank.",
        p3: "SelfDezign exists to put design at your service, not the other way around."
      },
      prevPage: "Previous page",
      prevTitle: "About SelfDezign",
      nextPage: "Next page",
      nextTitle: "Principles & Values"
    }
  };

  const c = content[language];
  const cmsLayout = page?.visionLayout?.[language] as
    | Record<string, string>
    | undefined;
  const getValue = (key: string, fallback: string) =>
    cmsLayout?.[key] ?? fallback;

  return (
    <div className="min-h-screen bg-background">
      {payloadMode === "prepend" ? payloadSection : null}
      <SEO
        title={getValue("badge", c.badge)}
        description={getValue("visionLead", c.vision.lead)}
        url="/viziune"
      />
      {/* Hero Section */}
      <section className="bg-black text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="container relative z-10">
          <Link href={getValue("backLinkHref", "/despre")}>
            <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-widest">
                {getValue("backLinkLabel", c.backLink)}
              </span>
            </a>
          </Link>
          <div className="max-w-4xl">
            <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-8">
              {getValue("badge", c.badge)}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
              {getValue("title1", c.title1)} <br />
              <span className="text-accent">
                {getValue("title2", c.title2)}
              </span>
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
                <div className="w-16 h-16 bg-[var(--color-brand-yellow)] flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  {getValue("visionTitle", c.vision.title)}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {getValue("visionSubtitle", c.vision.subtitle)}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  {getValue("visionLead", c.vision.lead)}
                </p>
                <p>{getValue("visionP1", c.vision.p1)}</p>
                <p>{getValue("visionP2", c.vision.p2)}</p>
                <p>{getValue("visionP3", c.vision.p3)}</p>
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
                  {getValue("missionTitle", c.mission.title)}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {getValue("missionSubtitle", c.mission.subtitle)}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-black">
                  {getValue("missionLead", c.mission.lead)}
                </p>
                <p>{getValue("missionP1", c.mission.p1)}</p>
                <p>{getValue("missionP2", c.mission.p2)}</p>
                <p>{getValue("missionP3", c.mission.p3)}</p>
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
                <div className="w-16 h-16 bg-[var(--color-brand-yellow)] flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter mb-4">
                  {getValue("purposeTitle", c.purpose.title)}
                </h2>
                <p className="text-gray-500 uppercase tracking-widest text-sm">
                  {getValue("purposeSubtitle", c.purpose.subtitle)}
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p className="text-2xl font-display font-semibold text-white">
                  {getValue("purposeLead", c.purpose.lead)}
                </p>
                <p>{getValue("purposeP1", c.purpose.p1)}</p>
                <p>{getValue("purposeP2", c.purpose.p2)}</p>
                <p className="text-accent font-semibold">
                  {getValue("purposeP3", c.purpose.p3)}
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
            <Link href={getValue("prevPageHref", "/despre")}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {getValue("prevPageLabel", c.prevPage)}
                  </span>
                  <span className="font-display font-bold">
                    {getValue("prevPageTitle", c.prevTitle)}
                  </span>
                </div>
              </a>
            </Link>
            <Link href={getValue("nextPageHref", "/valori")}>
              <a className="group flex items-center gap-4 text-gray-600 hover:text-black transition-colors">
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block">
                    {getValue("nextPageLabel", c.nextPage)}
                  </span>
                  <span className="font-display font-bold">
                    {getValue("nextPageTitle", c.nextTitle)}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
          </div>
        </div>
      </section>
      {payloadMode === "append" ? payloadSection : null}
    </div>
  );
}
