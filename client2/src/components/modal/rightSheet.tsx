import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type BeatRightSheetProps = {
  children: React.ReactNode;
  setIsDropdownOpen: (arg: boolean) => void;
  width?: string;
};

export default function BeatRightSheet({
  children,
  setIsDropdownOpen,
  width = "w-[360px]",
}: BeatRightSheetProps) {
  const [hasElapsed, setHasElapsed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasElapsed(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    if (hasElapsed) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="master-box"
        className="fixed right-0 top-0 z-40 flex h-screen w-screen items-end justify-end overflow-hidden"
      >
        <motion.div
          id="box"
          className={`relative z-50 flex h-screen items-start justify-end bg-white xs:rounded-bl-3xl xs:rounded-tl-3xl ${width} overflow-hidden py-10`}
        >
          <img
            onClick={() => {
              setIsDropdownOpen(false);
            }}
            className=" absolute left-0 top-0 z-40 h-16 w-16 cursor-pointer p-6"
            src="/icon/cross.svg"
            alt="close"
          />
          <div className=" relative h-full w-full">
            <div className="absolute h-full w-full">{children}</div>
          </div>
        </motion.div>
        <div
          onClick={handleClick}
          className="fixed left-0 top-0 z-40 h-screen w-screen  bg-black opacity-50"
        ></div>
      </div>
    </AnimatePresence>
  );
}
