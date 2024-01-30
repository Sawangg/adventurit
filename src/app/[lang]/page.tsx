import Image from "next/image";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { MainMenu } from "@modules/scene/menu/MainMenu";
import { TokenButton } from "@modules/scene/menu/TokenButton";
import { AspectRatio } from "@ui/AspectRatio";

export default async function Page({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);

  return (
    <body className="min-h-screen min-w-screen overflow-x-hidden">
      <main className="h-screen">
        <MainMenu dictionnary={dictionnary} />
      </main>
      <TokenButton className={"absolute left-4 top-4 flex items-center gap-x-2"} />
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <figure className="w-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/sg.png" sizes="24px" alt="" fill />
            </AspectRatio>
          </figure>
          <p className="text-center text-sm text-black">Sponsored by SG</p>
        </div>
      </footer>
    </body>
  );
}
