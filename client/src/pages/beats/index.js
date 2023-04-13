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
      <Main mode="transparent">
        <Hero
          image="/images/yannis-papanastasopoulos-yWF2LLan-_o-unsplash(1).jpg"
          className="background-primary-red-700 min-h-[45vh]  "
          //  style={{ minHeight: "15vh" }}
        >
          <div className="mt-6  padding-estilo2 gap-estilo3 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-medium text-white">Explore Tracks</h1>
            <Search
              colorMode="dark"
              sizeMode="small"
              className={"w-full md:w-max"}
            />
          </div>
        </Hero>
        <BeatsShopSection mode="shop"/>
      </Main>
    </>
  );
}
