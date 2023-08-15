import { useAppDispatch } from "@/redux/hooks";
import { useTranslation } from "react-i18next";

type BeatDetailBoxProps = {
  msg1: string;
  msg2: string;
  beat: any;
  handleModalReview: () => void;
  type: string;
  hasReview: boolean;
};

export default function BeatDetailBox({
  msg1,
  msg2,
  beat,
  handleModalReview,
  type,
  hasReview,
}: BeatDetailBoxProps) {
  const [t] = useTranslation("global");
  const dispatch = useAppDispatch();

  //que el boton pueda descargar el beat
  return (
    <div className="h-auto">
      <p className="pb-1 text-base font-medium text-black">{msg1}</p>
      <p className=" mb-1 text-sm font-semibold text-red-700">{msg2}</p>
      {hasReview && type !== "free" ? (
        <button
          className=" text-sm font-semibold text-red-700"
          onClick={handleModalReview}
        >
          {t("beatDetailSideBar.t4")}
        </button>
      ) : type === "free" ? (
        <a
          className=" text-sm font-semibold text-red-700"
          download={beat.name}
          href={beat.audioMP3}
        >
          {t("beatDetailSideBar.t2")}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}
