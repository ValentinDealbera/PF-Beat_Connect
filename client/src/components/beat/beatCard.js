import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
import { useState } from "react";

import {
  deleteClientBeat,
  setActiveEditingBeat,
} from "@/redux/slices/client/beats";

import {
  setActiveEditingReview,
  setActiveBeatCreateReview,
} from "@/redux/slices/client/reviews";

import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  manageEditBeat,
  MiniModalBox,
} from "@/components";

export default function BeatCard({
  beat,
  variant,
  manageView,
  mode,
  width,
  manageEditReview,
  manageCreateReview,
}) {
  const dispatch = useDispatch();
  const [visibilityReviewsModal, setVisibilityReviewsModal] = useState(false);
  const [visibilityOwnedModal, setVisibilityOwnedModal] = useState(false);
  const { bougthBeats } = useSelector((state) => state.client.beats);

  const userReviews = useSelector((state) => state.client.reviews.reviews);
  const { _id } = useSelector(
    (state) => state.client.authSession.session.current
  );

  const fromClient = _id === beat.userCreator._id;

  try {
    const reviewed = Boolean(
      userReviews.find((review) => review.beat._id === beat._id)
    );

    const currentReview = userReviews.find(
      (review) => review.beat._id === beat._id
    );

    const boughtBeat = Boolean(
      bougthBeats.find((boughtBeat) => boughtBeat._id === beat._id)
    );

    const ownedActions = {
      handleAction: async () => {
        await dispatch(setActiveItemDetail(beat));
        manageView();
      },
      handleEdit: async () => {
        await dispatch(setActiveEditingBeat(beat));
        manageEditBeat();
      },
      handleDelete: () => {
        dispatch(deleteClientBeat(beat._id));
      },
    };

    const reviewActions = {
      handleCreateReview: () => {
        dispatch(setActiveBeatCreateReview(beat));
        manageCreateReview();
      },
      handleEditReview: async () => {
        await dispatch(setActiveEditingReview(currentReview));
        manageEditReview();
      },
    };

    return (
      <>
        <div
          className="relative w-full"
          onMouseEnter={() => {
            setVisibilityReviewsModal(true);
            setVisibilityOwnedModal(true);
          }}
          onMouseLeave={() => {
            setVisibilityReviewsModal(false);
            setVisibilityOwnedModal(false);
          }}
        >
          <div
            onClick={ownedActions.handleAction}
            className={mode === "grid" ? "w-full" : `${width}`}
          >
            <div
              className={`background-neutral-white gap-estilo3 flex flex-col ${
                variant === "public"
                  ? ""
                  : "border-radius-estilo1 px-2 pb-5 pt-2 "
              }`}
            >
              <BeatImage beat={beat} height={"auto"} width={"auto"} />
              <div className={`${variant === "public" ? "" : "px-2"}`}>
                {boughtBeat ? (
                  <>
                    <span className="color-primary-red-700 font-semibold">
                      COMPRADO
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
            fromClient={fromClient}
            visibilityOwnedModal={visibilityOwnedModal}
            visibilityReviewsModal={visibilityReviewsModal}
            boughtBeat={boughtBeat}
            reviewed={reviewed}
            handleEdit={ownedActions.handleEdit}
            handleDelete={ownedActions.handleDelete}
            handleCreateReview={reviewActions.handleCreateReview}
            handleEditReview={reviewActions.handleEditReview}
          />
        </div>
      </>
    );
  } catch (error) {
    console.log("error", error);
  }
}

function Modals({
  fromClient,
  visibilityOwnedModal,
  visibilityReviewsModal,
  boughtBeat,
  reviewed,
  handleEdit,
  handleDelete,
  handleCreateReview,
  handleEditReview,
}) {
  const fromClientBtns = [
    {
      text: "Editar",
      action: handleEdit,
    },
    {
      text: "Borrar",
      action: handleDelete,
    },
  ];

  return (
    <>
      {fromClient && visibilityOwnedModal && (
        <div>
          <MiniModalBox className="right-1 top-1  ">
            <div className="flex flex-col gap-1">
              {fromClientBtns.map((btn, index) => (
                <Button key={index} text={btn.text} action={btn.action} />
              ))}
            </div>
          </MiniModalBox>
        </div>
      )}

      {!fromClient && visibilityReviewsModal && boughtBeat && (
        <div>
          <MiniModalBox className="right-1 top-1">
            <div className="flex flex-col">
              {boughtBeat && !reviewed && !fromClient && (
                <Button text={"Crear review"} action={handleCreateReview} />
              )}
              {boughtBeat && reviewed && !fromClient && (
                <Button text={"Editar review"} action={handleEditReview} />
              )}
            </div>
          </MiniModalBox>
        </div>
      )}
    </>
  );
}

function Button({ text, action }) {
  return (
    <button
      className=" whitespace-nowrap text-sm font-medium text-black"
      onClick={(e) => {
        e.stopPropagation(), action();
      }}
    >
      {text}
    </button>
  );
}
