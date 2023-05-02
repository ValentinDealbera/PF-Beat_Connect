import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useState } from "react";
import NavModalItem from "../layout/nav/navModalItem";
import VerticalNav from "../layout/nav/verticalNav";
import { navHelp,navClient } from "@/data/data";
import { UserBoxNav } from "@/components";

export default function HamburgerAdmin({ options, manageHamburguer }) {
  const [t, i18n] = useTranslation("global");
  console.log(options)
  return (
    <>
      <div
        className="fixed top-0 z-[100] h-screen w-screen "
        style={{
          background: "#000000b3",
          backdropFilter: "blur(10px)",
          top: 0,
        }}
      >
        <div className=" absolute left-0 top-0 z-40 flex w-screen items-center justify-between px-4 xs:px-8 py-6 ">
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
      </div>
    </>
  );
}
