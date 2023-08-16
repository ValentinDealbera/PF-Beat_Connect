"use client";
import { Hero } from "@/components";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const [t] = useTranslation("global");
  return (
    <>
      <Hero
        imageAlt="Imagen de fondo de la página de inicio"
        style={{ minHeight: "100vh" }}
        className="items-center justify-center align-middle"
        image="https://images.unsplash.com/photo-1640622333305-9c0d3c9b18a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
      >
        <div className="padding-estilo2">
          <div>
            <h1 className="text-titulo1-regular color-neutral-white mb-2 lg:w-2/3 xl:w-1/2">
              {t("landing.t1")}
              {""}
              <span className=" text-titulo1-bold color-neutral-white">
                {t("landing.t2")}
              </span>
            </h1>
            <p className="text-base-light color-neutral-white w-full lg:w-[60%] mb-5">
              {t("landing.t3")}
            </p>
            <Link href="/">
              <button className="background-primary-red-700 color-neutral-white border-radius-estilo1 text-base-semibold w-max px-8 py-4">
                {t("landing.t4")}
              </button>
            </Link>
          </div>
        </div>
      </Hero>
    </>
  );
}
