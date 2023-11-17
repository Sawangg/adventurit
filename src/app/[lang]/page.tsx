import Image from "next/image";
import { auth } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { MainMenu } from "@modules/scene/menu/MainMenu";
import { AspectRatio } from "@ui/AspectRatio";

export default async function Home({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();

  return (
    <body className={`min-h-screen min-w-screen overflow-x-hidden`}>
      <main className="h-screen">
        <MainMenu dictionnary={dictionnary} session={session} />
      </main>
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <figure className="w-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/SG.png" sizes="24px" alt="" fill />
            </AspectRatio>
          </figure>
          <p className="text-center text-sm text-white">Sponsored by SG</p>
        </div>
      </footer>
    </body>
  );
}
