export type LandingLanguage = "it" | "en";

interface LandingLabels {
  skip: string;
  navigation: string;
  home: string;
  services: string;
  projects: string;
  recommendations: string;
  faq: string;
  from: string;
  definition: string;
  to: string;
  release: string;
  projectFlow: string;
  projectPath: string;
  projectStages: [string, string, string];
  alternateLanguage: string;
  cover: string;
  profile: string;
  team: string;
  method: string;
  scope: string;
  work: string;
  trust: string;
  contact: string;
  questions: string;
  social: string;
}

interface LandingServicePillar {
  title: string;
  body: string;
}

interface LandingService {
  title: string;
  subtitle: string;
  paragraphs: string[];
  pillars?: LandingServicePillar[];
}

interface LandingCapability {
  title: string;
  body: string;
}

interface LandingProject {
  name: string;
  context: string;
  description: string[];
  href: string;
  linkLabel: string;
  logoSrc: string;
}

interface LandingRecommendation {
  quote: string;
  initials: string;
}

interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingCopy {
  language: LandingLanguage;
  labels: LandingLabels;
  role: string;
  headline: string;
  heroBody: string[];
  proof: string;
  book: string;
  email: string;
  flowTitle: string;
  flowBody: string;
  introduction: string[];
  services: [LandingService, LandingService];
  approachTitle: string;
  approachSubtitle: string;
  approachParagraphs: string[];
  capabilitiesTitle: string;
  capabilitiesSubtitle: string;
  capabilitiesParagraphs: string[];
  capabilityItems: LandingCapability[];
  projectsTitle: string;
  projects: LandingProject[];
  recommendationsTitle: string;
  recommendations: LandingRecommendation[];
  contactPrompt: string;
  contactLead: string;
  contactTitle: string;
  contactParagraphs: string[];
  faqTitle: string;
  faqs: LandingFaq[];
  footerLocation: string;
}

export const landingCopy: Record<LandingLanguage, LandingCopy> = {
  it: {
    language: "it",
    labels: {
      skip: "Vai al contenuto",
      navigation: "Navigazione principale",
      home: "Silvio Ceccarini, home",
      services: "Servizi",
      projects: "Progetti",
      recommendations: "Testimonianze",
      faq: "FAQ",
      from: "Da",
      definition: "Definizione",
      to: "A",
      release: "Rilascio",
      projectFlow: "Flusso di lavoro",
      projectPath: "Percorso del progetto: analisi, sviluppo e rilascio",
      projectStages: ["Analisi", "Sviluppo", "Rilascio"],
      alternateLanguage: "English",
      cover: "Copertina",
      profile: "Profilo",
      team: "Team",
      method: "Metodo",
      scope: "Competenze",
      work: "Progetti",
      trust: "Testimonianze",
      contact: "Contatto",
      questions: "FAQ",
      social: "Profili professionali",
    },
    role: "Sviluppatore Software Freelance Senior",
    headline: "Sviluppo app da zero. Affianco team web e mobile.",
    heroBody: [
      "Hai un’idea da trasformare in prodotto? Oppure un progetto già avviato e ti serve qualcuno che possa dare una mano al team?",
      "Sono Silvio Ceccarini e mi occupo di sviluppo software custom per startup e aziende.",
      "Costruisco applicazioni da zero, seguendo un progetto dall’analisi al rilascio. Oppure posso inserirmi in un team esistente, contribuendo a rifinire prodotti già avviati, tra frontend, backend e mobile, con lo stack, gli strumenti e il processo già in uso.",
    ],
    proof:
      "7+ anni di esperienza · Startup · Consulenza Software · 10+ realtà Enterprise",
    book: "Prenota una call",
    email: "Scrivimi",
    flowTitle: "Analisi → Sviluppo → Rilascio",
    flowBody:
      "Un unico flusso di lavoro, dalla definizione tecnica alla messa online.",
    introduction: [
      "A volte c’è un’idea da trasformare in un’app.",
      "A volte il progetto è già partito, ma il team ha bisogno di una persona in più.",
      "Altre volte c’è una parte del prodotto che deve essere costruita, migliorata o portata finalmente al rilascio.",
      "Partiamo da quello che ti serve davvero.",
      "Non mi limito alle singole funzionalità.",
      "In questi anni ho lavorato tra startup, consulenza software e realtà Enterprise, entrando in contesti e team differenti.",
      "Quello che cambia è il progetto, ma il mio metodo resta lo stesso: capire cosa serve e trovare il modo più efficace per svilupparlo.",
    ],
    services: [
      {
        title: "Sviluppo app end-to-end",
        subtitle: "Dalla prima definizione, fino al rilascio",
        paragraphs: [
          "Se stai partendo da zero, posso seguire direttamente lo sviluppo software end-to-end della tua applicazione.",
          "Partiamo dall’esigenza concreta, definiamo l’approccio tecnico, l’architettura software, le componenti necessarie e costruiamo il prodotto passo dopo passo, fino al rilascio.",
        ],
      },
      {
        title: "Supporto a team web e mobile",
        subtitle: "Una risorsa tecnica quando il team ne ha bisogno",
        paragraphs: [
          "Il progetto è già avviato ma avete bisogno di rinforzo? Posso entrare nel tuo team.",
          "Se hai già sviluppatori, non devi necessariamente cambiare il tuo modo di lavorare per coinvolgermi.",
          "Mi inserisco nel progetto, imparo a conoscere la codebase, utilizzo lo stack che avete scelto e mi integro nel team, collaborando sulle attività di sviluppo dove serve.",
          "In pratica, aggiungo capacità tecnica al progetto, senza generare attriti.",
        ],
        pillars: [
          {
            title: "Stack",
            body: "Lavoro con le tecnologie che già impiegate.",
          },
          {
            title: "Processo",
            body: "Mi adatto al vostro workflow e agli strumenti che utilizzate.",
          },
          {
            title: "Team",
            body: "Collaboro con le persone già coinvolte nello sviluppo.",
          },
        ],
      },
    ],
    approachTitle: "Come lavoro",
    approachSubtitle: "Sviluppo il software, ma guardo anche il prodotto",
    approachParagraphs: [
      "Scrivere il codice è solo una parte del lavoro.",
      "Quando entro in un progetto, cerco di capire anche come funziona il prodotto e come è costruita la codebase.",
      "Durante lo sviluppo può capitare di trovare una parte che potrebbe essere più veloce, una soluzione che nel tempo rischia di diventare difficile da mantenere o un processo che potrebbe essere semplificato.",
      "Se penso che possa fare davvero la differenza, ne parlo con il team.",
      "Performance, manutenzione, build, deploy sono aspetti su cui intervenire, quando possono migliorare concretamente il progetto.",
      "E quando serve, posso anche contribuire alle scelte tecniche e all’architettura software, non solo alla loro implementazione.",
    ],
    capabilitiesTitle: "Competenze e tecnologie",
    capabilitiesSubtitle:
      "Gli stack sono diversi per ogni progetto, ma il criterio con cui lavoro è sempre lo stesso.",
    capabilitiesParagraphs: [
      "Le tecnologie sono strumenti. La scelta su quali usare dipende dal prodotto, dal progetto e dal modo in cui opera il team.",
      "Ecco perché lavoro allo sviluppo web e mobile, scegliendo prima lo stack più adatto al contesto.",
      "Tra gli stack che utilizzo più spesso:",
    ],
    capabilityItems: [
      { title: "Frontend", body: "React · Next.js · Angular" },
      {
        title: "Backend",
        body: "Node.js · NestJS · Fastify · Elixir",
      },
      { title: "Mobile", body: "React Native" },
      { title: "Database", body: "PostgreSQL" },
      {
        title: "Deploy",
        body: "Build · Deploy · gestione del rilascio",
      },
      {
        title: "Integrazioni AI",
        body: "Integrazione di servizi e funzionalità di intelligenza artificiale quando hanno un’utilità concreta per il prodotto.",
      },
    ],
    projectsTitle: "Alcuni progetti su cui ho lavorato",
    projects: [
      {
        name: "LiberiPro",
        context: "Sviluppo end-to-end",
        description: [
          "Una piattaforma per freelance IT italiani che riunisce clienti, progetti, calendario, portfolio e dati sul mercato.",
          "L’ho progettata e sviluppata da zero, dall’architettura al frontend, dal backend al database e al deploy.",
          "Oggi conta più di 300 membri.",
        ],
        href: "https://www.liberipro.it/",
        linkLabel: "Visita LiberiPro",
        logoSrc: "/images/projects/liberipro.svg",
      },
      {
        name: "APAY E-wallet",
        context: "Admiral Pay · Team mobile",
        description: [
          "Un wallet digitale con oltre 100.000 download, sviluppato per mercati differenti.",
          "Nel team React Native mi sono occupato di automatizzare le build, escludendo i dizionari non necessari per ciascun mercato.",
          "Questo ha permesso di mantenere un’unica codebase e generare pacchetti più leggeri.",
        ],
        href: "https://play.google.com/store/apps/details?id=it.admiralpay",
        linkLabel: "APAY su Google Play",
        logoSrc: "/images/projects/apay.webp",
      },
      {
        name: "indigo.ai",
        context: "Prodotto core · React ed Elixir",
        description: [
          "Una piattaforma enterprise per creare e gestire agenti AI.",
          "Lavoro sul prodotto core tra React ed Elixir, intervenendo sul frontend, sulla user experience e sulle performance.",
          "Un’ottimizzazione ha ridotto di cinque secondi il tempo di avvio, rendendo l’esperienza più fluida.",
        ],
        href: "https://indigo.ai/",
        linkLabel: "Visita indigo.ai",
        logoSrc: "/images/projects/indigo-ai.png",
      },
    ],
    recommendationsTitle: "Cosa dicono di me",
    recommendations: [
      {
        quote: "Professionale e un ottimo collega su cui fare affidamento.",
        initials: "L.S.",
      },
      {
        quote:
          "Un professionista estremamente competente, preciso e affidabile.",
        initials: "E.S.",
      },
      {
        quote:
          "Silvio ha sviluppato e sta migliorando costantemente, per nostro conto, un algoritmo proprietario…",
        initials: "V.C.",
      },
    ],
    contactPrompt: "Hai qualcosa in fase di sviluppo?",
    contactLead: "Parliamone",
    contactTitle: "Possiamo lavorare insieme.",
    contactParagraphs: [
      "Se stai costruendo una nuova applicazione, hai un prodotto web o mobile già avviato oppure il tuo team ha semplicemente bisogno di una persona in più, raccontami cosa stai facendo.",
      "Non serve che tu abbia tutto già definito: dimmi a che punto sei, cosa vuoi costruire e dove ti stai trovando in difficoltà.",
      "Da lì, capiamo insieme se posso esserti utile e quale tipo di collaborazione avrebbe più senso.",
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        question: "Posso coinvolgerti se il progetto è già avviato?",
        answer:
          "Sì. Posso entrare in un team esistente, lavorare sulla codebase e adattarmi allo stack e al processo già utilizzati.",
      },
      {
        question: "Puoi sviluppare un’applicazione da zero?",
        answer:
          "Sì. Posso seguire lo sviluppo end-to-end, dalla definizione tecnica al rilascio.",
      },
      {
        question: "Lavori anche con team già strutturati?",
        answer:
          "Sì. Mi integro nel team e collaboro con le persone già coinvolte nel progetto, senza imporre un nuovo workflow.",
      },
      {
        question: "Puoi lavorare con uno stack che non utilizzi abitualmente?",
        answer:
          "La priorità è il progetto. Se lo stack è coerente con le mie competenze e posso contribuire efficacemente, mi adatto al contesto esistente.",
      },
      {
        question: "Come possiamo capire se puoi essere utile al progetto?",
        answer:
          "Partiamo da una call per capire a che punto siete, cosa state costruendo e di quale tipo di supporto avete bisogno.",
      },
    ],
    footerLocation: "Italia",
  },
  en: {
    language: "en",
    labels: {
      skip: "Skip to content",
      navigation: "Primary navigation",
      home: "Silvio Ceccarini, home",
      services: "Services",
      projects: "Selected work",
      recommendations: "Recommendations",
      faq: "FAQ",
      from: "From",
      definition: "Definition",
      to: "To",
      release: "Release",
      projectFlow: "Workflow",
      projectPath: "Project path: analysis, development and release",
      projectStages: ["Analysis", "Development", "Release"],
      alternateLanguage: "Italiano",
      cover: "Cover",
      profile: "Profile",
      team: "Team",
      method: "Method",
      scope: "Capabilities",
      work: "Selected work",
      trust: "Recommendations",
      contact: "Contact",
      questions: "FAQ",
      social: "Professional profiles",
    },
    role: "Senior Freelance Software Engineer",
    headline: "I build apps from scratch. I support web and mobile teams.",
    heroBody: [
      "Have an idea you want to turn into a product? Or is your project already underway and your team needs an extra pair of hands?",
      "I’m Silvio Ceccarini, and I build custom software for startups and companies.",
      "I build applications from scratch, taking each project from analysis through release. I can also join an existing team and help refine established products across frontend, backend and mobile, using the stack, tools and process already in place.",
    ],
    proof:
      "7+ years of experience · Startups · Software consulting · 10+ enterprise organisations",
    book: "Book a call",
    email: "Email me",
    flowTitle: "Analysis → Development → Release",
    flowBody:
      "One continuous workflow, from technical definition through production.",
    introduction: [
      "Sometimes there is an idea that needs to become an app.",
      "Sometimes the project is already underway, but the team needs one more person.",
      "Other times, one part of the product needs to be built, improved or finally released.",
      "Let’s start with what you actually need.",
      "I don’t limit my contribution to individual features.",
      "Over the years, I have worked across startups, software consultancies and enterprise organisations, joining different contexts and teams.",
      "The project changes, but my method stays the same: understand what is needed and find the most effective way to build it.",
    ],
    services: [
      {
        title: "End-to-end app development",
        subtitle: "From the first definition through release",
        paragraphs: [
          "If you are starting from zero, I can take direct responsibility for the end-to-end development of your application.",
          "We start with the concrete need, define the technical approach, software architecture and required components, then build the product step by step through release.",
        ],
      },
      {
        title: "Web and mobile team support",
        subtitle: "Technical capacity when the team needs it",
        paragraphs: [
          "Is the project already underway, but you need additional support? I can join your team.",
          "If you already have developers, you do not need to change the way you work to involve me.",
          "I join the project, learn the codebase, use the stack you have chosen and integrate with the team, contributing wherever development support is needed.",
          "In practical terms, I add technical capacity to the project without creating friction.",
        ],
        pillars: [
          {
            title: "Stack",
            body: "I work with the technologies you already use.",
          },
          {
            title: "Process",
            body: "I adapt to your workflow and tools.",
          },
          {
            title: "Team",
            body: "I collaborate with the people already building the product.",
          },
        ],
      },
    ],
    approachTitle: "How I work",
    approachSubtitle: "I build the software and pay attention to the product",
    approachParagraphs: [
      "Writing code is only one part of the work.",
      "When I join a project, I also try to understand how the product works and how the codebase is structured.",
      "During development, I may find an area that could be faster, a solution that risks becoming difficult to maintain over time, or a process that could be simplified.",
      "If I believe it can make a meaningful difference, I discuss it with the team.",
      "Performance, maintenance, builds and deployment are all areas worth addressing when they can materially improve the project.",
      "When needed, I can also contribute to technical decisions and software architecture, not only their implementation.",
    ],
    capabilitiesTitle: "Skills and technologies",
    capabilitiesSubtitle:
      "Every project uses a different stack, but the way I evaluate it stays the same.",
    capabilitiesParagraphs: [
      "Technologies are tools. The right choice depends on the product, the project and how the team operates.",
      "That is why I work across web and mobile development, choosing the stack that best fits the context first.",
      "The technologies I use most often include:",
    ],
    capabilityItems: [
      { title: "Frontend", body: "React · Next.js · Angular" },
      {
        title: "Backend",
        body: "Node.js · NestJS · Fastify · Elixir",
      },
      { title: "Mobile", body: "React Native" },
      { title: "Databases", body: "PostgreSQL" },
      {
        title: "Deployment",
        body: "Builds · deployment · release management",
      },
      {
        title: "AI integrations",
        body: "Integrating artificial-intelligence services and features when they have a concrete purpose within the product.",
      },
    ],
    projectsTitle: "Selected work",
    projects: [
      {
        name: "LiberiPro",
        context: "End-to-end development",
        description: [
          "A platform where Italian IT freelancers manage clients, projects, calendars and portfolios, and access real market data.",
          "I designed and developed it from scratch, covering architecture, frontend, backend, database and deployment.",
          "It now has more than 300 members.",
        ],
        href: "https://www.liberipro.it/",
        linkLabel: "Visit LiberiPro",
        logoSrc: "/images/projects/liberipro.svg",
      },
      {
        name: "APAY E-wallet",
        context: "Admiral Pay · Mobile team",
        description: [
          "A digital wallet with more than 100,000 downloads, developed for different markets.",
          "Within the React Native team, I automated the builds and excluded dictionaries that were not required in each market.",
          "This kept the product on one shared codebase while producing lighter packages.",
        ],
        href: "https://play.google.com/store/apps/details?id=it.admiralpay",
        linkLabel: "APAY on Google Play",
        logoSrc: "/images/projects/apay.webp",
      },
      {
        name: "indigo.ai",
        context: "Core product · React and Elixir",
        description: [
          "An enterprise platform for building and managing AI agents.",
          "I work on the core product across React and Elixir, improving the frontend, user experience and performance.",
          "One optimization reduced startup time by five seconds and made the experience more fluid.",
        ],
        href: "https://indigo.ai/",
        linkLabel: "Visit indigo.ai",
        logoSrc: "/images/projects/indigo-ai.png",
      },
    ],
    recommendationsTitle: "What people say about me",
    recommendations: [
      {
        quote: "Professional and an excellent colleague you can rely on.",
        initials: "L.S.",
      },
      {
        quote: "An extremely competent, precise and reliable professional.",
        initials: "E.S.",
      },
      {
        quote:
          "Silvio developed a proprietary algorithm for us and continues to improve it.",
        initials: "V.C.",
      },
    ],
    contactPrompt: "Building something?",
    contactLead: "Let’s talk",
    contactTitle: "We can work together.",
    contactParagraphs: [
      "If you are building a new application, already have a web or mobile product underway, or simply need one more person on the team, tell me what you are working on.",
      "You do not need to have everything defined: tell me where you are, what you want to build and where you are running into difficulty.",
      "From there, we can work out whether I can help and what kind of collaboration makes the most sense.",
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        question: "Can I involve you after a project has already started?",
        answer:
          "Yes. I can join an existing team, work within the codebase and adapt to the stack and process already in use.",
      },
      {
        question: "Can you build an application from scratch?",
        answer:
          "Yes. I can take care of end-to-end development, from technical definition through release.",
      },
      {
        question: "Do you work with established teams?",
        answer:
          "Yes. I integrate with the team and collaborate with the people already involved in the project without imposing a new workflow.",
      },
      {
        question: "Can you work with a stack you do not use regularly?",
        answer:
          "The project comes first. If the stack is compatible with my skills and I can contribute effectively, I adapt to the existing context.",
      },
      {
        question: "How can we tell whether you can help with our project?",
        answer:
          "We start with a call to understand where you are, what you are building and what kind of support you need.",
      },
    ],
    footerLocation: "Italy",
  },
};
