import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart";

export default function AddToCart({beat, posAction}) {
    const dispatch = useDispatch();

const authorId = beat.userCreator._id ? beat.userCreator._id : beat.userCreator;

    return (
        <button
        className=" text-sm font-semibold text-red-700"
        onClick={() => {
          dispatch(addToCart({id: beat._id, authorId: authorId}));
          posAction();
        }}
      >
        Añadir al carrito
      </button>
    )
}