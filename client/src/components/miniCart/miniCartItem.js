import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteFromCart } from "@/redux/slices/cart";

export default function MiniCartItem({ producto }) {
  const dispatch = useDispatch();

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
            <div
              className="relative aspect-square rounded-md object-cover"
              style={{ height: "80px", width: "80px" }}
            >
              <Image
                src={producto.image}
                alt={producto.name}
                layout="fill"
                className="rounded-xl object-cover"
              />
            </div>
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
      <h1 className="font-bold">{`${beat.name}`}</h1>
      <span className="color-primary-red-700 font-semibold">{`$${beat.price}`}</span>

      <div className="flex flex-row items-center gap-1">
        <Link
          href={`/beats/author/${beat.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-light">{`${beat.author?.name}`}</span>
        </Link>
        <Image
          className="inline"
          width={14}
          height={14}
          src={"/icon/checked-blue.svg"}
          alt="checked"
        />
      </div>
    </div>
  );
}
