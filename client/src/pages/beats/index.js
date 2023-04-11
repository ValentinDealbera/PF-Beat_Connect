import {
  Head,
  Main,
  Section,
  Hero,
  Search,
  BeatsShopSection,
} from "@/components";

export default function Beats() {
  return (
    <>
      <Head title={"Beats"} description={"Head from beats"} />
      <Main>
        <Hero
          className="background-primary-red-700 min-h-[25vh] "
          //  style={{ minHeight: "15vh" }}
        >
          <div className="padding-estilo3 gap-estilo3 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-semibold text-white">Explore Tracks</h1>
            <Search
              colorMode="light"
              sizeMode="long"
              className={"w-full md:w-max"}
            />
          </div>
        </Hero>
        <BeatsShopSection />
      </Main>
    </>
  );
}
