import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
  Loader,
  ClientReview,
  NewBeatCardGrid,
  ReviewForm,
  EditReviewForm,
} from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function externalManageDropdown() {
  // NewBeatCardGrid.handleDropdownOpen();
}

export default function ReviewCardGrid(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const reviews = useSelector((state) => state.client.reviews.reviews);

  console.log(reviews);

  useEffect(() => {
    console.log("reviews cambio", reviews);
  }, [reviews]);

  const manageEditReview = () => {
    setIsDropdownOpen(!isDropDown);
  };

  return (
    <>
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {reviews && reviews.length > 0 && (
          <>
            {reviews.map((review) => (
              <>
                <ClientReview
                  currentMode=""
                  title={review.title}
                  comment={review.comment}
                  username={`${review.createdBy.firstName} ${review.createdBy.lastName}`}
                  review={review}
                  manageEditReview={manageEditReview}
                />
              </>
            ))}
          </>
        )}
      </div>
      {isDropDown && (
        <>
          <div className="hidden sm:flex">
            <BeatRightSheet
             width="min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] "
              setIsDropdownOpen={setIsDropdownOpen}
            >
              <EditReviewForm manageEditReview={manageEditReview} />
            </BeatRightSheet>
          </div>
        </>
      )}
    </>
  );
}
