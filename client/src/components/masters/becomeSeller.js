import { BeatRightSheet } from "@/components";
import { useState } from "react";
import { serverUrl } from "@/data/config";
import { toast } from "sonner";
import axios from "axios";
import { toastError, toastSuccess } from "@/utils/toastStyles";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";


export const manageBecomeSeller = () => {
  BecomeSeller.handleOpenDropdown();
};

export default function BecomeSeller() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const router = useRouter();
  const [t, i18n] = useTranslation("global");

  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  BecomeSeller.handleOpenDropdown = handleOpenDropdown;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      toast.error(t("becomeSeller.error1"), toastError);
      return;
    }
    try {
      const data = await axios.get(`${serverUrl}cart/toseller`);
      router.push(data.data.link);
    } catch (error) {
      toast.error(t("becomeSeller.error2"), toastError);
      console.log(error);
    }
  };

  return (
    <>
      {isDropdownOpen && (
        <BeatRightSheet width="w-[35vw]" setIsDropdownOpen={setIsDropdownOpen}>
          <div className="flex h-full flex-col items-center justify-center gap-7 px-14 py-10  ">
            <div className="flex flex-col items-center justify-center gap-2">
              <h4 className="text-titulo2-regular text-center">
                  {t("becomeSeller.t1")}{" "}
                <span className="text-titulo2-semibold text-red-700">
                  BeatConnect
                </span>{" "}
                  {t("becomeSeller.t2")}{" "}
                <span className="text-titulo2-semibold">{t("becomeSeller.t3")}</span>
              </h4>
              <p className="text-base-light text-center">
                {t("becomeSeller.t4")}
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
                  <Link href={'help/terms'}>
                  <label for="terms" onClick={()=>handleOpenDropdown()} className="text-base-light hover:cursor-pointer">
                      {t("becomeSeller.t5")}
                  </label>
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white"
              >
                  {t("becomeSeller.t6")}
              </button>
            </form>
          </div>
        </BeatRightSheet>
      )}
    </>
  );
}
