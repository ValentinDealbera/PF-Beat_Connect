import Hero from "./hero";
import AboutSection from "./about";
import TeamSection from "./team";
import TechSection from "./tech";
import AboutAppSection from "./aboutApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | BeatConnect",
};

export default function About() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TeamSection />
      <AboutAppSection />
      <TechSection />
    </>
  );
}
