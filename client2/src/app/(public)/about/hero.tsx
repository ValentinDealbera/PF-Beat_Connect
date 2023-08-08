"use client";
import { Hero, MultiBoldText } from "@/components";
import { useTranslation } from "react-i18next";

export default function HeroAbout() {
  const [t] = useTranslation("global");
  return (
    <Hero
      imageAlt="Hero"
      style={{ minHeight: "45vh" }}
      image="/images/test1.webp"
      className="items-center justify-center align-middle"
    >
      <div className="padding-estilo2 mt-6 flex h-full flex-row items-center justify-center align-middle">
        <MultiBoldText
          startText={t("about.title1")}
          endText={t("about.title2")}
          className="text-center text-white"
        />
      </div>
    </Hero>
  );
}
