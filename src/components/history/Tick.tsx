import { motion } from "framer-motion";

/**
 * Component for rendering a single tick in the timeline
 * May represent a year or a placeholder for spacing
 */
export function Tick({
  year,
  height,
  current = false,
  visible = true,
  onClick,
}: {
  year?: string;
  height: number;
  current?: boolean;
  visible?: boolean;
  onClick?: () => void;
}) {
  // clickable is true if onClick is provided and the year is not the current year
  const clickable = !!onClick && !current;

  return (
    <div className="flex justify-center">
      {!visible ? (
        // Render a placeholder div to ensure proper spacing in the timeline
        <div style={{ height: `${height}vh` }} />
      ) : (
        <motion.button
          onClick={onClick}
          disabled={!clickable}
          className={`flex flex-col items-center ${clickable ? "cursor-pointer" : ""}`}
        >
          <div
            className={`w-[0.5vh] ${year ? (current ? "bg-sky-400" : "bg-sky-500") : "bg-sky-500 opacity-50"}`}
            style={{ height: `${height}vh` }}
          />
          {year && (
            <div
              className={`mt-2 font-bold tracking-wide transition-all ${
                current
                  ? "text-2xl text-sky-400 scale-125"
                  : "text-xl text-white opacity-60 hover:text-sky-400 hover:opacity-100"
              }`}
            >
              {year}
            </div>
          )}
        </motion.button>
      )}
    </div>
  );
}
