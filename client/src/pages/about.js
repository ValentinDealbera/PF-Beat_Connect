import { Main, Head, Hero, Section, ScrollToTop, LandBot } from "@/components";
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
              {t("about.title1")}{" "}
              <span className="text-titulo1-semibold">
                {t("about.title2")}{" "}
              </span>
              {t("about.title3")}{" "}
              <span className="text-titulo1-semibold">BeatConnect</span>
            </h1>
          </div>
        </Hero>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 gap-2 flex-col flex">
          <h1 className="text-titulo1-regular color-neutral-950">
            {t("about.t1")}{" "}
            <span className="text-titulo1-semibold">{t("about.t2")} ❤️ </span>
          </h1>
          <p className="text-base-light color-neutral-900">{t("about.t3")}</p>
        </Section>

        <Section
          subClassName="padding-x-estilo2  bg-white color-white gap-2 flex-col flex"
          className="bg-white"
        >
          <div className="gap-6 flex max-w-[100vw] flex-1 flex-shrink flex-grow grid-cols-1 overflow-scroll overflow-y-hidden overflow-x-scroll pb-24 md:grid-cols-4 lg:grid lg:flex-none lg:flex-shrink-0 lg:flex-grow-0 lg:gap-14 lg:overflow-x-hidden">
            {nosotros.map((nosotros, index) => (
              <div
                className="gap-estilo4 flex min-w-[75vw] flex-col sm:min-w-[40vw] md:min-w-[40vw] lg:min-w-full"
                key={index}
              >
                <div className=" flex flex-col items-center justify-start gap-4  align-middle ">
                  <div className="relative aspect-square h-full w-full">
                    <Image
                      src={nosotros.image}
                      alt={nosotros.name}
                      layout="fill"
                      className="aspect-square rounded-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2  ">
                    <div className="flex flex-col justify-center  ">
                      <h3 className="text-titulo3-semibold color-neutral-950 text-center">
                        {nosotros.name}
                      </h3>
                    </div>
                    <div className="flex flex-row justify-center gap-2  ">
                      {Object.entries(nosotros.redes).map(([red, icono]) => (
                        <a
                          className="align-middle"
                          href={nosotros.enlaces[red]}
                          key={red}
                        >
                          <div className="relative h-[22px] max-h-[22px] w-auto min-w-[22px] ">
                          <Image
                            class=""
                          layout="fill"
                            src={icono}
                            alt={red}
                          />
                          </div>
                        </a>
                        
                      ))}
                    </div>
                  </div>
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
          <p className="text-base-light color-neutral-900">{t("about.t6")}</p>
        </Section>
        <Section subClassName="padding-x-estilo2 padding-y-estilo1 flex flex-col gap-12">
          <h1 className="text-titulo1-regular color-neutral-950 text-center ">
            {t("about.t7")}{" "}
            <span className="text-titulo1-semibold">{t("about.t8")} 🦾</span>
          </h1>
          <div className="lg:gap-estilo1 grid grid-cols-1 gap-10 md:grid-cols-2">
            {tecnologias.map((tecnologia) => (
              <div className="gap-estilo4 flex flex-col" key={tecnologia.id}>
                <div className="gap-estilo4 flex flex-row items-center justify-start align-middle">
                  <div className="relative h-[50px] max-h-[50px]  w-[50px] max-w-[50px] ">
                    <Image
                      src={tecnologia.image}
                      alt={tecnologia.title}
                      layout="fill"
                      className="object-contain "
                    />
                  </div>
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
        <LandBot />
      </Main>
    </>
  );
}
