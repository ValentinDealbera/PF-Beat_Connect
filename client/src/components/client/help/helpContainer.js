import { Section, Hero, HelpHeader } from "@/components";

export default function HelpContainer({ children, title, paragraph }) {
console.log(paragraph);

  return (
    <>
      <Hero
        style={{ minHeight: "45vh" }}
        image="/images/test2.jpg"
        className="align-middle items-center justify-center"
      >
        <div className="padding-x-estilo3 flex flex-row items-center gap-3 align-middle">
          <h1 className="text-titulo1-medium lg:min-w-[40%] text-white ">{title}</h1>
          <p className="text-base-light text-white hidden xl:block">{paragraph}</p>
        </div>
      </Hero>
      <Section className="" subClassName="padding-estilo1">
        {children}
      </Section>
    </>
  );
}
