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
      backLink: string;
      badge: string;
      title1: string;
      title2: string;
      vision: {
        title: string;
        subtitle: string;
        lead: string;
        p1: string;
        p2: string;
        p3: string;
      };
      mission: {
        title: string;
        subtitle: string;
        lead: string;
        p1: string;
        p2: string;
        p3: string;
      };
      purpose: {
        title: string;
        subtitle: string;
        lead: string;
        p1: string;
        p2: string;
        p3: string;
      };
      prevPage: string;
      prevTitle: string;
      nextPage: string;
      nextTitle: string;
      aboutLink: string;
      valuesLink: string;
    };
  // Values page
  values: {
    backLink: string;
    badge: string;
    title1: string;
    title2: string;
    introLead: string;
    introP1: string;
    introP2: string;
    promiseLead: string;
    promiseP1: string;
    promiseP2: string;
    promiseHighlight: string;
    prevPage: string;
    prevTitle: string;
    nextPage: string;
    nextTitle: string;
    valuesSectionTitle: string;
    principlesSectionTitle: string;
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
    principles: {
      principle1Number: string;
      principle1Title: string;
      principle1Description: string;
      principle2Number: string;
      principle2Title: string;
      principle2Description: string;
      principle3Number: string;
      principle3Title: string;
      principle3Description: string;
      principle4Number: string;
      principle4Title: string;
      principle4Description: string;
      principle5Number: string;
      principle5Title: string;
      principle5Description: string;
    };
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
    homeLink: string;
    notFoundTitle: string;
    notFoundDescription: string;
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
      tagline: "TU EȘTI DESIGNERUL",
      heroTitlePrefix: "Design interior din",
      heroTitleEmphasis: "arhitectura personalității tale.",
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
      aboutDescription1: "SelfDezign este un studio de design interior fondat în 2018, specializat în proiecte comerciale și rezidențiale.",
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
      nextTitle: "Principii & Valori",
      aboutLink: "Despre Noi",
      valuesLink: "Principii & Valori"
    },
    values: {
      backLink: "Înapoi la Viziune & Misiune",
      badge: "Principii & Valori",
      title1: "CE NE GHI",
      title2: "DEAZĂ",
      introLead: "Credem că un spațiu bine proiectat este o fundație solidă pentru o viață împlinită. De aceea, ne ghidăm după principii clare în tot ceea ce facem.",
      introP1: "Fiecare detaliu contează, iar fiecare decizie este luată cu gândul la impactul pe termen lung. Construim relații bazate pe încredere și transparență, pentru că știm că un proiect de succes este rezultatul unei colaborări armonioase.",
      introP2: "De la prima discuție și până la finalizarea proiectului, ne asigurăm că valorile noastre se reflectă în fiecare etapă a procesului. Suntem aici să transformăm viziunea ta într-o realitate tangibilă.",
      promiseLead: "Noi credem că designul interior trebuie să fie o promisiune: o promisiune de a crea un spațiu care nu doar arată bine, ci care te face să te simți bine, care îți susține obiectivele și care evoluează odată cu tine.",
      promiseP1: "Designul este o investiție în bunăstarea ta și în succesul afacerii tale. De aceea, fiecare proiect este abordat cu maximă seriozitate și profesionalism. Ne luăm angajamente și le respectăm, indiferent de provocări.",
      promiseP2: "Angajamentul nostru este să îți oferim nu doar un spațiu, ci o experiență de design memorabilă, adaptată perfect nevoilor și stilului tău de viață.",
      promiseHighlight: "Îți vom livra un spațiu unde te vei simți acasă.",
      prevPage: "Pagina anterioară",
      prevTitle: "Viziune & Misiune",
      nextPage: "Pagina următoare",
      nextTitle: "Echipa",
      valuesSectionTitle: "Valorile Noastre",
      principlesSectionTitle: "Principiile de Lucru",
      aboutLink: "/despre",
      visionLink: "/viziune",
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
      principle1Number: "01",
      principle1Title: "Ascultăm înainte să vorbim",
      principle1Description: "Fiecare proiect începe cu întrebări, nu cu răspunsuri. Vrem să înțelegem cum trăiești, ce te deranjează, ce te face fericit. Abia apoi deschidem caietul de schițe.",
      principle2Number: "02",
      principle2Title: "Designul servește omul, nu invers",
      principle2Description: "Nu vei fi nevoit să-ți schimbi obiceiurile pentru a te potrivi spațiului. Spațiul se va adapta la tine, la rutinele tale, la modul tău unic de a trăi.",
      principle3Number: "03",
      principle3Title: "Transparență totală",
      principle3Description: "Știi exact ce primești, cât costă și când va fi gata. Fără costuri ascunse, fără termene amânate, fără surprize. Comunicarea deschisă este fundația încrederii.",
      principle4Number: "04",
      principle4Title: "Calitate fără compromis",
      principle4Description: "Preferăm să spunem nu unui proiect decât să livrăm ceva sub standardele noastre. Reputația se construiește proiect cu proiect, și fiecare contează.",
      principle5Number: "05",
      principle5Title: "Evoluție continuă",
      principle5Description: "Industria se schimbă, materialele evoluează, tehnicile se îmbunătățesc. Investim constant în educație și experimentare pentru a oferi cele mai bune soluții."
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
      description: "Studio de design interior și arhitectură specializat în proiecte comerciale, HORECA și office. Transformăm spațiile în experiențe.",
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
      backHome: "Înapoi acasă",
      homeLink: "Acasă",
      notFoundTitle: "Pagina nu a fost găsită",
      notFoundDescription: "Ne pare rău, pagina pe care o cauți nu există. Este posibil să fi fost mutată sau ștearsă."
    },
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
      aboutDescription1: "SelfDezign is an interior design studio founded in 2018, specializing in commercial and residential projects.",
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
      nextTitle: "Principles & Values",
      aboutLink: "About Us",
      valuesLink: "Principles & Values",
    },
    values: {
      backLink: "Back to Vision & Mission",
      badge: "Principles & Values",
      title1: "WHAT GUIDES",
      title2: "US",
      introLead: "We believe that a well-designed space is a solid foundation for a fulfilling life. That's why we are guided by clear principles in everything we do.",
      introP1: "Every detail matters, and every decision is made with long-term impact in mind. We build relationships based on trust and transparency, because we know that a successful project is the result of harmonious collaboration.",
      introP2: "From the first discussion to the completion of the project, we ensure that our values are reflected in every stage of the process. We are here to transform your vision into a tangible reality.",
      promiseLead: "We believe that interior design should be a promise: a promise to create a space that not only looks good, but makes you feel good, supports your goals, and evolves with you.",
      promiseP1: "Design is an investment in your well-being and the success of your business. That's why every project is approached with maximum seriousness and professionalism. We make commitments and we respect them, regardless of challenges.",
      promiseP2: "Our commitment is to offer you not just a space, but a memorable design experience, perfectly adapted to your needs and lifestyle.",
      promiseHighlight: "We will deliver a space where you will feel at home.",
      prevPage: "Previous page",
      prevTitle: "Vision & Mission",
      nextPage: "Next page",
      nextTitle: "Team",
      valuesSectionTitle: "Our Values",
      principlesSectionTitle: "Working Principles",
      aboutLink: "/about",
      visionLink: "/vision",
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
      principle1Number: "01",
      principle1Title: "We listen before we speak",
      principle1Description: "Every project starts with questions, not answers. We want to understand how you live, what bothers you, what makes you happy. Only then do we open the sketchbook.",
      principle2Number: "02",
      principle2Title: "Design serves people, not the other way around",
      principle2Description: "You won't have to change your habits to fit the space. The space will adapt to you, to your routines, to your unique way of living.",
      principle3Number: "03",
      principle3Title: "Total transparency",
      principle3Description: "You know exactly what you're getting, how much it costs, and when it will be ready. No hidden costs, no postponed deadlines, no surprises. Open communication is the foundation of trust.",
      principle4Number: "04",
      principle4Title: "Quality without compromise",
      principle4Description: "We'd rather say no to a project than deliver something below our standards. Reputation is built project by project, and each one counts.",
      principle5Number: "05",
      principle5Title: "Continuous evolution",
      principle5Description: "The industry changes, materials evolve, techniques improve. We constantly invest in education and experimentation to offer the best solutions."
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
      description: "Interior design and architecture studio specializing in commercial, hospitality, and office projects. We transform spaces into experiences.",
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
      backHome: "Back home",
      homeLink: "Home",
      notFoundTitle: "Page Not Found",
      notFoundDescription: "Sorry, the page you are looking for doesn't exist. It may have been moved or deleted."
    }
  }
};
