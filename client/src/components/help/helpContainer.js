import { Section, Hero, HelpHeader } from "@/components";
import { useTranslation } from "react-i18next";

export default function HelpContainer({ children, helpTitle, helpParagraph }) {
  const [t] = useTranslation("global");
  return (
    <>
      <Hero
        style={{ minHeight: "45vh" }}
        image="/images/test2.jpg"
        className="items-center justify-center align-middle"
      >
        <div className="padding-x-estilo3 flex flex-row items-center gap-3 align-middle">
          <h1 className="text-titulo1-medium text-white lg:min-w-[40%] ">
            {" "}
            {t(helpTitle)}
          </h1>
          <p className="text-base-light hidden text-white xl:block">
            {t(helpParagraph)}
          </p>
        </div>
      </Hero>
      <Section className="" subClassName="padding-estilo1">
        {children}
      </Section>
    </>
  );
}
