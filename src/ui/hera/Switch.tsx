import clsx from "clsx";
import { Switch as RASwitch, type SwitchProps } from "react-aria-components";

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => (
  <RASwitch
    className={clsx(
      "focused:outline-none group relative isolate inline-flex h-6 w-10 cursor-pointer rounded-full bg-zinc-200 p-[3px] ring-1 ring-inset ring-black/5 transition duration-0 ease-in-out [--switch-bg-ring:theme(colors.zinc.950/90%)] [--switch-bg:theme(colors.zinc.900)] [--switch-ring:theme(colors.zinc.950/90%)] [--switch-shadow:theme(colors.black/10%)] [--switch:white] data-[disabled]:bg-zinc-200 data-[disabled]:data-[selected]:bg-zinc-200 data-[selected]:bg-[--switch-bg] data-[disabled]:opacity-50 data-[focused]:outline data-[focused]:outline-2 data-[focused]:outline-offset-2 data-[focused]:outline-blue-500 data-[disabled]:data-[selected]:ring-black/5 data-[hovered]:data-[selected]:ring-[--switch-bg-ring] data-[hovered]:ring-black/15 data-[selected]:ring-[--switch-bg-ring] data-[changing]:duration-200 dark:bg-white/5 dark:ring-white/15 dark:[--switch-bg-ring:transparent] dark:[--switch-bg:theme(colors.white/25%)] dark:[--switch-ring:theme(colors.zinc.700/90%)] dark:data-[disabled]:bg-white/15 dark:data-[disabled]:data-[selected]:bg-white/15 dark:data-[selected]:bg-[--switch-bg] dark:data-[disabled]:data-[selected]:ring-white/15 dark:data-[hovered]:data-[selected]:ring-[--switch-bg-ring] dark:data-[hovered]:ring-white/25 dark:data-[selected]:ring-[--switch-bg-ring] sm:h-5 sm:w-8 forced-colors:outline forced-colors:[--switch-bg:Highlight] dark:forced-colors:[--switch-bg:Highlight]",
      className,
    )}
    {...props}
  >
    <span className="pointer-events-none relative inline-block size-4 translate-x-0 rounded-full border border-transparent bg-white shadow ring-1 ring-black/5 transition duration-200 ease-in-out group-data-[selected]:translate-x-4 group-data-[disabled]:group-data-[selected]:bg-white group-data-[selected]:bg-[--switch] group-data-[disabled]:group-data-[selected]:shadow group-data-[selected]:shadow-[--switch-shadow] group-data-[disabled]:group-data-[selected]:ring-black/5 group-data-[selected]:ring-[--switch-ring] sm:size-3.5 sm:group-data-[selected]:translate-x-3"></span>
  </RASwitch>
);
