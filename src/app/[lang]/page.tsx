import { getDictionnary, type Locale } from "@lib/getDictionnary";
// import Navigation from "@modules/Navigation";
import { Scene } from "@modules/Scene";

export default async function Home({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);

  return (
    <body className={`min-h-screen min-w-screen overflow-x-hidden`}>
      <main className="h-screen">
        <Scene dictionnary={dictionnary} />
      </main>
      {/* <footer className="absolute bottom-4 left-4">
        <Navigation />
      </footer> */}
    </body>
  );
}
