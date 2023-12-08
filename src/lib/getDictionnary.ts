import "server-only";

const dictionnaries = {
  // eslint-disable-next-line prettier/prettier
  en: () => import("@public/locales/en.json", { with: { type: "json" }}).then((module) => module.default),
  fr: () => import("@public/locales/fr.json", { with: { type: "json" }}).then((module) => module.default),
};

export type Locale = keyof typeof dictionnaries;
export type Dictionnary = Awaited<ReturnType<typeof getDictionnary>>;

export const getDictionnary = async <T extends Locale>(locale: T) => await dictionnaries[locale]();
