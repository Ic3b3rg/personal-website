export type LandingLanguage = "it" | "en";

interface LandingLabels {
  skip: string;
  navigation: string;
  home: string;
  services: string;
  edition: string;
  from: string;
  definition: string;
  to: string;
  release: string;
  process: string;
  projectFlow: string;
  projectPath: string;
  projectStages: [string, string, string];
  alternateLanguage: string;
  cover: string;
  team: string;
  method: string;
  scope: string;
  trust: string;
  contact: string;
  social: string;
}

interface LandingService {
  title: string;
  body: string;
}

interface LandingRecommendation {
  quote: string;
  initials: string;
}

export interface LandingCopy {
  language: LandingLanguage;
  labels: LandingLabels;
  role: string;
  headline: string;
  intro: string;
  proof: string;
  book: string;
  email: string;
  services: [LandingService, LandingService];
  approachTitle: string;
  approachBody: string;
  capabilitiesTitle: string;
  capabilitiesBody: string;
  capabilities: string[];
  recommendationsTitle: string;
  recommendations: LandingRecommendation[];
  contactTitle: string;
  contactBody: string;
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
      edition: "Edizione",
      from: "Da",
      definition: "Definizione",
      to: "A",
      release: "Rilascio",
      process: "Processo",
      projectFlow: "Flusso progetto",
      projectPath: "Percorso del progetto: analisi, sviluppo e rilascio",
      projectStages: ["Analisi", "Sviluppo", "Rilascio"],
      alternateLanguage: "English",
      cover: "Copertina",
      team: "Team",
      method: "Metodo",
      scope: "Competenze",
      trust: "Testimonianze",
      contact: "Contatto",
      social: "Profili professionali",
    },
    role: "Sviluppatore Software Freelance Senior",
    headline: "Sviluppo app da zero e affianco team web e mobile.",
    intro:
      "Seguo progetti completi e collaboro su prodotti già avviati. Lavoro tra frontend, backend e mobile, adattandomi allo stack e al modo di lavorare del team.",
    proof:
      "6 anni di esperienza · startup, consulenza e oltre 10 realtà Enterprise",
    book: "Prenota una call",
    email: "Scrivimi",
    services: [
      {
        title: "Sviluppo app end-to-end",
        body: "Realizzo applicazioni partendo da un’esigenza concreta e seguo il progetto dalla definizione tecnica al rilascio.",
      },
      {
        title: "Supporto a team web e mobile",
        body: "Entro in progetti web e mobile già avviati, lavoro con lo stack e il processo esistenti e mi occupo dello sviluppo insieme al team.",
      },
    ],
    approachTitle: "Come lavoro",
    approachBody:
      "Mentre sviluppo, osservo anche il prodotto e la codebase. Quando vedo margini di miglioramento nelle performance, nella manutenzione, nelle build o nel processo, li porto all’attenzione del team e li affronto quando sono utili al progetto.",
    capabilitiesTitle: "Competenze e tecnologie",
    capabilitiesBody:
      "Lavoro con React, Next.js e Angular sul frontend; Node.js, NestJS, Fastify, PostgreSQL ed Elixir sul backend. Sviluppo app React Native e integro servizi come Twilio e funzionalità AI quando servono al prodotto.",
    capabilities: [
      "Frontend",
      "Backend",
      "Mobile",
      "Database",
      "Deploy",
      "Integrazioni AI",
    ],
    recommendationsTitle: "Testimonianze",
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
    contactTitle: "Possiamo lavorare insieme.",
    contactBody:
      "Se stai sviluppando una nuova applicazione o cerchi supporto per un prodotto già avviato, possiamo parlarne.",
    footerLocation: "Italia",
  },
  en: {
    language: "en",
    labels: {
      skip: "Skip to content",
      navigation: "Primary navigation",
      home: "Silvio Ceccarini, home",
      services: "Services",
      edition: "Edition",
      from: "From",
      definition: "Definition",
      to: "To",
      release: "Release",
      process: "Process",
      projectFlow: "Project flow",
      projectPath: "Project path: analysis, development and release",
      projectStages: ["Analysis", "Development", "Release"],
      alternateLanguage: "Italiano",
      cover: "Cover",
      team: "Team",
      method: "Method",
      scope: "Capabilities",
      trust: "Recommendations",
      contact: "Contact",
      social: "Professional profiles",
    },
    role: "Senior Freelance Software Engineer",
    headline: "I build apps from scratch and support web and mobile teams.",
    intro:
      "I take on complete projects and contribute to established products. I work across frontend, backend and mobile, adapting to the team’s stack and way of working.",
    proof:
      "6 years of experience · startups, consultancies and 10+ enterprise organisations",
    book: "Book a call",
    email: "Email me",
    services: [
      {
        title: "End-to-end app development",
        body: "I turn a concrete need into a working application, taking the project from technical definition through release.",
      },
      {
        title: "Web and mobile team support",
        body: "I join established web and mobile projects, work within the existing stack and process, and contribute alongside the team.",
      },
    ],
    approachTitle: "How I work",
    approachBody:
      "While I’m building, I also pay attention to the product and codebase. When I find practical improvements to performance, maintainability, builds or the development process, I raise them with the team and address them when they serve the project.",
    capabilitiesTitle: "Skills and technologies",
    capabilitiesBody:
      "I work with React, Next.js and Angular on the frontend; Node.js, NestJS, Fastify, PostgreSQL and Elixir on the backend. I also build React Native apps and integrate services such as Twilio and AI features when they support the product.",
    capabilities: [
      "Frontend",
      "Backend",
      "Mobile",
      "Databases",
      "Deployment",
      "AI integrations",
    ],
    recommendationsTitle: "Recommendations",
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
    contactTitle: "Let’s work together.",
    contactBody:
      "If you’re building a new application or need support on an established product, let’s talk.",
    footerLocation: "Italy",
  },
};
