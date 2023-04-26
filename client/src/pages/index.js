import {
  Head,
  Main,
  BeatsSpecialSection,
  Hero,
} from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "@/data/config";

import { fetchBeats } from "@/redux/slices/beats";
import { resetCart } from "@/redux/slices/cart";
import { convertInSeller } from "@/redux/slices/client/authSession";

export default function Home() {
  // si hay un code valido en las querys, registra al usuario actual como vendedor
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(
    (state) => state.client.authSession.session.current._id
  );

  const sendOrder = async () => {
    for (let i = 0; i < router.query.cart.split(",").length; i++) {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}orders`, {
        beat: router.query.cart.split(",")[i],
        buyer: id,
      });
    }
    dispatch(resetCart());
  };

  useEffect(() => {
    if (router.query.cart && router.query.status === "approved") {
      try {
        sendOrder();
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [router.query.status]);

  useEffect(() => {
    if (router.query.code) {
      dispatch(convertInSeller());
    }
  }, [router.query.code]);

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
            <div className="flex w-full flex-col justify-center gap-2">
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
