export type LandingLanguage = "it" | "en";

export interface LandingCopy {
  language: LandingLanguage;
  role: string;
  headline: string;
  intro: string;
  proof: string;
  book: string;
  email: string;
  services: Array<{ title: string; body: string }>;
  approachTitle: string;
  approachBody: string;
  capabilitiesTitle: string;
  capabilitiesBody: string;
  capabilities: string[];
  recommendationsTitle: string;
  recommendations: Array<{ quote: string; initials: string }>;
  contactTitle: string;
  contactBody: string;
  footerNote: string;
}

export const landingCopy: Record<LandingLanguage, LandingCopy> = {
  it: {
    language: "it",
    role: "Senior Freelance Software Engineer",
    headline: "Sviluppo app da zero e affianco team web e mobile.",
    intro:
      "Seguo progetti completi e collaboro su prodotti già avviati. Lavoro tra frontend, backend e mobile, adattandomi allo stack e al modo di lavorare del team.",
    proof:
      "6 anni di esperienza · startup, consulenza e oltre 10 realtà Enterprise",
    book: "Prenota una call",
    email: "Scrivimi",
    services: [
      {
        title: "Sviluppo completo",
        body: "Realizzo applicazioni partendo da un’esigenza concreta e seguo il progetto dalla definizione tecnica al rilascio.",
      },
      {
        title: "Supporto al team",
        body: "Entro in progetti web e mobile già avviati, lavoro con lo stack e il processo esistenti e mi occupo dello sviluppo insieme al team.",
      },
    ],
    approachTitle: "Come lavoro",
    approachBody:
      "Mentre sviluppo, osservo anche il prodotto e la codebase. Quando vedo margini di miglioramento — nelle performance, nella manutenzione, nelle build o nel processo — li porto all’attenzione del team e li affronto quando sono utili al progetto.",
    capabilitiesTitle: "Competenze",
    capabilitiesBody:
      "Lavoro tra frontend, backend e mobile. Mi occupo anche di database, deploy e integrazioni AI quando il progetto lo richiede.",
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
    footerNote: "Silvio Ceccarini · Italia · 2026",
  },
  en: {
    language: "en",
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
        title: "End-to-end development",
        body: "I turn a concrete need into a working application, taking the project from technical definition through release.",
      },
      {
        title: "Team support",
        body: "I join established web and mobile projects, work within the existing stack and process, and contribute alongside the team.",
      },
    ],
    approachTitle: "How I work",
    approachBody:
      "While I’m building, I also pay attention to the product and codebase. When I find practical improvements to performance, maintainability, builds or the development process, I raise them with the team and address them when they serve the project.",
    capabilitiesTitle: "Capabilities",
    capabilitiesBody:
      "I work across frontend, backend and mobile. I also handle databases, deployment and AI integrations when the project calls for them.",
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
    footerNote: "Silvio Ceccarini · Italy · 2026",
  },
};
