"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCommandStore } from "@src/stores/useCommandStore";
import { Textarea } from "@src/ui/textarea";

export type CodingGameProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  consigne: string;
  outpout: string;
  code?: string;
};

export const CodingGame: React.FC<CodingGameProps> = ({ consigne, outpout, code }) => {
  const { remove } = useCommandStore();

  return (
    <>
      <div className="absolute left-[2.5%] top-8 flex h-[95%] w-[34%] flex-col items-center gap-2">
        <motion.div
          className="flex h-full w-full flex-wrap rounded-md border bg-black/80 p-8"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.3 }}
          onClick={remove}
        >
          <AnimatePresence>
            {consigne.split("").map((char, i) => (
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
          </AnimatePresence>
        </motion.div>
      </div>
      <div className="absolute right-[2.5%] top-8 flex h-3/5 w-3/5 flex-col items-center gap-2">
        <motion.div
          className="flex h-full w-full flex-wrap rounded-md border bg-black/80 p-8"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.3 }}
          onClick={remove}
        >
          <Textarea placeholder={code} />
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-[2.5%] flex h-1/3 w-[60%] flex-col items-center gap-2">
        <motion.div
          className="flex h-full w-full flex-wrap rounded-md border bg-black/80 p-8"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          transition={{ duration: 0.3 }}
          onClick={remove}
        >
          <AnimatePresence>
            {outpout.split("").map((char, i) => (
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
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};
