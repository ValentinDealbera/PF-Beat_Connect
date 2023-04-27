import Image from "next/image";
import {
  deleteClientReview,
  setActiveEditingReview,
} from "@/redux/slices/client/reviews";
import { MiniModalBox } from "@/components";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function ClientReview(props) {
  const dispatch = useDispatch();

  const [visibilityOwnedModal, setVisibilityOwnedModal] = useState(false);

  const handleEdit = async () => {
    await dispatch(setActiveEditingReview(props.review));
    props.manageEditReview();
  };

  const handleDelete = () => {
    dispatch(deleteClientReview(props.review._id));
  };

  const currentMode = props.currentMode;

  return (
    <div
      className="relative"
      onMouseEnter={() => {currentMode !== "showcase" && setVisibilityOwnedModal(true)}}
      onMouseLeave={() => {currentMode !== "showcase" && setVisibilityOwnedModal(false)}}
    >
      <div
        className={`border-radius-estilo1  flex flex-col  gap-4 p-5 text-start ${
          currentMode === "light" ? " " : "border-indigo-500/100; border"
        }`}
      >
        <div className="border-radius-estilo1 flex flex-row items-center gap-2 ">
          <Image
            alt="client"
            className="aspect-square rounded-full object-cover"
            src={props.review.createdBy.image}
            width={40}
            height={40}
          />
          <h1 className="text-base-medium flex text-sm">{props.username}</h1>
        </div>
        <div className="flex flex-col ">
          <p className=" text-subtitulo-medium text-sm">{props.title}</p>
          <p className="text-base-light text-sm">{props.comment}</p>
        </div>
        <p className="text-base-semibold text-sm">
          {props.review.beat.name}
          {" | "}
          {props.review.rating} Estrellas
        </p>
      </div>
      <Modals
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        visibilityOwnedModal={visibilityOwnedModal}
      />
    </div>
  );
}

function Modals({ visibilityOwnedModal, handleEdit, handleDelete }) {
  const fromClientBtns = [
    {
      text: "Editar",
      action: handleEdit,
    },
    {
      text: "Borrar",
      action: handleDelete,
    },
  ];

  return (
    <div>
      {visibilityOwnedModal && (
        <div>
          <MiniModalBox className="right-1 top-1">
            <div className="flex flex-col gap-1">
              {fromClientBtns.map((btn, index) => (
                <Button key={index} text={btn.text} action={btn.action} />
              ))}
            </div>
          </MiniModalBox>
        </div>
      )}
    </div>
  );
}

function Button({ text, action }) {
  return (
    <button
      className=" whitespace-nowrap text-sm font-medium text-black"
      onClick={(e) => {
        e.stopPropagation(), action();
      }}
    >
      {text}
    </button>
  );
}
