import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { auth, signOut } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { AspectRatio } from "@ui/AspectRatio";

export default async function AdminHome({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  return (
    <>
      <header className="flex justify-between p-4">
        <div></div>
        <div className="flex items-center gap-4">
          <p>{session?.user?.name}</p>
          <div className="w-8">
            <AspectRatio ratio={1 / 1}>
              <Image src={session!.user!.image!} className="rounded-full" sizes="32px" alt="" fill />
            </AspectRatio>
          </div>
        </div>
      </header>
      <main className="p-4">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button>{dictionnary.admin.signout}</button>
        </form>
      </main>
    </>
  );
}
