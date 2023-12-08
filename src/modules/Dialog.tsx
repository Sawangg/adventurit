"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCommandStore } from "@src/stores/useCommandStore";

export type GameDialogProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  text: string;
  options?: string[];
};

export const Dialog: React.FC<GameDialogProps> = ({ text, options }) => {
  const { remove } = useCommandStore();

  return (
    <div className="absolute inset-x-1/4 bottom-4 flex flex-col items-center gap-2">
      {options?.map((option, i) => (
        <button className="font-bold uppercase" key={i} onClick={remove}>
          {option}
        </button>
      ))}
      <motion.div
        className="flex h-32 w-full flex-wrap rounded-md border bg-white/80 p-4"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.3 }}
        onClick={remove}
      >
        <AnimatePresence>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05, duration: 0.01 }}
              className="h-fit select-none text-lg text-black"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
