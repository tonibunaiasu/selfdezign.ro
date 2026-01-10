export type Language = 'ro' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    team: string;
    projects: string;
    contact: string;
    blog: string;
    media: string;
    bookCall: string;
    bookConsultation: string;
  };
  // Homepage
  home: {
    tagline: string;
    heroTitlePrefix: string;
    heroTitleEmphasis: string;
    heroDescription: string;
    discoverProjects: string;
    contactUs: string;
    featuredProject: string;
    awardsTitle: string;
    awardsSubtitle: string;
    stats: {
      awards: string;
      projects: string;
      area: string;
      since: string;
    };
    aboutTitle: string;
    aboutDescription1: string;
    aboutDescription2: string;
    aboutDescription3: string;
    learnMore: string;
    founderTitle: string;
    founderName: string;
    founderRole: string;
  };
  // About page
  about: {
    title: string;
    subtitle: string;
    notAbout1: string;
    notAbout2: string;
    notAbout3: string;
    isAbout1: string;
    isAbout2: string;
    isAbout3: string;
    isAbout4: string;
    conclusion1: string;
    conclusion2: string;
    signature: string;
    visionLink: string;
    valuesLink: string;
  };
  // Vision page
  vision: {
    title: string;
    subtitle: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    whyTitle: string;
    whyText: string;
    aboutLink: string;
    valuesLink: string;
  };
  // Values page
  values: {
    title: string;
    subtitle: string;
    valuesTitle: string;
    principlesTitle: string;
    aboutLink: string;
    visionLink: string;
    value1Title: string;
    value1Text: string;
    value2Title: string;
    value2Text: string;
    value3Title: string;
    value3Text: string;
    value4Title: string;
    value4Text: string;
    value5Title: string;
    value5Text: string;
    value6Title: string;
    value6Text: string;
    principle1: string;
    principle2: string;
    principle3: string;
    principle4: string;
    principle5: string;
  };
  // Team page
  team: {
    title: string;
    subtitle: string;
    description: string;
  };
  // Projects page
  projects: {
    title: string;
    subtitle: string;
    allCategories: string;
    viewProject: string;
    categories: {
      restaurant: string;
      office: string;
      hotel: string;
      comercial: string;
      brandExperience: string;
      rezidential: string;
    };
  };
  // Project detail
  projectDetail: {
    year: string;
    status: string;
    location: string;
    photographer: string;
    gallery: string;
    backToProjects: string;
    relatedProjects: string;
  };
  // Contact page
  contact: {
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    trustNote: string;
    responseTime: string;
    infoTitle: string;
    addressTitle: string;
    address1: string;
    address2: string;
    phoneTitle: string;
    emailTitle: string;
    scheduleTitle: string;
    schedule: string;
  };
  // Blog page
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    readTime: string;
    relatedArticles: string;
    faqTitle: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    ctaWhatsapp: string;
    tagsTitle: string;
    relatedProjects: string;
  };
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    newsletter: string;
    newsletterText: string;
    emailPlaceholder: string;
    subscribe: string;
    subscribeSuccess: string;
    subscribeError: string;
    alreadySubscribed: string;
    rights: string;
    schedule: string;
    scheduleTime: string;
    visitTitle: string;
    visitAddress: string;
    visitNote: string;
    officesTitle: string;
    office1Label: string;
    office1Address: string;
    office2Label: string;
    office2Address: string;
    followUs: string;
    tagline: string;
  };
  // Common
  common: {
    loading: string;
    error: string;
    notFound: string;
    backHome: string;
  };
}

export const translations: Record<Language, Translations> = {
  ro: {
    nav: {
      home: "Acasă",
      about: "Despre",
      team: "Echipa",
      projects: "Proiecte",
      contact: "Contact",
      blog: "Blog",
      media: "În presă",
      bookCall: "Cere o ofertă",
      bookConsultation: "Consultanță 45 min"
    },
    home: {
      tagline: "YOU ARE THE DESIGNER",
      heroTitlePrefix: "Design interior pentru",
      heroTitleEmphasis: "cine ești.",
      heroDescription: "Proiectăm experiențe care îți susțin identitatea.",
      discoverProjects: "Descoperă Proiectele",
      contactUs: "Cere o ofertă",
      featuredProject: "PROIECT RECOMANDAT",
      awardsTitle: "Premii & Distincții",
      awardsSubtitle: "Recunoaștere pentru excelență în design interior",
      stats: {
        awards: "Premii și distincții",
        projects: "Proiecte finalizate",
        area: "m² proiectați",
        since: "Din 2018"
      },
      aboutTitle: "Despre SelfDezign",
      aboutDescription1: "SelfDezign este un studio de design interior fondat în 2015, specializat în proiecte comerciale și rezidențiale.",
      aboutDescription2: "Credem că designul interior nu este doar despre estetică, ci despre crearea unor spații care reflectă personalitatea și valorile celor care le locuiesc.",
      aboutDescription3: "Fiecare proiect este o colaborare strânsă cu clientul, pentru a transforma viziunea în realitate.",
      learnMore: "Află mai multe",
      founderTitle: "Fondator & Lead Designer",
      founderName: "Arh. Irina Stoica",
      founderRole: "Cu peste 15 ani de experiență în design interior, Irina conduce echipa SelfDezign cu pasiune și dedicare."
    },
    about: {
      title: "Despre SelfDezign",
      subtitle: "Design pentru cine ești. Creat din arhitectura personalității tale.",
      notAbout1: "Designul interior nu e despre industria creativilor din Palatul de Cleștar.",
      notAbout2: "Nu e despre portofoliul unui arhitect 'vedetă'.",
      notAbout3: "Nu e despre cât de bine arată sufrageria ta într-o revistă în care nu locuiește nimeni.",
      isAbout1: "E despre bătăile inimii tale la 7 dimineața.",
      isAbout2: "E despre liniștea pe care o simți când închizi ușa după 10 ore de haos.",
      isAbout3: "E despre lumea la care visezi. Despre proiectele pentru care cauți sens și energie.",
      isAbout4: "E despre starea ta de bine, nu despre egoul lor.",
      conclusion1: "Unii designeri vor să-și lase semnătura pe pereții tăi.",
      conclusion2: "La SelfDezign construim spațiul care îți permite să ți-o lași tu.",
      signature: "Nu proiectăm pentru Instagram. Proiectăm pentru oameni și branduri care vor spații autentice, funcționale și memorabile.",
      visionLink: "Viziune & Misiune",
      valuesLink: "Principii & Valori"
    },
    vision: {
      title: "Viziune & Misiune",
      subtitle: "Încotro mergem și de ce existăm",
      visionTitle: "Viziunea Noastră",
      visionText: "Să redefinim standardele designului interior în România, demonstrând că spațiile în care trăim și muncim pot fi atât funcționale, cât și profund personale. Ne imaginăm o lume în care fiecare interior spune o poveste autentică.",
      missionTitle: "Misiunea Noastră",
      missionText: "Să creăm spații care îmbunătățesc calitatea vieții oamenilor, punând nevoile și personalitatea clientului în centrul fiecărui proiect. Transformăm visele în realitate prin design inteligent, materiale de calitate și atenție la detalii.",
      whyTitle: "De Ce Existăm",
      whyText: "Existăm pentru că am văzut prea multe spații create pentru ego-ul designerului, nu pentru binele locatarului. Am fondat SelfDezign din dorința de a oferi o alternativă: un design care te pune pe tine pe primul loc.",
      aboutLink: "Despre Noi",
      valuesLink: "Principii & Valori"
    },
    values: {
      title: "Principii & Valori",
      subtitle: "Ce ne ghidează în tot ceea ce facem",
      valuesTitle: "Valorile Noastre",
      principlesTitle: "Principiile de Lucru",
      aboutLink: "Despre Noi",
      visionLink: "Viziune & Misiune",
      value1Title: "Autenticitate",
      value1Text: "Fiecare proiect reflectă personalitatea unică a clientului, nu tendințele de moment sau preferințele noastre personale.",
      value2Title: "Funcționalitate",
      value2Text: "Un spațiu frumos care nu funcționează bine este un eșec. Prioritizăm întotdeauna utilitatea alături de estetică.",
      value3Title: "Colaborare",
      value3Text: "Designul este un dialog continuu. Ascultăm, întrebăm, propunem și ajustăm până când rezultatul este exact ce ai visat.",
      value4Title: "Calitate",
      value4Text: "De la materiale la execuție, nu facem compromisuri. Fiecare detaliu contează în crearea unui spațiu de durată.",
      value5Title: "Transparență",
      value5Text: "Comunicăm deschis despre bugete, termene și provocări. Nu există surprize neplăcute în colaborarea cu noi.",
      value6Title: "Sustenabilitate",
      value6Text: "Alegem materiale și soluții care respectă mediul înconjurător, fără a compromite estetica sau durabilitatea.",
      principle1: "Ascultăm înainte de a desena",
      principle2: "Respectăm bugetul stabilit",
      principle3: "Livrăm la timp, fără excepții",
      principle4: "Comunicăm proactiv și constant",
      principle5: "Garantăm satisfacția clientului"
    },
    team: {
      title: "Echipa Noastră",
      subtitle: "Oamenii din spatele proiectelor SelfDezign",
      description: "Suntem o echipă de profesioniști pasionați de design, arhitectură și crearea spațiilor care inspiră."
    },
    projects: {
      title: "Proiectele Noastre",
      subtitle: "Explorează portofoliul nostru de proiecte de design interior",
      allCategories: "Toate",
      viewProject: "Vezi Proiect",
      categories: {
        restaurant: "Restaurant",
        office: "Office",
        hotel: "Hotel",
        comercial: "Comercial",
        brandExperience: "Brand Experience",
        rezidential: "Rezidențial"
      }
    },
    projectDetail: {
      year: "An",
      status: "Status",
      location: "Locație",
      photographer: "Fotograf",
      gallery: "Galerie Foto",
      backToProjects: "Înapoi la Proiecte",
      relatedProjects: "Proiecte Similare"
    },
    contact: {
      title: "Contact",
      subtitle: "Hai să discutăm despre proiectul tău",
      formTitle: "Trimite-ne un mesaj",
      nameLabel: "Nume complet",
      namePlaceholder: "Numele tău",
      emailLabel: "Email",
      emailPlaceholder: "email@exemplu.ro",
      phoneLabel: "Telefon",
      phonePlaceholder: "+40 7XX XXX XXX",
      subjectLabel: "Subiect",
      subjectPlaceholder: "Despre ce vrei să discutăm?",
      messageLabel: "Mesaj",
      messagePlaceholder: "Spune-ne mai multe despre proiectul tău...",
      sendButton: "Trimite Mesajul",
      sending: "Se trimite...",
      successMessage: "Mesajul a fost trimis cu succes!",
      errorMessage: "A apărut o eroare. Te rugăm să încerci din nou.",
      trustNote: "Estimare inițială gratuită.",
      responseTime: "Răspundem în 24h.",
      infoTitle: "Informații de Contact",
      addressTitle: "Adresă",
      address1: "Sky Tower, Calea Floreasca nr. 246C",
      address2: "Etaj 18, București 014476",
      phoneTitle: "Telefon",
      emailTitle: "Email",
      scheduleTitle: "Program",
      schedule: "Luni - Vineri: 09:00 - 18:00"
    },
    blog: {
      title: "Blog",
      subtitle: "Articole, tendințe și inspirație în design interior",
      readMore: "Citește mai mult",
      readTime: "min de citit",
      relatedArticles: "Articole Similare",
      faqTitle: "Întrebări Frecvente",
      ctaTitle: "Cere o ofertă personalizată",
      ctaText: "Spune-ne despre proiectul tău și revenim cu o propunere clară, rapidă.",
      ctaButton: "Cere o ofertă",
      ctaWhatsapp: "Scrie-ne pe WhatsApp",
      tagsTitle: "Tag",
      relatedProjects: "Proiecte relevante"
    },
    footer: {
      description: "Studio de design interior specializat în proiecte comerciale și rezidențiale. Transformăm spațiile în experiențe.",
      quickLinks: "Link-uri Rapide",
      contact: "Contact",
      newsletter: "Newsletter",
      newsletterText: "Abonează-te pentru noutăți și inspirație în design.",
      emailPlaceholder: "Adresa ta de email",
      subscribe: "Abonează-te",
      subscribeSuccess: "Te-ai abonat cu succes!",
      subscribeError: "A apărut o eroare. Încearcă din nou.",
      alreadySubscribed: "Ești deja abonat!",
      rights: "Toate drepturile rezervate.",
      schedule: "Program de lucru",
      scheduleTime: "Luni - Vineri, 09:00 - 18:00",
      visitTitle: "Vizite la birou",
      visitAddress: "Sky Tower, Calea Floreasca nr. 246C, etaj 18, București 014476",
      visitNote: "Doar cu programare",
      officesTitle: "Birouri",
      office1Label: "B1",
      office1Address: "Strada Politiei, nr. 3, București",
      office2Label: "B2",
      office2Address: "Sky Tower, Calea Floreasca nr. 246C, etaj 18, București",
      followUs: "Urmărește-ne",
      tagline: "Din arhitectura personalității tale."
    },
    common: {
      loading: "Se încarcă...",
      error: "A apărut o eroare",
      notFound: "Pagina nu a fost găsită",
      backHome: "Înapoi acasă"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      team: "Team",
      projects: "Projects",
      contact: "Contact",
      blog: "Blog",
      media: "As Seen On",
      bookCall: "Request a quote",
      bookConsultation: "45-min consult"
    },
    home: {
      tagline: "YOU ARE THE DESIGNER",
      heroTitlePrefix: "Interior design for",
      heroTitleEmphasis: "who you are.",
      heroDescription: "We design experiences that support your identity.",
      discoverProjects: "Discover Projects",
      contactUs: "Request a quote",
      featuredProject: "FEATURED PROJECT",
      awardsTitle: "Awards & Distinctions",
      awardsSubtitle: "Recognition for excellence in interior design",
      stats: {
        awards: "Awards and distinctions",
        projects: "Projects delivered",
        area: "m² designed",
        since: "Since 2018"
      },
      aboutTitle: "About SelfDezign",
      aboutDescription1: "SelfDezign is an interior design studio founded in 2015, specializing in commercial and residential projects.",
      aboutDescription2: "We believe interior design is not just about aesthetics, but about creating spaces that reflect the personality and values of those who inhabit them.",
      aboutDescription3: "Each project is a close collaboration with the client, to transform vision into reality.",
      learnMore: "Learn More",
      founderTitle: "Founder & Lead Designer",
      founderName: "Arch. Irina Stoica",
      founderRole: "With over 15 years of experience in interior design, Irina leads the SelfDezign team with passion and dedication."
    },
    about: {
      title: "About SelfDezign",
      subtitle: "Design for who you are. Created from the architecture of your personality.",
      notAbout1: "Interior design is not about the creative industry in the Crystal Palace.",
      notAbout2: "It's not about a \"star\" architect's portfolio.",
      notAbout3: "It's not about how good your living room looks in a magazine where no one lives.",
      isAbout1: "It's about your heartbeat at 7 in the morning.",
      isAbout2: "It's about the peace you feel when you close the door after 10 hours of chaos.",
      isAbout3: "It's about the world you dream of. About the projects for which you seek meaning and energy.",
      isAbout4: "It's about your well-being, not their ego.",
      conclusion1: "Some designers want to leave their signature on your walls.",
      conclusion2: "At SelfDezign, we build the space that allows you to leave yours.",
      signature: "We don’t design for Instagram. We design for people and brands who want authentic, functional, memorable spaces.",
      visionLink: "Vision & Mission",
      valuesLink: "Principles & Values"
    },
    vision: {
      title: "Vision & Mission",
      subtitle: "Where we're going and why we exist",
      visionTitle: "Our Vision",
      visionText: "To redefine interior design standards in Romania, demonstrating that the spaces we live and work in can be both functional and deeply personal. We envision a world where every interior tells an authentic story.",
      missionTitle: "Our Mission",
      missionText: "To create spaces that improve people's quality of life, putting the client's needs and personality at the center of every project. We transform dreams into reality through intelligent design, quality materials, and attention to detail.",
      whyTitle: "Why We Exist",
      whyText: "We exist because we've seen too many spaces created for the designer's ego, not for the inhabitant's well-being. We founded SelfDezign out of a desire to offer an alternative: design that puts you first.",
      aboutLink: "About Us",
      valuesLink: "Principles & Values"
    },
    values: {
      title: "Principles & Values",
      subtitle: "What guides us in everything we do",
      valuesTitle: "Our Values",
      principlesTitle: "Working Principles",
      aboutLink: "About Us",
      visionLink: "Vision & Mission",
      value1Title: "Authenticity",
      value1Text: "Each project reflects the client's unique personality, not current trends or our personal preferences.",
      value2Title: "Functionality",
      value2Text: "A beautiful space that doesn't work well is a failure. We always prioritize utility alongside aesthetics.",
      value3Title: "Collaboration",
      value3Text: "Design is a continuous dialogue. We listen, ask, propose, and adjust until the result is exactly what you dreamed of.",
      value4Title: "Quality",
      value4Text: "From materials to execution, we don't compromise. Every detail matters in creating a lasting space.",
      value5Title: "Transparency",
      value5Text: "We communicate openly about budgets, deadlines, and challenges. There are no unpleasant surprises when working with us.",
      value6Title: "Sustainability",
      value6Text: "We choose materials and solutions that respect the environment, without compromising aesthetics or durability.",
      principle1: "We listen before we draw",
      principle2: "We respect the established budget",
      principle3: "We deliver on time, without exceptions",
      principle4: "We communicate proactively and constantly",
      principle5: "We guarantee client satisfaction"
    },
    team: {
      title: "Our Team",
      subtitle: "The people behind SelfDezign projects",
      description: "We are a team of professionals passionate about design, architecture, and creating inspiring spaces."
    },
    projects: {
      title: "Our Projects",
      subtitle: "Explore our interior design portfolio",
      allCategories: "All",
      viewProject: "View Project",
      categories: {
        restaurant: "Restaurant",
        office: "Office",
        hotel: "Hotel",
        comercial: "Commercial",
        brandExperience: "Brand Experience",
        rezidential: "Residential"
      }
    },
    projectDetail: {
      year: "Year",
      status: "Status",
      location: "Location",
      photographer: "Photographer",
      gallery: "Photo Gallery",
      backToProjects: "Back to Projects",
      relatedProjects: "Related Projects"
    },
    contact: {
      title: "Contact",
      subtitle: "Let's discuss your project",
      formTitle: "Send us a message",
      nameLabel: "Full name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+40 7XX XXX XXX",
      subjectLabel: "Subject",
      subjectPlaceholder: "What would you like to discuss?",
      messageLabel: "Message",
      messagePlaceholder: "Tell us more about your project...",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "An error occurred. Please try again.",
      trustNote: "Free initial estimate.",
      responseTime: "We reply within 24h.",
      infoTitle: "Contact Information",
      addressTitle: "Address",
      address1: "Sky Tower, Calea Floreasca no. 246C",
      address2: "Floor 18, Bucharest 014476",
      phoneTitle: "Phone",
      emailTitle: "Email",
      scheduleTitle: "Schedule",
      schedule: "Monday - Friday: 09:00 - 18:00"
    },
    blog: {
      title: "Blog",
      subtitle: "Articles, trends, and inspiration in interior design",
      readMore: "Read more",
      readTime: "min read",
      relatedArticles: "Related Articles",
      faqTitle: "Frequently Asked Questions",
      ctaTitle: "Request a tailored quote",
      ctaText: "Tell us about your project and we’ll come back with a clear proposal fast.",
      ctaButton: "Request a quote",
      ctaWhatsapp: "Message us on WhatsApp",
      tagsTitle: "Tag",
      relatedProjects: "Related projects"
    },
    footer: {
      description: "Interior design studio specializing in commercial and residential projects. We transform spaces into experiences.",
      quickLinks: "Quick Links",
      contact: "Contact",
      newsletter: "Newsletter",
      newsletterText: "Subscribe for news and design inspiration.",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
      subscribeSuccess: "Successfully subscribed!",
      subscribeError: "An error occurred. Try again.",
      alreadySubscribed: "You're already subscribed!",
      rights: "All rights reserved.",
      schedule: "Working hours",
      scheduleTime: "Monday - Friday, 09:00 - 18:00",
      visitTitle: "Office visits",
      visitAddress: "Sky Tower, Calea Floreasca no. 246C, floor 18, Bucharest 014476",
      visitNote: "By appointment only",
      officesTitle: "Studios",
      office1Label: "B1",
      office1Address: "Strada Politiei 3, Bucharest",
      office2Label: "B2",
      office2Address: "Sky Tower, Calea Floreasca 246C, floor 18, Bucharest",
      followUs: "Follow us",
      tagline: "From the architecture of your personality."
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      notFound: "Page not found",
      backHome: "Back home"
    }
  }
};
