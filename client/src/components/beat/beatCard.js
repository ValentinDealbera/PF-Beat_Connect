import Image from "next/image";
import Link from "next/link";
import { externalManageDropdown } from "./beatCardGrid";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
} from "@/components";

export default function BeatCard({ beat, variant }) {
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(setActiveItemDetail(beat));
    externalManageDropdown();
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
      </div>
    </>
  );
}
