"use client";
import { Hero, Section } from "@/components";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  title: string;
  aceptedPath: string;
  paragraph: string;
};

export default function SettingsTemplate({
  children,
  title,
  aceptedPath,
  paragraph,
}: Props) {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  if (pathname !== aceptedPath) {
    return null;
  }

  return (
    <>
      <Hero
        imageAlt="help-hero"
        style={{ minHeight: "45vh" }}
        image="/images/test2.webp"
        className="items-center justify-center align-middle"
      >
        <div className="padding-x-estilo3 flex flex-row items-center gap-3 align-middle">
          <h1 className="text-titulo1-medium text-white lg:min-w-[40%] ">
            {" "}
            {t(title)}
          </h1>
          <p className="text-base-light hidden text-white xl:block">
            {t(paragraph)}
          </p>
        </div>
      </Hero>
      <Section className="" subClassName="padding-estilo1">
        {children}
      </Section>
    </>
  );
}
