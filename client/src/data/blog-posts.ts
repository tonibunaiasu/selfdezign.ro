export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  relatedProjects?: string[];
  faqs: { question: string; answer: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "tendinte-design-interior-2025",
    title: "Tendințe în Design Interior pentru 2025: Întoarcerea la Natură și Tehnologie Invizibilă",
    excerpt: "Descoperă cum anul 2025 redefinește spațiile noastre prin materiale sustenabile, culori inspirate din pământ și integrarea subtilă a tehnologiei smart home.",
    author: "Arh. Irina Stoica",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    tags: ["Tendințe 2025", "Sustenabilitate", "Smart Home", "Biophilic Design"],
    relatedProjects: ["bloom-specialty-coffee", "cafeneaua-veche-9", "bucharest-comfort-suites"],
    content: `
      <h2>Reconectarea cu esențialul</h2>
      <p>Într-o lume tot mai digitalizată, tendințele de design interior pentru 2025 marchează o nevoie profundă de reconectare cu lumea fizică, naturală. Nu mai vorbim doar despre a adăuga o plantă într-un colț, ci despre <strong>Biophilic Design 2.0</strong> - o integrare structurală a naturii în spațiile de locuit și de lucru.</p>
      
      <h3>Materiale care "respiră"</h3>
      <p>Vedetele anului 2025 sunt materialele neprelucrate, imperfecte, care poartă amprenta timpului și a originii lor naturale:</p>
      <ul>
        <li><strong>Lemnul brut:</strong> Cu noduri vizibile și textură tactilă.</li>
        <li><strong>Piatra naturală:</strong> Travertin și calcar în forme organice, nu doar plăci perfect tăiate.</li>
        <li><strong>Tencuieli de lut:</strong> Pereți care reglează umiditatea și oferă o căldură vizuală unică.</li>
      </ul>

      <h2>Tehnologia Invizibilă (Shy Tech)</h2>
      <p>Dacă anii trecuți erau despre ecrane peste tot, 2025 aduce conceptul de <em>Shy Tech</em>. Tehnologia este omniprezentă, dar invizibilă. Senzorii sunt ascunși în materiale, ecranele devin transparente sau se retrag când nu sunt folosite, iar iluminatul inteligent imită perfect ritmul circadian natural fără a vedea sursa de lumină.</p>

      <blockquote>
        "Luxul în 2025 nu se mai măsoară în opulență, ci în calitatea timpului petrecut într-un spațiu care îți anticipează nevoile fără a te agresa vizual." - Arh. Irina Stoica
      </blockquote>

      <h2>Cromatica Anului: "Grounded Earth"</h2>
      <p>Paleta de culori se îndepărtează de griurile reci ale minimalismului industrial și îmbrățișează tonuri calde, pământii:</p>
      <ul>
        <li>Teracotă stinsă</li>
        <li>Verde măsliniu profund</li>
        <li>Bej nisipiu și ocru</li>
        <li>Albastru mineral</li>
      </ul>

      <h2>Sustenabilitatea ca Standard, nu Opțiune</h2>
      <p>Nu mai este suficient ca un material să fie frumos. Clienții întreabă acum: "De unde vine?", "Cum a fost produs?", "Ce se întâmplă cu el la finalul vieții?". Upcycling-ul pieselor de mobilier și folosirea materialelor locale pentru a reduce amprenta de carbon devin norme în proiectele de lux.</p>
    `,
    faqs: [
      {
        question: "Care este principala tendință de design interior în 2025?",
        answer: "Principala tendință este Biophilic Design 2.0, care pune accent pe materiale naturale brute, forme organice și o conexiune profundă cu natura, completată de tehnologie invizibilă."
      },
      {
        question: "Ce culori se poartă în amenajările interioare în 2025?",
        answer: "Paleta anului 2025 este dominată de tonuri pământii și calde: teracotă, verde măsliniu, bejuri naturale și nuanțe minerale, renunțând la griurile reci."
      },
      {
        question: "Ce înseamnă 'Shy Tech' în designul interior?",
        answer: "'Shy Tech' sau tehnologia timidă se referă la integrarea dispozitivelor smart home într-un mod discret, ascuns vederii, astfel încât să nu perturbe estetica spațiului."
      },
      {
        question: "Cum pot integra sustenabilitatea în renovarea casei mele?",
        answer: "Poți alege materiale locale (pentru a reduce transportul), finisaje naturale (lemn, piatră, var), poți recondiționa mobilier vechi și poți investi în sisteme eficiente energetic."
      }
    ]
  },
  {
    id: "2",
    slug: "cum-alegi-lumina-perfecta",
    title: "Ghid Complet: Cum alegi lumina perfectă pentru fiecare cameră",
    excerpt: "Lumina poate transforma complet atmosfera unei încăperi. Află diferența dintre lumina caldă și rece și cum să stratifici iluminatul pentru un efect wow.",
    author: "Echipa SelfDezign",
    date: "2024-11-28",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=2535&auto=format&fit=crop",
    tags: ["Iluminat", "Ghid Practic", "Atmosferă"],
    relatedProjects: ["global-leader-gaming", "prima-development", "restaurant-poeme"],
    content: `
      <p>Iluminatul este adesea subestimat în designul interior, deși este elementul care dictează atmosfera. O cameră superb mobilată poate arăta ternă cu o lumină nepotrivită.</p>
      <h2>Cele 3 straturi ale iluminatului</h2>
      <p>Un iluminat corect se bazează pe stratificare:</p>
      <ol>
        <li><strong>Iluminatul ambiental:</strong> Lumina generală (lustre, spoturi încastrate).</li>
        <li><strong>Iluminatul de lucru (Task lighting):</strong> Pentru citit, gătit, machiaj (veioze, benzi LED sub dulapuri).</li>
        <li><strong>Iluminatul de accent:</strong> Pentru a evidenția tablouri, texturi sau plante.</li>
      </ol>
    `,
    faqs: [
      {
        question: "Ce fel de lumină este recomandată pentru dormitor?",
        answer: "Pentru dormitor se recomandă o lumină caldă (2700K - 3000K) care favorizează relaxarea și pregătirea pentru somn."
      },
      {
        question: "Cum calculez de câtă lumină am nevoie într-o cameră?",
        answer: "O regulă generală este de aproximativ 20-30 lumeni pe metru pătrat pentru iluminat ambiental, dar necesarul crește în bucătărie sau baie."
      }
    ]
  }
];
