import { useTranslation } from "react-i18next";
import { BeatRightSheet } from "../..";
import MiniCartItem from "./miniCartItem";
import Link from "next/link";

type MiniCartProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  cartItems: any;
};

export default function Modal({
  visible,
  setVisible,
  cartItems,
}: MiniCartProps) {
  const [t] = useTranslation("global");
  return (
    <>
      {visible && (
        <BeatRightSheet
          setIsDropdownOpen={setVisible}
          width="w-full sm:w-[360px]"
        >
          <div className="flex h-full flex-col justify-between gap-4">
            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-center">{t("miniCart.t1")}</h4>
              </div>
            )}
            <div className="flex h-full flex-col justify-between gap-4 px-4 xs:px-8 sm:px-9 pt-8">
              <div className="flex flex-col gap-4">
                {Array.isArray(cartItems) &&
                  cartItems.map((producto) => (
                    <MiniCartItem producto={producto.beat} />
                  ))}
              </div>
              <div id="total">
                <Link href="/beats/cart" onClick={() => setVisible(!visible)}>
                  <button className="mt-6 w-full rounded-full bg-red-700 px-4 py-2 font-semibold text-white">
                    {t("miniCart.t2")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </BeatRightSheet>
      )}
    </>
  );
}
