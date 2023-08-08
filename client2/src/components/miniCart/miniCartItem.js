import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/slices/cart";
import { AuthorName, BeatPrice, BeatTitle, BeatImage } from "@/components";

export default function MiniCartItem({ producto }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative">
        <div className="bg-red-700 p-2 rounded-full absolute  right-2 top-0 mb-0 mt-0 cursor-pointer">
        <Image
          src="/icon/cross-white.svg"
          alt="delete"
          width={10}
          height={10}
          className=" "
          onClick={() => dispatch(deleteFromCart({ id: producto._id }))}
        />
        </div>
        <div className="flex flex-row items-center justify-start gap-2 align-middle">
          <div className="flex items-center gap-2 pr-8">
            <BeatImage beat={producto} height={80} width={80} />
            <MiniCartTextBox beat={producto} />
          </div>
        </div>
      </div>
    </>
  );
}

function MiniCartTextBox({ beat }) {
  return (
    <div>
      <BeatTitle beat={beat} />
      <BeatPrice beat={beat} />
      <AuthorName beat={beat} />
    </div>
  );
}
