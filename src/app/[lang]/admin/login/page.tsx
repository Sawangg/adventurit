import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signIn } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { AspectRatio } from "@src/ui/AspectRatio";
import { Button } from "@src/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@src/ui/card";
import { Input } from "@src/ui/input";

export default async function AdminLoginPage({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();
  if (session) return redirect("/admin");

  async function signInGithub() {
    "use server";
    const url = (await signIn("github", { redirect: false })) as string;
    // TODO: Should be fixed after next-auth@5 is stable
    redirect(url.replace("signin", "api/auth/signin"));
  }

  async function signInGoogle() {
    "use server";
    const url = (await signIn("google", { redirect: false })) as string;
    // TODO: Should be fixed after next-auth@5 is stable
    redirect(url.replace("signin", "api/auth/signin"));
  }

  return (
    <body className="bg-black">
      <main className="grid h-screen place-items-center">
        <Card className="border-gray-800 bg-black">
          <CardHeader>
            <CardTitle className="text-white">{dictionnary.admin.login.connection}</CardTitle>
            <CardDescription className="text-gray-500">{dictionnary.admin.login.choice}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-3 gap-y-2">
            <form action={signInGithub}>
              <Button className="flex w-52 gap-x-2 space-y-52 rounded-xl border border-gray-800 bg-black">
                <div className="w-5">
                  <AspectRatio ratio={1 / 1}>
                    <Image src="/assets/github.png" sizes="" alt="" fill />
                  </AspectRatio>
                </div>
                {dictionnary.admin.login.github}
              </Button>
            </form>
            <form action={signInGoogle}>
              <Button className="flex w-52 gap-x-2 rounded-xl border border-gray-800 bg-black">
                <div className="w-5">
                  <AspectRatio ratio={1 / 1}>
                    <Image src="/assets/google.png" sizes="" alt="" fill />
                  </AspectRatio>
                </div>
                {dictionnary.admin.login.google}
              </Button>
            </form>
            <div className="col-span-2 flex items-center">
              <hr className="grow border-t border-gray-500" />
              <span className="px-2 text-center uppercase text-gray-500">{dictionnary.admin.login.division}</span>
              <hr className="grow border-t border-gray-500" />
            </div>

            <label htmlFor="email" className="col-span-2 text-white">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemple.com"
              className="col-span-2 rounded-xl border-gray-800 bg-black"
            />

            <label htmlFor="password" className="col-span-2 text-white">
              {dictionnary.admin.login.pass}
            </label>
            <Input id="password" type="password" className="col-span-2 rounded-xl border-gray-800 bg-black " />
          </CardContent>
          <CardFooter className="grid grid-cols-2">
            <Button variant="secondary" className="col-span-2 rounded-xl border border-gray-800 ">
              {dictionnary.admin.login.connection}
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="absolute bottom-4 left-4">
        <div className="flex items-center gap-x-2">
          <div className="w-6">
            <AspectRatio ratio={1 / 1}>
              <Image src="/assets/SG.png" sizes="" alt="" fill />
            </AspectRatio>
          </div>
          <p className="text-center text-sm text-white">Sponsored by SG</p>
        </div>
      </footer>
    </body>
  );
}
