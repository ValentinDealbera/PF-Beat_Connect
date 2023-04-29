import { Main, Head, Hero, Section, ScrollToTop } from "@/components";
import { tecnologias, nosotros } from "@/data/data";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function About() {
  const [t, i18n] = useTranslation("global");
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
              Sobre los{" "}
              <span className="text-titulo1-semibold">creadores </span>y{" "}
              <span className="text-titulo1-semibold">BeatConnect</span>
            </h1>
          </div>
        </Hero>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 gap-2 flex-col flex">
          <h1 className="text-titulo1-regular color-neutral-950">
            {t("about.t1")}{" "}
            <span className="text-titulo1-semibold">{t("about.t2")} ❤️ </span>
          </h1>
          <p className="text-base-light color-neutral-900">

            Somos un equipo de 8 alumnos del bootcamp Soy Henry! Estamos
            emocionados de poder compartir un poco más sobre nosotros. Durante
            la cursada estuvimos aprendiendo programación full-stack utilizando
            las tecnologías MERN/PERN, además, desarrollamos habilidades blandas
            y el trabajar en equipo de manera efectiva. Nos apasiona el mundo de
            la tecnología, estamos comprometidos en aprender y crecer juntos en
            esta industria. Nos encanta descubrir nuevas soluciones creativas y
            atractivas para los usuarios aplicando nuestras habilidades técnicas
            para lograrlo.
          </p>
        </Section>

        <Section
          subClassName="padding-x-estilo2 padding-y-estilo1 bg-neutral-100 color-white gap-2 flex-col flex"
          className="bg-neutral-100"
        >
          <div className="gap-estilo1 grid grid-cols-1 md:grid-cols-4">
            {nosotros.map((nosotros) => (
              <div className="gap-estilo4 flex flex-col" key={nosotros.id}>
                <div className="gap-estilo4 flex flex-col items-center justify-start align-middle ">
                  <Image
                    className="rounded-lg"
                    src={nosotros.image}
                    alt={nosotros.name}
                    width="260"
                    height="245"
                  />
                  <h3 className="text-titulo3-semibold color-neutral-950 text-center">
                    {nosotros.name}
                  </h3>
                </div>
                <div className="flex flex-row justify-center  ">
                  {Object.entries(nosotros.redes).map(([red, icono]) => (
                    <a
                      className="align-middle"
                      href={`https://${red}.com`}
                      key={red}
                    >
                      <img class="mx-2 my-auto block" src={icono} alt={red} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          subClassName="padding-x-estilo2 padding-y-estilo1 bg-neutral-100 color-white gap-2 flex-col flex"
          className="bg-neutral-100"
        >
          <h1 className="text-titulo1-regular color-white">
            {t("about.t4")}{" "}
            <span className="text-titulo1-semibold">{t("about.t5")} 🤯😎 </span>
          </h1>
          <p className="text-base-light color-neutral-900">

            Nuestra plataforma cuenta con una lista de productores de música
            registrados, quienes han creado y publicado sus catálogos de
            instrumentales. Los usuarios pueden explorar los catálogos de los
            productores y escuchar muestras de audio de cada beat para decidir
            cuál es el más adecuado para sus necesidades. También contamos con
            un proceso de pago seguro y eficiente que permite a los usuarios
            comprar y descargar el beat en su correo electrónico. Si eres un
            productor de música, ¡también puedes registrarte en nuestra
            plataforma y crear y publicar tu catálogo de instrumentales! Mostrar
            tus muestras de audio y descripciones detalladas de cada beat,
            recibir solicitudes de beats personalizados, y comunicarte con los
            usuarios para discutir detalles adicionales.
          </p>
        </Section>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 flex flex-col gap-12">
          <h1 className="text-titulo1-regular color-neutral-950 text-center ">
            {t("about.t7")}{" "}
            <span className="text-titulo1-semibold">{t("about.t8")} 🦾</span>
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
                    {t(tecnologia.description)}
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
