import { PlusIcon } from "lucide-react";
import { addToken } from "@actions/game/addToken";
import { getToken } from "@actions/getUserTokens";
import { auth } from "@lib/auth";
import { cn } from "@lib/utils";
import { Button } from "@src/ui/button";

export type SceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
};

export const TokenButton: React.FC<SceneProps> = async ({ className }) => {
  const session = await auth();
  if (!session) return null;

  const userTokens = await getToken(session);

  return (
    <div className={cn(className)}>
      <p className="text-center text-sm">TOKEN : {userTokens}</p>
      <form action={addToken}>
        <Button size="icon" variant="link" type="submit">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
