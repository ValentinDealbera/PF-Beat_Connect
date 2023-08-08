import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart";
import { useTranslation } from "react-i18next";

export default function AddToCart({ beat, posAction }) {
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();

  const authorId = beat.userCreator._id
    ? beat.userCreator._id
    : beat.userCreator;

  return (
    <button
      className=" text-sm font-semibold text-red-700"
      onClick={() => {
        dispatch(addToCart({ authorId: authorId, beat: beat }));
        posAction();
      }}
    >
      {t("beatDetailSideBar.t3")}
    </button>
  );
}
