import {
  BeatBottomSheet,
  BeatDetailSideBar,
  BeatRightSheet,
  EditReviewForm,
  ReviewForm,
} from "@/components";

type Props = {
  visibilityViewBeat: boolean;
  setVisibilityViewBeat: (value: boolean) => void;
  visibilityEditReview: boolean;
  setVisibilityEditReview: (value: boolean) => void;
  visibilityCreateReview: boolean;
  setVisibilityCreateReview: (value: boolean) => void;
  visibilityEditBeat: boolean;
  setVisibilityEditBeat: (value: boolean) => void;
};

export default function Modals({
  visibilityViewBeat,
  setVisibilityViewBeat,
  visibilityEditReview,
  setVisibilityEditReview,
  visibilityCreateReview,
  setVisibilityCreateReview,
  setVisibilityEditBeat,
  visibilityEditBeat,
}: Props) {
  //Manage deben ser false
  return (
    <>
      {visibilityViewBeat && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet setIsDropdownOpen={setVisibilityViewBeat}>
              <BeatDetailSideBar />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setVisibilityViewBeat}>
              <BeatDetailSideBar />
            </BeatBottomSheet>
          </div>
        </>
      )}
      {visibilityEditReview && (
        <BeatRightSheet
          width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
          setIsDropdownOpen={setVisibilityEditReview}
        >
          <EditReviewForm manageEditReview={setVisibilityEditReview} />
        </BeatRightSheet>
      )}
      {visibilityCreateReview && (
        <BeatRightSheet
          width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
          setIsDropdownOpen={setVisibilityCreateReview}
        >
          <ReviewForm manageCreateReview={setVisibilityCreateReview} />
        </BeatRightSheet>
      )}
      {visibilityEditBeat && (
        <BeatRightSheet
          width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
          setIsDropdownOpen={setVisibilityEditBeat}
        >
          <>Hola</>
        </BeatRightSheet>
      )}
    </>
  );
}
