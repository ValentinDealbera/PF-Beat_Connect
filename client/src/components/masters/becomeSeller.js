import { BeatRightSheet, Input } from "@/components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "@/data/config";
import axios from "axios";
import { useRouter } from "next/router";

export const manageBecomeSeller = () => {
  console.log("manageBecomeSeller");
  console.log(BecomeSeller);
  BecomeSeller.handleOpenDropdown();
};

export default function BecomeSeller() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const router = useRouter();

  BecomeSeller.handleOpenDropdown = handleOpenDropdown;

  const dispatch = useDispatch();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await dispatch(convertInSeller());
  //   e.target.reset();
  //   setIsDropdownOpen(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const data = await axios.get(`${serverUrl}cart/toseller`)
    router.push(data.data.link)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isDropdownOpen && (
        <BeatRightSheet width="w-[35vw]" setIsDropdownOpen={setIsDropdownOpen}>
          <div className="flex h-full flex-col items-center justify-center gap-7 px-14 py-10  ">
            <div className="flex flex-col items-center justify-center gap-2">
              <h4 className="text-titulo2-regular text-center">
                Convertirte en vendedor de{" "}
                <span className="text-titulo2-semibold text-red-700">
                  BeatConnect
                </span>{" "}
                es una{" "}
                <span className="text-titulo2-semibold">excelente idea!</span>
              </h4>
              <p className="text-base-light text-center">
                ¿Eres productor musical y estás buscando una plataforma en línea
                para vender tus beats? BeatConnect es la solución perfecta para
                ti. Crea tu propia tienda virtual y vende tus beats fácilmente.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full flex-col flex gap-4" >
              <div className="flex w-full flex-col items-center justify-start gap-4 ">
                {/* <Input
                  label="Id de Mercado Pago"
                  placeholder="Ingresa tu id de mercado pago"
                  type="text"
                  name="idMercadoPago"
                  id="idMercadoPago"
                  className="w-full"
                  labelClass="w-full"
                /> */}
                <div className="flex w-full flex-row items-center justify-start gap-2">
                  <input type="checkbox" id="terms" name="terms" value="ok" />
                  <label for="terms" className="text-base-light">
                    Acepto los términos y condiciones
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
              >
                Empezar a vender
              </button>
            </form>
          </div>
        </BeatRightSheet>
      )}
    </>
  );
}
