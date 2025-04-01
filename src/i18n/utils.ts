import { ui, defaultLang } from "./ui";

export function getLangFromUrl(pathname: string) {
  const [, lang] = pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations({ pathname }: URL) {
  const lang = getLangFromUrl(pathname) as keyof typeof ui;

  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return (
      ui[lang][key as keyof (typeof ui)[typeof lang]] || ui[defaultLang][key]
    );
  };
}
