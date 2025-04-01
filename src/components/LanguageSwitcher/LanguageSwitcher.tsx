import { createSignal, onMount } from "solid-js";

export default function LanguageToggle() {
  const defaultLang = "en";
  const [currentLang, setCurrentLang] = createSignal(defaultLang);
  const [toggleHref, setToggleHref] = createSignal("/");

  onMount(() => {
    const pathname = window.location.pathname;
    const lang = getLangFromUrl(pathname, defaultLang);
    setCurrentLang(lang);
    const toggleLang = lang === "en" ? "it" : "en";
    const newHref = buildToggleHref(pathname, toggleLang, defaultLang);
    setToggleHref(newHref);
  });

  const handleClick = (e: Event) => {
    e.preventDefault();
    window.location.href = toggleHref();
  };

  return (
    <div class="fixed bottom-8 right-8 z-50">
      <button
        aria-label="Toggle language"
        onClick={handleClick}
        class="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-primary-500 shadow-lg bg-darkslate-500 transition-transform hover:translate-y-[-4px] hover:shadow-xl focus:outline-none"
      >
        <span class="text-xl">{getLanguageFlag(currentLang())}</span>
      </button>
    </div>
  );
}

function getLanguageFlag(lang: string): string {
  const flagMap: Record<string, string> = {
    en: "🇬🇧",
    it: "🇮🇹",
  };
  return flagMap[lang] || "";
}

function getLangFromUrl(pathname: string, defaultLang: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (segments[0] === "en" || segments[0] === "it")) {
    return segments[0];
  }
  return defaultLang;
}

function buildToggleHref(
  pathname: string,
  toggleLang: string,
  defaultLang: string,
): string {
  let segments = pathname.split("/").filter(Boolean);
  if (segments.length && (segments[0] === "en" || segments[0] === "it")) {
    segments.shift();
  }
  if (toggleLang === defaultLang) {
    return "/" + segments.join("/");
  }
  return "/" + toggleLang + (segments.length ? "/" + segments.join("/") : "/");
}
