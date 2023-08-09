import { useRef, useState } from "react";
import { BeatImage, AuthorName, BeatTitle } from "@/components";
import Modals from "./modals";
import { useAppDispatch } from "@/redux/hooks";
import { setActiveItemDetail } from "@/redux/slices/beats";

type BeatCardProps = {
  beat: any;
  variant: "public" | "private";
  mode?: "grid" | "flex";
  setVisibilityCreateReview: (visibility: boolean) => void;
  setVisibilityEditReview: (visibility: boolean) => void;
  setVisibilityViewBeat: (visibility: boolean) => void;
};

export default function BeatCard({
  beat,
  variant,
  mode,
  setVisibilityCreateReview,
  setVisibilityEditReview,
  setVisibilityViewBeat,
}: BeatCardProps) {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [visibilityReviewEditBag, setVisibilityReviewEditBag] = useState(false);
  const [visibilityOwnedBag, setVisibilityOwnedBag] = useState(false);

  const handleAction = async () => {
    await dispatch(setActiveItemDetail(beat));
    setVisibilityViewBeat(true);
  };

  return (
    <div
      ref={ref}
      className="relative w-full "
      onClick={handleAction}
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
        setVisibilityEditBeat={setVisibilityViewBeat}
      />
    </div>
  );
}
