import Image from "next/image";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { MainMenu } from "@modules/scene/MainMenu";
import { AspectRatio } from "@ui/hera/primitives/AspectRatio";

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionnary = await getDictionnary(params.lang);

  return (
    <body className="min-h-screen min-w-screen overflow-x-hidden">
      <main className="h-screen">
        <MainMenu dictionnary={dictionnary} />
      </main>
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <div className="size-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/sg.png" sizes="24px" alt="" fill />
            </AspectRatio>
          </div>
          <p className="text-center text-sm text-white">Sponsored by SG</p>
        </div>
      </footer>
    </body>
  );
}
