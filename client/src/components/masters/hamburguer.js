import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useState } from "react";
import NavModalItem from "../layout/nav/navModalItem";
import VerticalNav from "../layout/nav/verticalNav";
import { navHelp,navClient } from "@/data/data";
import { UserBoxNav } from "@/components";
import { motion, AnimatePresence } from "framer-motion";

export default function Hamburger({ options, manageHamburguer, userMenu }) {
  const [dropDown, setDropDown] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [t] = useTranslation("global");
  return (
    <>
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
        <div className=" absolute left-0 top-0 z-40 flex w-screen items-center justify-between px-4 xs:px-8 py-6 ">
          <UserBoxNav id={"userBoxNavUnique"}>
          <VerticalNav navItems={userMenu} title={"Centro de ayuda"} />
          </UserBoxNav>
          <img
            onClick={() => {
              manageHamburguer(false);
              setPageIndex(0);
            }}
            className=" z-40 h-6 w-6 cursor-pointer "
            src="/icon/cross-white.svg"
            alt="close"
          />
        </div>

        <div className="flex h-full flex-col items-start justify-center gap-1 px-4 py-16 xs:px-8">
          {pageIndex === 0 && (
            <div className="flex flex-col gap-4 ">
              {options.map((item, index) => (
                <Link
                  href={item.url}
                  key={index}
                  onClick={() => manageHamburguer(false)}
                >
                  <div className="cursor-pointer">
                    <h1 className="text-titulo1-medium text-white">
                      {t(item.name)}
                    </h1>
                  </div>
                </Link>
              ))}

              <div className="cursor-pointer">
                <h1
                  className="text-titulo1-medium text-white"
                  onClick={() => setPageIndex(1)}
                >
                  {t("hamburguer.t1")}
                </h1>
              </div>
            </div>
          )}
          {pageIndex === 1 && (
            <div>
              <p
                className="text-base-medium mb-4 cursor-pointer text-white"
                onClick={() => setPageIndex(0)}
              >
                {t("hamburguer.t2")}
              </p>
              <div className="flex flex-col gap-4 ">
                {pageIndex === 1 &&
                  navHelp.map((item, index) => (
                    <Link
                      href={item.url}
                      key={index}
                      onClick={() => manageHamburguer(false)}
                    >
                      <div className="cursor-pointer">
                        <h1 className="text-titulo1-medium text-white">
                          {t(item.name)}
                        </h1>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
      </AnimatePresence>
    </>
  );
}
