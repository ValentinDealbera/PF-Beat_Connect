import HeroSection from "./hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BeatConnect",
};

export default function Landing() {
  return <HeroSection />;
}
