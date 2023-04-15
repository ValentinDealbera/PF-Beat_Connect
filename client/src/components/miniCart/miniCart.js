import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { BeatRightSheet, MiniCartItem } from "@/components";
import Link from "next/link";

export default function MiniCart() {
  const cartIds = useSelector((state) => state.cart.cart) || [];
  const cartItems = useSelector((state) => state.beats.publicItems).filter(
    (item) => cartIds.includes(item._id)
  );

  const [visible, setVisible] = useState(false);
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
        <BeatRightSheet setIsDropdownOpen={setVisible}>
          <div className="flex h-full flex-col justify-between gap-4">
            {cartItems.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-center">
                  Parece que tu carrito esta vacio
                </h4>
              </div>
            )}
            <div className="flex h-full flex-col justify-between gap-4 sm:px-9 sm:pt-8">
              <div className="flex flex-col gap-4">
                {Array.isArray(cartItems) &&
                  cartItems.map((producto) => (
                    <MiniCartItem producto={producto} />
                  ))}
              </div>
              <div id="total">
                <Link href="/beats/cart" onClick={() => setVisible(!visible)}>
                  <button className="mt-6 w-full rounded-full bg-red-700 px-4 py-2 font-semibold text-white">
                    Ver carrito
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
