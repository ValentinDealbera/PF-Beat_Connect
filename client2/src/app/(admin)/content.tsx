"use client";
import { Footer } from "@/components";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayoutContent({ children }: Props) {
  return (
    <>
      <main>{children}</main>
      <Footer mode={"dark"} />
    </>
  );
}
