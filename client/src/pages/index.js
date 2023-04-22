import {
  Head,
  Main,
  Section,
  Search,
  BeatsSpecialSection,
  BeatCategoryCard,
  Hero,
} from "@/components";
import { categories } from "@/data/data";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // si hay un code valido en las querys, registra al usuario actual como vendedor
  const router = useRouter();
  const id = useSelector((state) => state.client.client._id);
  console.log(id);
  if (router.query.code) {
    async function data(id) {
      try {
        const dato = await axios.put(
          "http://localhost:3001/api/user/" + id,
          { seller: "VENDEDOR", mpcode: router.query.code },
          { headers: { userid: id } }
        );
        return dato;
      } catch (error) {
        console.log(error.message);
      }
    }
    data(id);
  }
  //hacemos console.log del env
  console.log(process.env.NEXT_PUBLIC_TOKEN_ADMIN);
  return (
    <>
      <Head title={"Home"} description={"Head from home"} />
      <Main mode="transparent">
        <Hero
          image="/images/jurre-houtkamp-XAyE243LdN4-unsplash.jpg"
          className="background-primary-red-700 min-h-[85vh] items-center justify-center align-middle md:min-h-[65vh] "
          //  style={{ minHeight: "15vh" }}
        >
          <div className="padding-estilo2  gap-estilo3 mt-6 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <div className="gap-2 flex w-full flex-col justify-center">
              <div id="text-box">
                <h1 className="text-titulo1-regular text-white">
                  Comienza tu carrera musical,{" "}
                  <span className="text-titulo1-semibold text-white">
                    compra o vende tus beats
                  </span>
                </h1>
                <p className="text-paragraph1-regular text-base-light text-white lg:w-[75%] ">
                  Únete a nuestra plataforma y descubre un mundo de
                  oportunidades para tu carrera musical. Con nuestra amplia
                  selección de beats de diversos géneros y estilos, estamos
                  comprometidos en ayudarte a alcanzar el éxito.
                </p>
              </div>
              <button
                className="background-primary-red-700 color-neutral-white w-max rounded-full px-8 py-3 text-sm font-semibold"
                onClick={() => router.push("/beats")}
              >
                Ver todos los beats
              </button>
            </div>
          </div>
        </Hero>
        <BeatsSpecialSection title={`Beats `}>
          <span className="text-titulo2-semibold">destacados</span>
        </BeatsSpecialSection>
      </Main>
    </>
  );
}
