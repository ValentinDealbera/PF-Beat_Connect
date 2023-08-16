"use client";
import { ClientSettingsIndexer, Section, HeroSettings } from "@/components";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
  title: string;
  aceptedPath: string;
};

export default function SettingsTemplate({
  children,
  title,
  aceptedPath,
}: Props) {
  const pathname = usePathname();

  if (pathname !== aceptedPath) {
    return null;
  }

  return (
    <>
      <HeroSettings title={title} />
      <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
        {pathname === "/client/settings" && <ClientSettingsIndexer />}
        {children}
      </Section>
    </>
  );
}
