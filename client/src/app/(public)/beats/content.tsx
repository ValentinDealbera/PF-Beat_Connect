"use client";
import { BeatsSpecialSection } from "@/components";
import HeroSection from "./hero";
import ShopSection from "./shop";
import PromoSection from "./promoSection";
import { useTranslation } from "react-i18next";

export default function Beats() {
  const [t] = useTranslation("global");
  return (
    <>
      <HeroSection />
      <BeatsSpecialSection title={t("beats.t3") + " " + t("beats.t4")} />
      <PromoSection />
      <ShopSection />
    </>
  );
}
