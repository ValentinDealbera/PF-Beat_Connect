import Foto from "../../../public/images/matthew-moloney-tKB1GDJUq9c-unsplash.jpg";
import Image from "next/image";
import { navPublic } from "@/data/data";
import { useRouter } from "next/router";
import {deleteClientReview, setActiveEditingReview} from "@/redux/slices/client/reviews";
import { useDispatch } from "react-redux";

export default function ClientReview(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentSlug = router.pathname;
  console.log(currentSlug);

  const handleEdit = async () => {
    await dispatch(setActiveEditingReview(props.review));
    //manageEditBeat();
    props.manageEditReview()
  };

  const handleDelete = () => {
    //console.log("delete");
    dispatch(deleteClientReview(props.review._id));
  };

  //const currentItem = navPublic.find((item) => currentSlug === item.url);
  const currentMode = props.currentMode;
  console.log(currentMode);
  return (
    <div
      className={`gap-estilo4 border-radius-estilo1 flex flex-col  p-5 text-start ${
        currentMode === "light" ? " " : "border-indigo-500/100; border-4"
      }`}
    >
      <div className="items-cegnter border-radius-estilo1 gap-estilo4 flex flex-row ">
        <Image
          alt="client"
          className="aspect-square rounded-full object-cover"
          src={Foto}
          width={40}
          height={40}
        />
        <h1 className="text-base-medium flex text-sm">{props.username}</h1>
      </div>
      <p className="text-base-light text-sm">{props.title}</p>
      <p className="text-base-light text-sm">{props.comment}</p>
      <>
        <button
          className="bg-black px-8 py-8 text-white"
          onClick={(e) => {
            e.stopPropagation(), handleEdit();
          }}
        >
          Editar
        </button>
        <button
          className="bg-black px-8 py-8 text-white"
          onClick={(e) => {
            e.stopPropagation(), handleDelete();
          }}
        >
          Borrar
        </button>
      </>
    </div>
  );
}
