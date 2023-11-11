// import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Scene } from "@modules/Scene";

export default function Home(/*{ params }: { params: { lang: string } }*/) {
  // const dictionnary = await getDictionnary(params.lang as Locale);

  return (
    <body className={`min-h-screen min-w-screen overflow-x-hidden`}>
      <main className="h-screen">
        <Scene />
      </main>
      <footer className="absolute bottom-4 left-4">
        <button className="rounded-md bg-[var(--primary)] p-2 text-white"></button>
      </footer>
    </body>
  );
}
