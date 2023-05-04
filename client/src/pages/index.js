import { Head, Main, BeatsSpecialSection, Hero, LandBot } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";

import { convertInSeller, getUserData } from "@/redux/slices/client/authSession";
import { fetchBeats } from "@/redux/slices/beats";
import { useTranslation } from "react-i18next";
import { resetCart } from "@/redux/slices/cart";
import { postClientOrder } from "@/redux/slices/client/orders";


export default function Home() {
  // si hay un code valido en las querys, registra al usuario actual como vendedor
  const router = useRouter();

 const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const id = useSelector(
    (state) => state.client.authSession.session.current._id
  );

  const sendOrder = async () => {
    for (let i = 0; i < router.query.cart.split(",").length; i++) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}orders`, {
          beat: router.query.cart.split(",")[i],
          buyer: id,
        });
        toast.success("Orden cargada", toastSuccess);
      } catch (error) {
        toast.error(error.response.data.message, toastError);
      }
      // dispatch(
      //   postClientOrder({ beat: router.query.cart.split(",")[i], buyer: id })
      // );
    }
    dispatch(getUserData(id));
    dispatch(resetCart());
  };

  useEffect(() => {
    if (router.query.cart && router.query.status === "approved") {
      try {
        sendOrder();
        //     dispatch(postClientOrder({beat: router.query.cart.split(",")[0], buyer: id}));
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [router.query.status]);


  useEffect(() => {
    if (router.query.code) {
      dispatch(convertInSeller({mpcode: router.query.code}));
    }
  }, [router.query.code]);

  //hacemos console.log del env
  return (
    <>
      <Head title={"Home"} description={"Head from home"} />
      <Main mode="transparent">
        <Hero
          image="/images/jurre-houtkamp-xaye243ldn4-unsplash.webp"
          className="background-primary-red-700 min-h-[85vh] items-center justify-center align-middle md:min-h-[65vh] "
          //  style={{ minHeight: "15vh" }}
        >
          <div className="padding-estilo2  gap-estilo3 mt-6 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center">
            <div className="flex w-full flex-col justify-center gap-3">
              <div id="text-box">
                <h1 className="text-titulo1-regular text-white">
                  {t("home.t1")}
                  <span className="text-titulo1-semibold text-white">
                    {t("home.t2")}
                  </span>
                </h1>
                <p className="text-paragraph1-regular text-base-light text-white lg:w-[75%] ">
                  {t("home.t3")}
                </p>
              </div>
              <button
                className="background-primary-red-700 color-neutral-white w-max rounded-full px-8 py-3 text-sm font-semibold"
                onClick={() => router.push("/beats")}
              >
                {t("home.t4")}
              </button>
            </div>
          </div>
        </Hero>
        <BeatsSpecialSection title={`Beats `}>

          <span className="text-titulo2-semibold">{t("home.t5")}</span>

        </BeatsSpecialSection>   
        <LandBot />     
      </Main>
    </>
  );
}
