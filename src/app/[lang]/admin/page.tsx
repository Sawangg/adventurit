import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { auth, signOut } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";

export default async function AdminHome({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  return (
    <>
      <main className="p-4">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="absolute bottom-4 right-4"
        >
          <button>{dictionnary.admin.signout}</button>
        </form>
      </main>
    </>
  );
}
