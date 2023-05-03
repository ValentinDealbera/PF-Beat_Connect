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
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function externalManageDropdown() {
  // NewBeatCardGrid.handleDropdownOpen();
}

export default function ReviewCardGrid(props) {
  const [t] = useTranslation("global");
  const [isDropDown, setIsDropdownOpen] = useState(false);
  const reviews = useSelector((state) => state.client.reviews.reviews);

  const manageEditReview = () => {
    setIsDropdownOpen(!isDropDown);
  };

  return (
    <>
        {reviews && reviews.length === 0 && (
          <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="mt-5 text-center text-2xl font-medium">
              {t("reviewCardGrid.t1")}
          </h1>
          <div className="flex w-full justify-center ">
              <Link href="/beats">
                <button className="text-base-semibold mt-2 w-full rounded-full bg-red-700 px-4 py-2 text-white">
                  {t("reviewCardGrid.t2")}
                </button>
              </Link>
              </div>
              </div>
        )}
        {reviews && reviews.length > 0 && (
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
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
      </div>
        )}
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
