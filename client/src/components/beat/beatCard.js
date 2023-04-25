import Image from "next/image";
import Link from "next/link";
import { externalManageDropdown } from "./newBeatCardGrid";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
//import { fetchCurrentBeat } from "@/redux/slices/client";
import { deleteClientBeat, setActiveEditingBeat } from "@/redux/slices/client/beats";
import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  manageEditBeat,
} from "@/components";

export default function BeatCard({ beat, variant }) {
  const dispatch = useDispatch();
  try {
    const { _id } = useSelector(
      (state) => state.client.authSession.session.current
    );

    const fromClient = _id === beat.userCreator._id;

    const handleAction = () => {
      dispatch(setActiveItemDetail(beat));
      externalManageDropdown();
    };

    const handleEdit = async() => {
      await dispatch(setActiveEditingBeat(beat));
      manageEditBeat();
    };

    const handleDelete = () => {
      dispatch(deleteClientBeat(beat._id));
    };

    return (
      <>
        <div onClick={handleAction}>
          <div
            className={`background-neutral-white gap-estilo3 flex flex-col ${
              variant === "public"
                ? ""
                : "border-radius-estilo1 px-2 pb-5 pt-2 "
            }`}
          >
            <BeatImage beat={beat} height={"auto"} width={"auto"} />
            <div className={`${variant === "public" ? "" : "px-2"}`}>
              <BeatPrice beat={beat} />
              <BeatBPM beat={beat} />
              <BeatTitle beat={beat} />
              <AuthorName beat={beat} />
            </div>
          </div>
          {fromClient && (
            <>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleEdit();
                }}
              >
                Editar {beat.name}
              </button>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleDelete();
                }}
              >
                Borrar {beat.name}
              </button>
            </>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.log("error", error);
  }
}
