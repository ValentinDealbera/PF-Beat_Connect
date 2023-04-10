import { Main, Head, Hero } from "@/components";

export default function Test() {
  return (
    <>
      <Head title={"About"} description={"Head from about"} />
      <Main>
        <Hero
          style={{ minHeight: "35vh" }}
          image="https://images.unsplash.com/photo-1670272506220-f8332b178148?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        >
          <div className="padding-estilo2 flex h-full flex-row items-center justify-center align-middle">
            <h1 className="text-titulo1-regular text-center text-white">
              About <span className="text-titulo1-semibold">authors </span>
              and <span className="text-titulo1-semibold">BeatConnect</span>
            </h1>
          </div>
        </Hero>
        <Hero
          className="background-primary-red-700"
          style={{ minHeight: "20vh" }}
        >
          <div className="padding-estilo2 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <h1 className="text-titulo1-regular text-white">Explore Tracks</h1>
            <h3>soy el search</h3>
          </div>
        </Hero>
        <Hero
          style={{ minHeight: "35vh" }}
          image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        >
          <div className="padding-estilo2 flex h-full w-full flex-col justify-between align-middle md:flex-row items-center">
            <h1 className="text-titulo1-regular text-white">Help Center</h1>
            <h3>soy el nav de ayuda</h3>
          </div>
        </Hero>
      </Main>
    </>
  );
}
