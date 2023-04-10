import { Main, Head, Section } from "@/components";
export default function About() {
  return (
    <>
      <Head title={"About"} description={"Head from about"} />
      <Main>
        <Section className="min-h-screen" subClassName="padding-x-estilo2">
          <h1 className="text-titulo1-semibold">Hi im Tadeo :D</h1>
        </Section>
      </Main>
    </>
  );
}
