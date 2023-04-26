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

export default function BeatCardFlex(props) {
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
            Hey, parece que no hay nada por aqui 🤯
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
                  width="min-w-[75vw] md:min-w-[40vw] lg:min-w-[25vw] xl:min-w-[auto] basis-full"
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
              width="w-[30vw]"
              setIsDropdownOpen={setVisibilityEditReview}
            >
              <EditReviewForm manageEditReview={manageEditReview} />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              hey soy el sidebar
            </BeatBottomSheet>
          </div>
        </>
      )}
      {visibilityCreateReview && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet
              width="w-[30vw]"
              setIsDropdownOpen={setVisibilityCreateReview}
            >
              <ReviewForm manageCreateReview={manageCreateReview} />
            </BeatRightSheet>
          </div>
          <div className="flex sm:hidden">
            <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
              hey soy el sidebar
            </BeatBottomSheet>
          </div>
        </>
      )}
    </>
  );
}
