import Image from "next/image";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Scene } from "@modules/Scene";
import { AspectRatio } from "@ui/AspectRatio";

export default async function Home({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);

  return (
    <>
      <header>
        <div className="w-8">
          <AspectRatio ratio={1 / 1}>
            <Image src="/assets/SG.png" sizes="" alt="" fill />
          </AspectRatio>
        </div>
      </header>
      <main>
        <Scene />
      </main>
      <footer className="flex justify-end">
        <button>Login</button>
      </footer>
    </>
  );
}
