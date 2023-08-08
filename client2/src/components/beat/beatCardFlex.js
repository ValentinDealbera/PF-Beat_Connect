import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
  ReviewForm,
  EditReviewForm,
} from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";


export default function BeatCardFlex(props) {
  const [t, i18n] = useTranslation("global");
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const { beatsDisplayMode, generalActiveIndex } =
    useSelector((state) => state?.beats) || 0;
  const isLoading = useSelector((state) => state.beats.loadingBeats);
  const handleDropdownOpen = () => {
    setIsDropdownOpen(!isDropDown);
  };

  BeatCardFlex.handleDropdownOpen = handleDropdownOpen;

  const [visibilityEditReview, setVisibilityEditReview] = useState(false);
  const manageEditReview = () => {
    setVisibilityEditReview(!visibilityEditReview);
  };

  const [visibilityCreateReview, setVisibilityCreateReview] = useState(false);
  const manageCreateReview = () => {
    setVisibilityCreateReview(!visibilityCreateReview);
  };

  return (
    <>
      {props.beats && props.beats <= 0 && (
        <div className="flex w-full items-end justify-center">
          <h1 className="mt-5 text-center text-2xl font-medium">
            {t("NoBeats")} 🤯
          </h1>
        </div>
      )}
      <div className="gap-estilo1 flex flex-1 flex-shrink flex-grow overflow-y-scroll xl:overflow-y-hidden   ">
        {props.beats && props.beats.length > 0 && (
          <>
            {props.beats?.map((beat) => (
              <>
                <BeatCard
                  key={beat.id}
                  beat={beat}
                  variant="public"
                  manageView={handleDropdownOpen}
                  manageEditReview={manageEditReview}
                  manageCreateReview={manageCreateReview}
                  width="min-w-[75vw] sm:min-w-[40vw] md:min-w-[40vw] lg:min-w-[25vw] xl:min-w-[auto] basis-full"
                  mode="flex"
                />
              </>
            ))}
          </>
        )}
      </div>
      {isDropDown && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              <BeatDetailSideBar />
            </BeatBottomSheet>
          </div>
        </>
      )}
      {visibilityEditReview && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet
               width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
              setIsDropdownOpen={setVisibilityEditReview}
            >
              <EditReviewForm manageEditReview={manageEditReview} />
            </BeatRightSheet>
          </div>
        </>
      )}
      {visibilityCreateReview && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet
               width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
              setIsDropdownOpen={setVisibilityCreateReview}
            >
              <ReviewForm manageCreateReview={manageCreateReview} />
            </BeatRightSheet>
          </div>
        </>
      )}
    </>
  );
}
