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
        {reviews && reviews.length === 0 && (
          <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="mt-5 text-center text-2xl font-medium">
          Debes comprar un beat para darle una review! 
          </h1>
          <div className="flex w-full justify-center ">
              <Link href="/beats">
                <button className="text-base-semibold mt-2 w-full rounded-full bg-red-700 px-4 py-2 text-white">
                  Compra uno ahora!
                </button>
              </Link>
              </div>
              </div>
        )}
        {reviews && reviews.length > 0 && (
      <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
              width="w-[30vw]"
              setIsDropdownOpen={setIsDropdownOpen}
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
    </>
  );
}
