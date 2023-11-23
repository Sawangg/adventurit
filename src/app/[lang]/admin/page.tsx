import { redirect } from "next/navigation";
import { isAdmin } from "@actions/isAdmin";
import { auth, signOut } from "@lib/auth";
import { getDictionnary, type Locale } from "@lib/getDictionnary";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/tabs";

export default async function AdminHome({ params }: { params: { lang: string } }) {
  const dictionnary = await getDictionnary(params.lang as Locale);
  const session = await auth();
  const admin = await isAdmin(session!.user!.email!);
  if (!admin) return redirect("/");

  const number_of_tests = 28;
  const users = [
    {
      email: "cesar.ombredane@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "leo.mercier@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "enzo.peudepiece@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "sacha.mihman@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "corentin.gauttier@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "test1.test@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "test2.test@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
    {
      email: "test3.test@test.com",
      easy: Math.floor(Math.random() * 101),
      medium: Math.floor(Math.random() * 101),
      hard: Math.floor(Math.random() * 101),
    },
  ];

  return (
    <>
      <main className="p-4">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">All users</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Number of Games</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{number_of_tests}</div>
                    <p className="text-xs text-muted-foreground">Game played</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Easy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {users.map((user) => user.easy).reduce((a, b) => a + b) / users.length}%
                    </div>
                    <p className="text-xs text-muted-foreground">of right answers on easy question (1 point)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Medium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">
                      {users.map((user) => user.medium).reduce((a, b) => a + b) / users.length}%
                    </div>
                    <p className="text-xs text-muted-foreground">of right answers on medium question (2 point)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hard</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {users.map((user) => user.hard).reduce((a, b) => a + b) / users.length}%
                    </div>
                    <p className="text-xs text-muted-foreground">of right answers on hard question (3 point)</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Top 5 users</CardTitle>
                  <CardDescription>Best user to ever play the game</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Rank</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="w-[100px]">Easy</TableHead>
                        <TableHead className="w-[100px]">Medium</TableHead>
                        <TableHead className="w-[100px]">Hard</TableHead>
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
                                <Avatar className="h-9 w-9">
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
                              <Button variant="outline" size="sm">
                                See
                              </Button>
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
                  <CardTitle>All users</CardTitle>
                  <CardDescription>Here are all users and their grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Easy</TableHead>
                        <TableHead>Medium</TableHead>
                        <TableHead>Hard</TableHead>
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
                            <Button variant="outline" size="sm">
                              See
                            </Button>
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
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="fixed bottom-4 right-4"
        >
          <Button variant="link">{dictionnary.admin.signout}</Button>
        </form>
      </main>
    </>
  );
}
