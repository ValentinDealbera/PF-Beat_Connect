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
            <div className="gap-estilo2 flex w-full flex-col justify-center">
              <div id="text-box">
                <h1 className="text-titulo1-regular text-white">
                  The World's #1 Marketplace to{" "}
                  <span className="text-titulo1-semibold text-white">
                    buy & sell beats
                  </span>
                </h1>
                <p className="text-paragraph1-regular text-base-light text-white lg:w-2/3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  odio nunc, volutpat et lobortis vel, vehicula a mi. Nullam in
                  malesuada orci. Mauris in tortor nec justo luctus lacinia.
                </p>
              </div>
              <Search
                colorMode="dark"
                sizeMode="long"
                className={"w-full sm:w-2/3 lg:w-[45%] xl:w-[35%] "}
              />
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
