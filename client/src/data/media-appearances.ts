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
    link: "https://www.romania-insider.com/selfdezign-won-big-see-interior-design-award-2024-workplace-category-designing-ezugis-office",
    category: "award"
  },
  {
    id: 2,
    title: "Irina Stoica, arhitecta care vede oportunități acolo unde alții văd doar ziduri",
    publication: "Revista Cariere",
    date: "2024-08-27",
    description: "Interviu cu Irina Stoica despre viziunea ei în design și abordarea creativă în proiecte.",
    link: "https://www.revistacariere.ro/index.php/leadership/work-life-choices/irina-stoica-arhitecta-care-vede-oportunitati-acolo-unde-altii-vad-doar-ziduri",
    category: "feature"
  },
  {
    id: 3,
    title: "Accor va deschide în iunie 2024 un hotel ibis Styles în stațiunea Venus. Designul creativ a fost conceput de SelfDezign.",
    publication: "B365",
    date: "2024-03-25",
    description: "Lansarea hotelului ibis Styles Venus cu design interior realizat de echipa SelfDezign.",
    link: "https://www.anuala.ro/en/projects/2024/163/",
    category: "press"
  },
  {
    id: 4,
    title: "Cea mai veche cafenea din Bucureşti, premiată pentru arhitectura interioară",
    publication: "Revista BIZ",
    date: "2024-03-05",
    description: "Cafeneaua Veche - o instituție bucureșteană din 1812, reinterpretată prin design modern și premiat.",
    link: "https://www.revistabiz.ro/cafeneaua-veche-9-castiga-premiul-pentru-design-interior-in-cadrul-unei-competitii-europene/",
    category: "award"
  },
  {
    id: 5,
    title: "Cum a reintrat cea mai veche cafenea bucureșteană pe lista noastră de localuri preferate",
    publication: "Designist",
    date: "2023-10-09",
    description: "Reportaj despre transformarea Cafenelei Veche și impactul designului asupra experienței clienților.",
    link: "https://designist.ro/cum-a-reintrat-cea-mai-veche-cafenea-bucuresteana-pe-lista-noastra-de-localuri-preferate/",
    category: "press"
  },
  {
    id: 6,
    title: "Cafeneaua Veche 9",
    publication: "Anuala",
    date: "2022-01-01",
    description: "Prezentare a proiectului Cafeneaua Veche 9 cu detalii despre design și transformare.",
    link: "https://www.anuala.ro/en/projects/2022/254/",
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
    link: "https://www.romania-insider.com/selfdezign-won-big-see-interior-design-award-2024-workplace-category-designing-ezugis-office",
    category: "award"
  },
  {
    id: 2,
    title: "Irina Stoica, architect who sees opportunities where others see only walls",
    publication: "Cariere Magazine",
    date: "2024-08-27",
    description: "Interview with Irina Stoica about her vision in design and creative approach to projects.",
    link: "https://www.revistacariere.ro/index.php/leadership/work-life-choices/irina-stoica-arhitecta-care-vede-oportunitati-acolo-unde-altii-vad-doar-ziduri",
    category: "feature"
  },
  {
    id: 3,
    title: "Accor to open ibis Styles hotel in Venus resort in June 2024. Creative design by SelfDezign.",
    publication: "B365",
    date: "2024-03-25",
    description: "Launch of ibis Styles Venus hotel with interior design by SelfDezign team.",
    link: "https://www.anuala.ro/en/projects/2024/163/",
    category: "press"
  },
  {
    id: 4,
    title: "Bucharest's oldest café awarded for interior architecture",
    publication: "BIZ Magazine",
    date: "2024-03-05",
    description: "Cafeneaua Veche - a Bucharest institution since 1812, reinterpreted through modern and award-winning design.",
    link: "https://www.revistabiz.ro/cafeneaua-veche-9-castiga-premiul-pentru-design-interior-in-cadrul-unei-competitii-europene/",
    category: "award"
  },
  {
    id: 5,
    title: "How Bucharest's oldest café returned to our list of favorite venues",
    publication: "Designist",
    date: "2023-10-09",
    description: "Report on the transformation of Cafeneaua Veche and the impact of design on customer experience.",
    link: "https://designist.ro/cum-a-reintrat-cea-mai-veche-cafenea-bucuresteana-pe-lista-noastra-de-localuri-preferate/",
    category: "press"
  },
  {
    id: 6,
    title: "Cafeneaua Veche 9",
    publication: "Anuala",
    date: "2022-01-01",
    description: "Presentation of the Cafeneaua Veche 9 project with details about design and transformation.",
    link: "https://www.anuala.ro/en/projects/2022/254/",
    category: "feature"
  }
];
