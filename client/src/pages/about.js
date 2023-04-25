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
          className="items-center justify-center align-middle"
        >
          <div className="padding-estilo2 mt-6 flex h-full flex-row items-center justify-center align-middle">
            <h1 className="text-titulo1-regular text-center text-white">
              About <span className="text-titulo1-semibold">authors </span>
              and <span className="text-titulo1-semibold">BeatConnect</span>
            </h1>
          </div>
        </Hero>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 gap-2 flex-col flex">
          <h1 className="text-titulo1-regular color-neutral-950">
            Conozcámonos{" "}
            <span className="text-titulo1-semibold">un poco más ❤️ </span>
          </h1>
          <p className="text-base-light color-neutral-900">
            Somos un equipo de 8 alumnos del bootcamp Soy Henry, y estamos
            emocionados de poder compartir un poco más sobre nosotros. Estamos
            aprendiendo programación full stack utilizando las tecnologías
            MERN/PERN, y trabajando duro para desarrollar habilidades blandas y
            trabajar en equipo de manera efectiva. Nos apasiona el mundo de la
            tecnología y estamos comprometidos en aprender y crecer juntos en
            esta industria. Nos encanta descubrir nuevas soluciones creativas y
            atractivas para los usuarios, y estamos emocionados de aplicar
            nuestras habilidades técnicas para lograrlo.
          </p>
        </Section>
        <Section
          subClassName="padding-x-estilo2 padding-y-estilo1 bg-neutral-100 color-white gap-2 flex-col flex"
          className="bg-neutral-100"
        >
          <h1 className="text-titulo1-regular color-white">
            Sobre la{" "}
            <span className="text-titulo1-semibold">aplicación 🤯😎 </span>
          </h1>
          <p className="text-base-light color-neutral-900">
            Nuestra plataforma cuenta con una lista de productores de música
            registrados, quienes han creado y publicado sus catálogos de
            instrumentales. Los usuarios pueden explorar los catálogos de los
            productores y escuchar muestras de audio de cada beat para decidir
            cuál es el más adecuado para sus necesidades. También
            contamos con un proceso de pago seguro y eficiente que permite a los
            usuarios comprar y descargar el beat en su correo electrónico. Si
            eres un productor de música, ¡también puedes registrarte en nuestra
            plataforma y crear y publicar tu catálogo de instrumentales! Mostrar
            tus muestras de audio y descripciones detalladas de cada beat,
            recibir solicitudes de beats personalizados, y comunicarte con los
            usuarios para discutir detalles adicionales.
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
