import Link from "next/link";
import { redirect } from "next/navigation";
import { getGameNumber } from "@actions/game/getGames";
import { getUsers } from "@actions/getUsers";
import { isAdmin } from "@actions/isAdmin";
import { auth } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export default async function AdminHomePage({ params }: { params: { lang: Locale } }) {
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  const dictionnary = await getDictionnary(params.lang);
  const users = await getUsers();
  const gameNumber = await getGameNumber();

  return (
    <main className="p-4">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{dictionnary.admin.dashboard}</h2>
        </div>
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">{dictionnary.admin.dashboard}</TabsTrigger>
            <TabsTrigger value="users">{dictionnary.admin.users}</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dictionnary.admin.game_nb}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gameNumber}</div>
                  <p className="text-xs text-muted-foreground">{dictionnary.admin.game_played}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dictionnary.admin.easy}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {users.map((user) => user.easy).reduce((a, b) => a + b) / users.length}%
                  </div>
                  <p className="text-xs text-muted-foreground">{dictionnary.admin.easy_desc}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dictionnary.admin.medium}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {users.map((user) => user.medium).reduce((a, b) => a + b) / users.length}%
                  </div>
                  <p className="text-xs text-muted-foreground">{dictionnary.admin.medium_desc}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{dictionnary.admin.hard}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {users.map((user) => user.hard).reduce((a, b) => a + b) / users.length}%
                  </div>
                  <p className="text-xs text-muted-foreground">{dictionnary.admin.hard_desc}</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>{dictionnary.admin.top_5}</CardTitle>
                <CardDescription>{dictionnary.admin.top_5_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">{dictionnary.admin.rank}</TableHead>
                      <TableHead>{dictionnary.admin.user}</TableHead>
                      <TableHead className="w-[100px]">{dictionnary.admin.easy}</TableHead>
                      <TableHead className="w-[100px]">{dictionnary.admin.medium}</TableHead>
                      <TableHead className="w-[100px]">{dictionnary.admin.hard}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users
                      .sort(
                        (user1, user2) =>
                          user2.easy +
                          2 * user2.medium +
                          3 * user2.hard -
                          user1.easy -
                          2 * user1.medium -
                          3 * user1.hard,
                      )
                      .slice(0, 5)
                      .map((user, index) => (
                        <TableRow key={user.email}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="size-9">
                                <AvatarFallback>{user.email[0]}</AvatarFallback>
                              </Avatar>
                              <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-green-600">{user.easy}%</TableCell>
                          <TableCell className="text-yellow-600">{user.medium}%</TableCell>
                          <TableCell className="text-red-600">{user.hard}%</TableCell>
                          <TableCell className="text-right">
                            <Link href={`/${params.lang}/admin/${user.id}`}>{dictionnary.admin.see}</Link>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{dictionnary.admin.users}</CardTitle>
                <CardDescription>{dictionnary.admin.users_desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{dictionnary.admin.email}</TableHead>
                      <TableHead>{dictionnary.admin.easy}</TableHead>
                      <TableHead>{dictionnary.admin.medium}</TableHead>
                      <TableHead>{dictionnary.admin.hard}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.email}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-green-600">{user.easy}%</TableCell>
                        <TableCell className="text-yellow-600">{user.medium}%</TableCell>
                        <TableCell className="text-red-600">{user.hard}%</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/${params.lang}/admin/${user.id}`}>{dictionnary.admin.see}</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
