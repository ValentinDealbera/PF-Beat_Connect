import { Head, Main, Section, Hero } from "@/components";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <Head title="Landing Page" />
      <Main mode={"transparent"}>
        <Hero
          style={{ minHeight: "100vh" }}
          className="align-middle items-center justify-center"
          image="https://images.unsplash.com/photo-1640622333305-9c0d3c9b18a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        >
          <div className="padding-estilo2">
            <div>
              <h1 className="mb-2 text-titulo1-regular color-neutral-white lg:w-2/3 xl:w-1/2">
                Explora los mejores beats, encuentra nuevos artistas,{""}
                <span className=" text-titulo1-bold color-neutral-white">
                  descubre BeatConnect
                </span>
              </h1>
              <p className="text-base-light color-neutral-white mb-5">
                Explora los mejores beats, encuentra nuevos artistas, descubre
                BeatConnect
              </p>
              <Link href="/">
              <button className="background-primary-red-700 color-neutral-white border-radius-estilo1 text-base-semibold w-max px-8 py-4">
                Ingresar ahora
              </button>
                </Link>
            </div>
          </div>
        </Hero>
      </Main>
    </>
  );
}
