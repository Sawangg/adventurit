import type { Metadata } from "next";
import Image from "next/image";
import { auth } from "@lib/auth";
import { AspectRatio } from "@ui/AspectRatio";

export const metadata: Metadata = {
  title: "Adventur'IT admin — SG",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
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
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <figure className="w-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/sg.png" sizes="24px" alt="" fill />
            </AspectRatio>
          </figure>
          <p className="text-center text-sm">Sponsored by SG</p>
        </div>
      </footer>
    </body>
  );
}
