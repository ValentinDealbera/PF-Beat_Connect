import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/slices/cart";
import { MiniCartTextBox, BeatImage } from "@/components";

export default function MiniCartItem({ producto }) {
  const dispatch = useDispatch();
  console.log(producto);
  return (
    <>
      <div className="relative">
        <Image
          src="/icon/cross.svg"
          alt="delete"
          width={10}
          height={10}
          className="absolute bottom-0 right-2 top-0 mb-0 mt-0 cursor-pointer"
          onClick={() => dispatch(deleteFromCart({ id: producto.id }))}
        />
        <div className="flex flex-row items-center justify-start gap-2 align-middle">
          <div className="flex items-center gap-2">
            <BeatImage producto={producto} height={80} width={80} />
            <MiniCartTextBox beat={producto} />
          </div>
        </div>
      </div>
    </>
  );
}
