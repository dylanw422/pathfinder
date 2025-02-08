import { motion } from "motion/react";

export function ConfirmButton({
  handleContinue,
  setResponseFinished,
}: {
  handleContinue: (process: string) => void;
  setResponseFinished: (responseFinished: boolean) => void;
}) {
  return (
    <motion.div className="w-full flex items-center justify-end space-x-2 pb-4">
      <p className="text-sm text-muted-foreground">Click to proceed</p>
      <button
        onClick={() => {
          handleContinue("review");
          setResponseFinished(false);
        }}
        className="px-4 py-2 rounded-full bg-blue-500 text-white md:text-base text-sm"
      >
        This looks good! 👍
      </button>
    </motion.div>
  );
}
