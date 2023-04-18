import Image from "next/image";
import Link from "next/link";
import { externalManageDropdown } from "./newBeatCardGrid";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
import { fetchCurrentBeat } from "@/redux/slices/client";
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
const { _id } = useSelector((state) => state.client.client);


const fromClient = _id === beat.userCreator._id;

if(fromClient) console.log("fromClient", _id, beat.userCreator._id);



  const handleAction = () => {
    dispatch(setActiveItemDetail(beat));
    externalManageDropdown();
  };

  const handleEdit = () => {
    dispatch(fetchCurrentBeat(beat._id));
   manageEditBeat();
  };

  return (
    <>
      <div onClick={handleAction}>
        <div
          className={`background-neutral-white gap-estilo3 flex flex-col ${
            variant === "public" ? "" : "border-radius-estilo1 px-2 pb-5 pt-2 "
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
        {
        fromClient && (
          <button  className="px-8 py-8 bg-black text-white" onClick={(e) => {e.stopPropagation(), handleEdit()}}>
            Editar {beat.name}
          </button>
        )
      }
      </div>

    </>
  );
}
