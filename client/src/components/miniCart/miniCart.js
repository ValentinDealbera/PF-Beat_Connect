import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { BeatRightSheet, MiniCartItem } from "@/components";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MiniCart() {

 // const cartIds = useSelector((state) => state.cart.cart).map(
    //(item) => item.id
  //) || [];
 // const cartItems = useSelector((state) => state?.beats?.publicItems).filter(
    //(item) => cartIds.includes(item._id)
  //) || [];


  //const state = useSelector((state) => state);



  //console.log("cartItems", cartItems, cartIds);


  
  const cartItems = useSelector((state) => state?.cart.cart) || [];

  const [visible, setVisible] = useState(false);
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <div
        className="relative aspect-square w-[43px] cursor-pointer rounded-full bg-red-700 p-4"
        onClick={() => setVisible(!visible)}
      >
        <Image
          src="/icon/cart.svg"
          layout="fill"
          className="aspect-square  object-cover p-3"
        />
      </div>
      {visible && (
        <BeatRightSheet setIsDropdownOpen={setVisible} width="w-full sm:w-[360px]">
          <div className="flex h-full flex-col justify-between gap-4">
            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-center">
                  {t("miniCart.t1")}
                </h4>
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
