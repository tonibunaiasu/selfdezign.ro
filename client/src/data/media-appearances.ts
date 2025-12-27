export interface MediaAppearance {
  id: number;
  title: string;
  publication: string;
  date: string;
  description: string;
  link: string;
  image?: string;
  category: "award" | "press" | "feature";
}

export const mediaAppearances: MediaAppearance[] = [
  {
    id: 1,
    title: "SelfDezign won the BIG SEE Interior Design Award 2024 in the Workplace category for designing Ezugi's office",
    publication: "Romania-Insider",
    date: "2024-05-20",
    description: "Recunoaștere internațională pentru designul inovator al biroului Ezugi, categoria Workplace.",
    link: "https://www.romania-insider.com",
    category: "award"
  },
  {
    id: 2,
    title: "Irina Stoica, arhitecta care vede oportunități acolo unde alții văd doar ziduri",
    publication: "Revista Cariere",
    date: "2024-08-27",
    description: "Interviu cu Irina Stoica despre viziunea ei în design și abordarea creativă în proiecte.",
    link: "#",
    category: "feature"
  },
  {
    id: 3,
    title: "Accor va deschide în iunie 2024 un hotel ibis Styles în stațiunea Venus. Designul creativ a fost conceput de SelfDezign.",
    publication: "B365",
    date: "2024-03-25",
    description: "Lansarea hotelului ibis Styles Venus cu design interior realizat de echipa SelfDezign.",
    link: "#",
    category: "press"
  },
  {
    id: 4,
    title: "Cea mai veche cafenea din Bucureşti, premiată pentru arhitectura interioară",
    publication: "Revista BIZ",
    date: "2024-03-05",
    description: "Cafeneaua Veche - o instituție bucureșteană din 1812, reinterpretată prin design modern și premiat.",
    link: "#",
    category: "award"
  },
  {
    id: 5,
    title: "Cum a reintrat cea mai veche cafenea bucureșteană pe lista noastră de localuri preferate",
    publication: "Știrile PRO TV",
    date: "2023-10-09",
    description: "Reportaj despre transformarea Cafenelei Veche și impactul designului asupra experienței clienților.",
    link: "#",
    category: "press"
  },
  {
    id: 6,
    title: "SelfDezign - Proiecte de design interior și arhitectură",
    publication: "Designist",
    date: "2023-10-19",
    description: "Prezentare a portofoliului SelfDezign și a abordării creative în designul interior.",
    link: "#",
    category: "feature"
  }
];

export const mediaAppearancesEN: MediaAppearance[] = [
  {
    id: 1,
    title: "SelfDezign won the BIG SEE Interior Design Award 2024 in the Workplace category for designing Ezugi's office",
    publication: "Romania-Insider",
    date: "2024-05-20",
    description: "International recognition for innovative office design for Ezugi, Workplace category.",
    link: "https://www.romania-insider.com",
    category: "award"
  },
  {
    id: 2,
    title: "Irina Stoica, architect who sees opportunities where others see only walls",
    publication: "Cariere Magazine",
    date: "2024-08-27",
    description: "Interview with Irina Stoica about her vision in design and creative approach to projects.",
    link: "#",
    category: "feature"
  },
  {
    id: 3,
    title: "Accor to open ibis Styles hotel in Venus resort in June 2024. Creative design by SelfDezign.",
    publication: "B365",
    date: "2024-03-25",
    description: "Launch of ibis Styles Venus hotel with interior design by SelfDezign team.",
    link: "#",
    category: "press"
  },
  {
    id: 4,
    title: "Bucharest's oldest café awarded for interior architecture",
    publication: "BIZ Magazine",
    date: "2024-03-05",
    description: "Cafeneaua Veche - a Bucharest institution since 1812, reinterpreted through modern and award-winning design.",
    link: "#",
    category: "award"
  },
  {
    id: 5,
    title: "How Bucharest's oldest café returned to our list of favorite venues",
    publication: "PRO TV News",
    date: "2023-10-09",
    description: "Report on the transformation of Cafeneaua Veche and the impact of design on customer experience.",
    link: "#",
    category: "press"
  },
  {
    id: 6,
    title: "SelfDezign - Interior Design and Architecture Projects",
    publication: "Designist",
    date: "2023-10-19",
    description: "Presentation of SelfDezign's portfolio and creative approach to interior design.",
    link: "#",
    category: "feature"
  }
];
