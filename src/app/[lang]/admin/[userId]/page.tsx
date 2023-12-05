import { redirect } from "next/navigation";
import { getUser } from "@actions/getUsers";
import { isAdmin } from "@actions/isAdmin";
import { auth } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export default async function AdminUserPage({ params }: { params: { lang: string; userId: string } }) {
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  const dictionnary = await getDictionnary(params.lang as Locale);

  const user = await getUser(parseInt(params.userId));

  return (
    <>
      <main className="p-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{user.email} :</h2>
          </div>
          {user.games && (
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{dictionnary.admin.game_nb}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user.games.length}</div>
                    <p className="text-xs text-muted-foreground">{dictionnary.admin.game_played}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{dictionnary.admin.easy}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{user.easy}%</div>
                    <p className="text-xs text-muted-foreground">{dictionnary.admin.easy_desc}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{dictionnary.admin.medium}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{user.medium}%</div>
                    <p className="text-xs text-muted-foreground">{dictionnary.admin.medium_desc}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{dictionnary.admin.hard}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{user.hard}%</div>
                    <p className="text-xs text-muted-foreground">{dictionnary.admin.hard_desc}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-2xl font-bold">{dictionnary.admin.user_detail.all_games}</div>
              <Tabs defaultValue={user.games[0].id.toString()} className="space-y-4">
                <TabsList>
                  {user.games.map((game, idx) => (
                    <TabsTrigger key={game.id} value={game.id.toString()}>
                      {idx + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {user.games.map((game) => (
                  <TabsContent key={game.id} value={game.id.toString()} className="space-y-4">
                    {game.progress !== -1 ? (
                      <div className="items-center">
                        <div className="text-xl font-medium">{dictionnary.admin.user_detail.in_progress}</div>
                        <div className="text-xl font-medium">
                          {dictionnary.admin.user_detail.question + game.progress}
                        </div>
                      </div>
                    ) : (
                      <Accordion key={game.id} type="single" collapsible>
                        {game.answers?.map((answer, idx) => (
                          <AccordionItem value={answer.id.toString()} key={answer.id}>
                            <AccordionTrigger className="flex flex-row items-center justify-between space-y-0 pb-2">
                              <div className="text-sm font-medium">
                                {dictionnary.admin.user_detail.question + (idx + 1)} ({answer.difficulty})
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      {dictionnary.admin.user_detail.statement}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-xs text-muted-foreground">{answer.statement}</p>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      {dictionnary.admin.user_detail.answer}
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-xs text-muted-foreground">{answer.answer}</p>
                                  </CardContent>
                                  <CardFooter>{dictionnary.admin.user_detail.grade + answer.grade}</CardFooter>
                                </Card>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
