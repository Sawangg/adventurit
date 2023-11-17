import { motion } from "framer-motion";
import { cn, playAudio } from "@lib/utils";

export type SceneProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  mouvement?: number;
};

export const MainMenuButton: React.FC<SceneProps> = ({ onClick, children, className, mouvement = 10 }) => {
  return (
    <motion.button
      whileHover={{ x: mouvement }}
      className={cn(className)}
      onClick={async (e) => {
        await playAudio("/assets/sounds/click.mp3", 0.3);
        onClick && onClick(e);
      }}
    >
      {children}
    </motion.button>
  );
};
