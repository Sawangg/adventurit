"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type GameNavigationProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const GameNavigation: React.FC<GameNavigationProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <button
      className="z-40 rounded-md bg-[#09090b] p-2 outline-none"
      aria-label="Navigation"
      onClick={() => setOpen(!open)}
    >
      <svg width="24px" height="24px" viewBox="0 0 24 24">
        <motion.path
          initial="closed"
          animate={open ? "open" : "closed"}
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 7 L 22 7", stroke: "hsl(0, 0%, 100%)" },
            open: { d: "M 5 19 L 19 5", stroke: "hsl(0, 0%, 100%)" },
          }}
          transition={{ stroke: { delay: open ? 0 : 1 } }}
        />
        <motion.path
          initial="closed"
          animate={open ? "open" : "closed"}
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 2 14 L 22 14", stroke: "hsl(0, 0%, 100%)" },
            open: { d: "M 5 5 L 19 19", stroke: "hsl(0, 0%, 100%)" },
          }}
          transition={{ stroke: { delay: open ? 0 : 1 } }}
        />
      </svg>
    </button>
  );
};
