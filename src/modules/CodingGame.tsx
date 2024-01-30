"use client";

import { motion } from "framer-motion";
import { useCommandStore } from "@stores/useCommandStore";
import { Textarea } from "@ui/textarea";

export type CodingGameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  guideline: string;
  output?: string;
  code?: string;
};

export const CodingGame: React.FC<CodingGameProps> = ({ guideline, code }) => {
  const { remove } = useCommandStore();

  return (
    <motion.div
      className="absolute left-0 top-0 grid h-svh w-screen grid-cols-3 grid-rows-3 gap-4 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="row-start-1 row-end-4 flex-col items-center gap-2">
        <div className="size-full flex-wrap rounded-md border bg-black/80 p-8">
          <p className="break-words">
            {guideline.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.01 }}
                className="h-fit select-none text-lg text-white"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
      <div className="col-start-2 col-end-4 row-start-1 row-end-3 flex-col items-center gap-2">
        <div className="flex size-full flex-wrap rounded-md border bg-black/80 p-8">
          <Textarea placeholder={code} />
        </div>
      </div>
      <div className="col-start-2 col-end-4 row-start-3 row-end-4">
        <div className="size-full rounded-md border bg-black/80 p-8">
          <button className="font-bold uppercase" onClick={remove}>
            Run
          </button>
        </div>
      </div>
    </motion.div>
  );
};
