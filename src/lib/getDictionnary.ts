import "server-only";

const dictionnaries = {
  en: () => import("@public/locales/en.json").then((module) => module.default),
  fr: () => import("@public/locales/fr.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionnaries;
export type Dictionnary = Awaited<ReturnType<typeof getDictionnary>>;

export const getDictionnary = async <T extends Locale>(locale: T) => await dictionnaries[locale]();
