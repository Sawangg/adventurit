import { getDictionnary, type Locale } from "@lib/getDictionnary";

export default async function NotFound() {
  const dictionnary = await getDictionnary("en" as Locale);

  return <></>;
}
