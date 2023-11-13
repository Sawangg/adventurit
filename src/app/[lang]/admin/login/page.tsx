import { redirect } from "next/navigation";
import { auth, signIn } from "@lib/auth";

export default async function AdminLoginPage(/*{ params }: { params: { lang: string } }*/) {
  // const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();
  if (session) return redirect("/admin");

  async function signInGithub() {
    "use server";
    const url = (await signIn("github", { redirect: false })) as string;
    // TODO: Should be fixed after next-auth@5 is stable
    redirect(url.replace("signin", "api/auth/signin"));
  }

  return (
    <body>
      <header></header>
      <main>
        <form action={signInGithub}>
          <button>Sign In Github</button>
        </form>
      </main>
    </body>
  );
}
