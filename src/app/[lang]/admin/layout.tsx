import type { Metadata } from "next";
import Image from "next/image";
import { auth, signOut } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Button } from "@ui/button";
import { AspectRatio } from "@ui/hera/primitives/AspectRatio";

export const metadata: Metadata = {
  title: "Adventur'IT — Admin",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionnary = await getDictionnary(params.lang);
  const session = await auth();
  return (
    <body className="min-h-screen min-w-screen overflow-x-hidden bg-background text-white">
      {session && (
        <header className="flex justify-between p-4">
          <div></div>
          <div className="flex items-center gap-4">
            <p>{session?.user?.name}</p>
            <div className="w-8">
              <AspectRatio ratio={1 / 1}>
                <Image src={session.user!.image!} className="rounded-full" sizes="32px" alt="" fill />
              </AspectRatio>
            </div>
          </div>
        </header>
      )}
      {children}
      <footer>
        <div className="fixed bottom-4 left-4 flex items-center gap-x-2">
          <div className="size-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/sg.png" sizes="24px" alt="" fill />
            </AspectRatio>
          </div>
          <p className="text-center text-sm">Sponsored by SG</p>
        </div>
        {session && (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="fixed bottom-4 right-4"
          >
            <Button variant="link">{dictionnary.admin.signout}</Button>
          </form>
        )}
      </footer>
    </body>
  );
}
