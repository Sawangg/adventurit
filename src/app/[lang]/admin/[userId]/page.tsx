import { redirect } from "next/navigation";
import { getUser } from "@actions/getUsers";
import { isAdmin } from "@actions/isAdmin";
import { auth } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export default async function AdminUserPage({ params }: { params: { lang: string; userId: string } }) {
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  const dictionnary = await getDictionnary(params.lang as Locale);

  // const user1 = await getUser(parseInt(params.userId));
  // console.log(user1);

  const user = {
    id: params.userId,
    email: "test@test.fr",
    easy: 90,
    medium: 90,
    hard: 90,
    games: [
      {
        id: 1,
        progress: -1,
        answers: [
          {
            id: 1,
            statement: "voici la question",
            answer: "voici la réponse",
            difficulty: "easy",
            grade: 90,
          },
          {
            id: 2,
            statement: "voici la question",
            answer: "voici la réponse",
            difficulty: "easy",
            grade: 90,
          },
          {
            id: 3,
            statement: "voici la question",
            answer: "voici la réponse",
            difficulty: "easy",
            grade: 90,
          },
        ],
      },
      {
        id: 2,
        progress: 4,
        answers: [],
      },
    ],
  };

  return (
    <>
      <main className="p-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{user.email} :</h2>
            <h5 className="m-4 text-xl text-green-600">{user.easy}%</h5>
            <h5 className="m-4 text-xl text-yellow-600">{user.medium}%</h5>
            <h5 className="m-4 text-xl text-red-600">{user.hard}%</h5>
          </div>
          <Tabs defaultValue={user.games[0].id.toString()} className="space-y-4">
            <TabsList>
              {user.games.map((game) => (
                <TabsTrigger key={game.id} value={game.id.toString()}>
                  {game.id}
                </TabsTrigger>
              ))}
            </TabsList>
            {user.games.map((game) => (
              <TabsContent key={game.id} value={game.id.toString()} className="space-y-4">
                {game.progress !== -1 ? (
                  <div className="items-center">
                    <div className="text-xl font-medium">In progress...</div>
                    <div className="text-xl font-medium">question: {game.progress}</div>
                  </div>
                ) : (
                  game.answers.map((answer) => (
                    <div key={answer.id} className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="text-sm font-medium">{answer.statement}</div>
                      <div className="text-sm font-medium">{answer.answer}</div>
                      <div className="text-sm font-medium">{answer.difficulty}</div>
                      <div className="text-sm font-medium">{answer.grade}</div>
                    </div>
                  ))
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </>
  );
}
