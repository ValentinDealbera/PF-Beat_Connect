import {
  Main,
  HelpContainer,
  Head,
  FaqsGrid,
  ModalPopUp,
  Input,
  TextArea,
  ClientReview,
  ReviewCardGrid,
} from "@/components";

import { useSelector } from "react-redux";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BeatReviewPopup({ modal, handleModalReview }) {
  const [t] = useTranslation("global");
  //const [modal, setModal] = useState(false);

  const currentBeatReview = useSelector(
    (state) => state.beats.activeItemDetail
  );

  console.log(currentBeatReview);

  //sacamos promedio de rating
const rating = currentBeatReview.review.map((review) => review.rating);
const averageRating = rating.reduce((a, b) => a + b, 0) / rating.length;


  return (
    <>
      {modal && (
        <ModalPopUp>
          <div className="relative flex max-h-full w-full flex-col justify-center gap-4 overflow-hidden rounded-3xl bg-white py-10 px-4 xs:px-8 sm:p-10 xl:w-[100%] ">
            <Image
              src="/icon/cross.svg"
              width={15}
              height={15}
              onClick={handleModalReview}
              alt="close"
              className="absolute right-4 top-4 cursor-pointer"
            />
            <div className="flex flex-col ">
              <h1 className="text-titulo3-semibold">
                {currentBeatReview.name}{" "}
              </h1>
              <p className="text-base-regular">
                {averageRating} {t("clientReview")} | {currentBeatReview.review.length} Reviews
              </p>
            </div>
            
            <div className="grid w-full grid-cols-1 overflow-y-scroll gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <>
                {currentBeatReview.review.map((review) => (
                  <>
                    <ClientReview
                      currentMode="showcase"
                      title={review.title}
                      comment={review.comment}
                      username={`${review.createdBy.firstName} ${review.createdBy.lastName}`}
                      review={review}
                    />
                  </>
                ))}
              </>
            </div>
          </div>
        </ModalPopUp>
      )}
    </>
  );
}
