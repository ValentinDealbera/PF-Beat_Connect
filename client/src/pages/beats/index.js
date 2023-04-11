import { Head, Main, Section, Hero, Search } from "@/components";

export default function Beats() {
  return (
    <>
      <Head title={"Beats"} description={"Head from beats"} />
      <Main>
        <Hero
          className="background-primary-red-700"
          style={{ minHeight: "20vh" }}
        >
          <div className="padding-estilo2 flex h-full w-full flex-col gap-estilo3 items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-semibold text-white">Explore Tracks</h1>
            <Search colorMode="light" sizeMode="long" className={"w-full md:w-max"} />
          </div>
        </Hero>
        <Section subClassName="padding-estilo2"></Section>
      </Main>
    </>
  );
}
