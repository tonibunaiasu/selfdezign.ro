import SEO from "@/components/SEO";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Politica de Cookies"
        description="Informatii despre cookie-uri si tehnologii similare folosite de SelfDezign."
        url="/cookies"
      />
      <section className="pt-32 pb-16 bg-black text-white">
        <div className="container">
          <span className="inline-block bg-[var(--color-brand-yellow)] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest mb-6">
            Informare
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Politica de Cookies
          </h1>
          <p className="mt-4 text-gray-400 max-w-2xl">
            Aceasta politica explica modul in care folosim cookie-uri si tehnologii similare pe selfdezign.ro.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="container space-y-6 text-gray-700 leading-relaxed">
          <p>
            Cookie-urile sunt fisiere mici stocate in browserul tau. Ele ne ajuta sa intelegem cum folosesti site-ul si
            sa imbunatatim experienta.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Ce folosim</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Masurare trafic si interactiuni (Google Analytics 4).</li>
              <li>Marketing si masurare campanii (Meta Pixel).</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Consimtamant</h2>
            <p>
              Poti accepta sau refuza cookie-urile direct din bannerul de consimtamant. Daca refuzi, nu vom initia
              aceste servicii.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black mb-2">Cum dezactivezi cookie-urile</h2>
            <p>
              Poti modifica setarile browserului tau pentru a bloca sau sterge cookie-urile. Retine ca anumite functii
              ale site-ului pot fi afectate.
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Daca ai intrebari, scrie-ne la{" "}
            <a className="underline" href="mailto:hello@selfdezign.ro">
              hello@selfdezign.ro
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

