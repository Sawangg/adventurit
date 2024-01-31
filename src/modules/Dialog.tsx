"use client";

import { motion } from "framer-motion";
import { useCommandStore } from "@stores/useCommandStore";

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
        className="flex h-32 w-full flex-wrap rounded-md border-2 bg-white/80 p-4 shadow-2xl"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          if (options?.length === 0) remove();
        }}
      >
        {/* Small key hack to force update */}
        <p className="break-words" key={text}>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03, duration: 0.01 }}
              className="h-fit select-none text-lg text-black"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};
