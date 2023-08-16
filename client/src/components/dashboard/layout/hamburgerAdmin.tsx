import { useTranslation } from "react-i18next";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  options: {
    title: string;
    url: string;
  }[];
  manageHamburguer: (value: boolean) => void;
};

export default function HamburgerAdmin({ options, manageHamburguer }: Props) {
  const [t] = useTranslation("global");
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 z-[100] h-screen w-screen "
        style={{
          background: "#000000b3",
          backdropFilter: "blur(10px)",
          top: 0,
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      >
        <div className=" absolute left-0 top-0 z-40 flex w-screen items-center justify-between px-4 py-6 xs:px-8 ">
          <img
            onClick={() => {
              manageHamburguer(false);
            }}
            className=" z-40 h-6 w-6 cursor-pointer "
            src="/icon/cross-white.svg"
            alt="close"
          />
        </div>

        <div className="flex h-full flex-col items-start justify-center gap-1 px-4 py-16 xs:px-8">
          <div className="flex flex-col gap-4 ">
            {options.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                onClick={() => manageHamburguer(false)}
              >
                <div className="cursor-pointer">
                  <h1 className="text-titulo1-medium text-white">
                    {t(item.title)}
                  </h1>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
