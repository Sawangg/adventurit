"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Game } from "@db/schema";

export type GameDialogProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  game: Game;
};

export const GameDialog: React.FC<GameDialogProps> = ({ game }) => {
  const [dialog, setDialog] = useState<string[]>(["Hello world"]);

  return (
    <motion.div
      className="absolute inset-x-1/4 bottom-4 flex h-32 w-1/2 flex-wrap rounded-md border bg-white p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        console.log("clicked");
      }}
    >
      <AnimatePresence>
        {dialog[0].split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            style={{ color: "black" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
