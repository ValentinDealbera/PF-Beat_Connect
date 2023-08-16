import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Home | BeatConnect",
};

export default function Page() {
  return <Content />;
}
