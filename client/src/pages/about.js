import { Main, Head, Section } from "@/components";
export default function About() {
  return (
    <>
      <Head title={"About"} description={"Head from about"} />
      <Main>
        <Section
          className="bg-blue-800 "
          subClassName="bg-red-400 padding-x-estilo2"
        >
          <h1 className="text-titulo1-semibold text-white">Hi im Tadeo :D</h1>
        </Section>
      </Main>
    </>
  );
}
