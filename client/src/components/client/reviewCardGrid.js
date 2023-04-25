import {
  BeatCard,
  BeatRightSheet,
  BeatDetailSideBar,
  BeatBottomSheet,
  Loader,
  ClientReview,
} from "@/components";
import { useState } from "react";
import { useSelector } from "react-redux";

export function externalManageDropdown() {
  // NewBeatCardGrid.handleDropdownOpen();
}

export default function ReviewCardGrid(props) {
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const reviews = useSelector((state) => state.client.reviews.reviews);

  console.log(reviews);

  return (
    <>
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
        {reviews && reviews.length > 0 && (
          <>
            {reviews?.map((review) => (
              <>
                <ClientReview
                  currentMode=""
                  title={review.title}
                  comment={review.comment}
                  username={`${review.createdBy.firstName} ${review.createdBy.lastName}`}
                  review={review}
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
    </>
  );
}
