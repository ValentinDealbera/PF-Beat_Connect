import HeroSection from "./hero";
import BeatsSection from "./beats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client | BeatConnect",
};

export default function BuyerProfile() {
  return (
    <>
      <HeroSection />
      <BeatsSection />
    </>
  );
}
