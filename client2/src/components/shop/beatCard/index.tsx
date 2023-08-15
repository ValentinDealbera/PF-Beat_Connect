import { useRef, useState } from "react";
import {
  BeatImage,
  AuthorName,
  BeatTitle,
  BeatBPM,
  BeatPrice,
} from "@/components";
import Modals from "./modals";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveItemDetail } from "@/redux/slices/beats";
import { useTranslation } from "react-i18next";

type BeatCardProps = {
  beat: any;
  variant: "public" | "private";
  mode?: "grid" | "flex";
  setVisibilityCreateReview: (visibility: boolean) => void;
  setVisibilityEditReview: (visibility: boolean) => void;
  setVisibilityViewBeat: (visibility: boolean) => void;
  setVisibilityEditBeat: (visibility: boolean) => void;
};

export default function BeatCard({
  beat,
  variant,
  mode,
  setVisibilityCreateReview,
  setVisibilityEditReview,
  setVisibilityViewBeat,
  setVisibilityEditBeat,
}: BeatCardProps) {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [t] = useTranslation("global");
  const [visibilityReviewEditBag, setVisibilityReviewEditBag] = useState(false);
  const [visibilityOwnedBag, setVisibilityOwnedBag] = useState(false);
  const { sorter, sorterValues } = useAppSelector((state) => state?.filters);
  const { bougthBeats, favoriteBeats } = useAppSelector(
    (state) => state.client.beats,
  );

  const boughtBeat = Boolean(
    bougthBeats.find((boughtBeat) => boughtBeat._id === beat._id),
  );

  const sortArr = sorterValues;

  const handleAction = async () => {
    await dispatch(setActiveItemDetail(beat));
    setVisibilityViewBeat(true);
  };

  return (
    <div
      ref={ref}
      className="relative w-full "
      onClick={(e: any) => {
        e.stopPropagation();
        handleAction();
      }}
      onMouseEnter={() => {
        setVisibilityReviewEditBag(true);
        setVisibilityOwnedBag(true);
      }}
      onMouseLeave={() => {
        setVisibilityReviewEditBag(false);
        setVisibilityOwnedBag(false);
      }}
    >
      <div className={mode === "grid" ? "w-full" : ``}>
        <div
          className={`gap-estilo3 flex flex-col ${
            variant === "public" ? "" : "border-radius-estilo1 px-2 pb-5 pt-2 "
          }`}
        >
          <BeatImage
            beat={beat}
            height={"auto"}
            width={"auto"}
            tapVisible={false}
          />
          <div className={`${variant === "public" ? "" : "px-2"}`}>
            {boughtBeat ? (
              <>
                <span className="color-primary-red-700 font-semibold">
                  {t("beatCar.purchased")}
                </span>
                <BeatBPM beat={beat} />
              </>
            ) : (
              <>
                <BeatPrice beat={beat} />
                <BeatBPM beat={beat} />
              </>
            )}
            <BeatTitle beat={beat} />
            <AuthorName beat={beat} />
          </div>
        </div>
      </div>
      <Modals
        beat={beat}
        visibilityOwnedBag={visibilityOwnedBag}
        visibilityReviewEditBag={visibilityReviewEditBag}
        setVisibilityCreateReview={setVisibilityCreateReview}
        setVisibilityEditReview={setVisibilityEditReview}
        setVisibilityEditBeat={setVisibilityEditBeat}
      />
    </div>
  );
}
