import { BeatRightSheet } from "@/components";
import { useState } from "react";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { useRouter } from "next/router";


export default function BecomeSeller({manageBecomeSeller, BecomeSellerVisibility, setBecomeSellerVisibility}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const router = useRouter();

  // const handleOpenDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // BecomeSeller.handleOpenDropdown = handleOpenDropdown;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      toast.error("Debes aceptar los términos y condiciones", toastError);
      return;
    }
    try {
      const data = await axios.get(`${serverUrl}cart/toseller`);
      router.push(data.data.link);
    } catch (error) {
      toast.error("Ocurrio un error, intenta más tarde", toastError);
      console.log(error);
    }
  };

  return (
    <>
      {BecomeSellerVisibility && (
        <BeatRightSheet width="w-[35vw]" setIsDropdownOpen={setBecomeSellerVisibility}>
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
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex w-full flex-col items-center justify-start gap-4 ">
                <div className="flex w-full flex-row items-center justify-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    value="ok"
                    onChange={() => setTerms(!terms)}
                  />
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
