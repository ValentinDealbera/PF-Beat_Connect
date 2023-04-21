import {
  Main,
  HelpContainer,
  Head,
  FaqsGrid,
  ModalPopUp,
  Input,
  TextArea,
} from "@/components";

import Image from "next/image";
import { useState } from "react";

export default function HelpOverview() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer
          title="Centro de ayuda"
          paragraph="En nuestro centro de ayuda, nos esforzamos por proporcionar una experiencia de usuario excepcional a todos nuestros clientes. Estamos aquí para responder cualquier pregunta que puedas tener y ayudarte a solucionar cualquier problema que puedas encontrar al utilizar nuestra plataforma. "
        >
          <div className="gap-estilo1 flex flex-col ">
            <h1 className="text-titulo3-semibold text-red-700 ">
              Preguntas frecuentes
            </h1>
            <FaqsGrid />
            <div
              className="flex w-full justify-center"
              onClick={() => setModal(true)}
            >
              <p className="mt-6 w-full cursor-pointer text-center font-light">
                ¿Aun no encuentras tu respuesta?{" "}
                <span className="font-medium text-red-700">
                  Envianos un ticket
                </span>
              </p>
            </div>
          </div>
        </HelpContainer>
        {modal && (
          <ModalPopUp>
            <div className="relative flex max-h-full w-full xl:w-[70%] justify-center gap-4 overflow-hidden rounded-3xl bg-white p-10">
              <Image
                src="/icon/cross.svg"
                width={15}
                height={15}
                onClick={() => setModal(false)}
                alt="close"
                className="absolute right-4 top-4 cursor-pointer"
              />
              <div className=" overflow-y-scroll">
                <div>
                  <h3 className="text-titulo3-semibold  text-red-700">
                    Cuentanos tu problema, te ayudaremos.
                  </h3>
                  <p className="text-sm-light mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam tincidunt vulputate erat ut facilisis. In ultrices,
                    metus non pellentesque tincidunt, elit sapien maximus ipsum,
                    at vestibulum
                  </p>
                </div>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Escribe tu problema"
                    label="Titulo"
                  />
                  <Input
                    type="text"
                    placeholder="ID"
                    label="Tu id de usuario"
                  />
                  <TextArea
                    type="text"
                    placeholder="Escribe tu problema"
                    label="Descripcion"
                  />
                  <button
                    type="submit"
                    className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
                  >
                    Enviar Ticket
                  </button>
                </form>
              </div>
            </div>
          </ModalPopUp>
        )}
      </Main>
    </>
  );
}
