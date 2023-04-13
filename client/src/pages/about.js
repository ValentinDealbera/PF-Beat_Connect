import { Main, Head, Hero, Section, ScrollToTop } from "@/components";
import { tecnologias } from "@/data/data";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Head title={"About"} description={"Head from about"} />
      <Main mode="transparent">
        <ScrollToTop />
        <Hero
          style={{ minHeight: "45vh" }}
          image="/images/test1.jpg"
          className="align-middle items-center justify-center"
        >
          <div className="padding-estilo2 flex h-full flex-row items-center justify-center align-middle">
            <h1 className="text-titulo1-regular text-center text-white">
              About <span className="text-titulo1-semibold">authors </span>
              and <span className="text-titulo1-semibold">BeatConnect</span>
            </h1>
          </div>
        </Hero>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1">
          <h1 className="text-titulo1-regular color-neutral-950">
            Conozcámonos{" "}
            <span className="text-titulo1-semibold">un poco más ❤️ </span>
          </h1>
          <p className="text-base-light color-neutral-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            elementum neque vitae tempus gravida. Mauris at dui varius, aliquet
            lectus et, consequat velit. Vestibulum hendrerit laoreet dapibus.
            Duis interdum venenatis vehicula. Nulla facilisis placerat
            imperdiet. Quisque imperdiet tortor non accumsan dignissim. Duis ac
            lectus eros. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque elementum neque vitae tempus gravida. Mauris at dui
            varius, aliquet lectus et, consequat velit. Vestibulum hendrerit
            laoreet dapibus. Duis interdum venenatis vehicula. Nulla facilisis
            placerat imperdiet. Quisque imperdiet tortor non accumsan dignissim.
            Duis ac lectus eros.
          </p>
        </Section>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 background-primary-red-100 color-primary-red-700">
          <h1 className="text-titulo1-regular color-neutral-950">
            Sobre la{" "}
            <span className="text-titulo1-semibold">aplicación 🤯😎 </span>
          </h1>
          <p className="text-base-light color-neutral-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            elementum neque vitae tempus gravida. Mauris at dui varius, aliquet
            lectus et, consequat velit. Vestibulum hendrerit laoreet dapibus.
            Duis interdum venenatis vehicula. Nulla facilisis placerat
            imperdiet. Quisque imperdiet tortor non accumsan dignissim. Duis ac
            lectus eros. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque elementum neque vitae tempus gravida. Mauris at dui
            varius, aliquet lectus et, consequat velit. Vestibulum hendrerit
            laoreet dapibus. Duis interdum venenatis vehicula. Nulla facilisis
            placerat imperdiet. Quisque imperdiet tortor non accumsan dignissim.
            Duis ac lectus eros.
          </p>
        </Section>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 flex flex-col gap-12">
          <h1 className="text-titulo1-regular color-neutral-950 text-center ">
            Tecnologías{" "}
            <span className="text-titulo1-semibold">utilizadas 🦾</span>
          </h1>
          <div className="gap-estilo1 grid grid-cols-1 md:grid-cols-2">
            {tecnologias.map((tecnologia) => (
              <div className="gap-estilo4 flex flex-col" key={tecnologia.id}>
                <div className="gap-estilo4 flex flex-row items-center justify-start align-middle">
                  <Image
                    src={tecnologia.image}
                    alt={tecnologia.title}
                    width="50"
                    height="50"
                  />
                  <h3 className="text-titulo3-semibold color-neutral-950 text-center">
                    {tecnologia.title}
                  </h3>
                </div>
                <p className="text-base-light color-neutral-900">
                  {tecnologia.description}
                </p>
              </div>
            ))}
          </div>
        </Section>
        <ScrollToTop />
      </Main>
    </>
  );
}
