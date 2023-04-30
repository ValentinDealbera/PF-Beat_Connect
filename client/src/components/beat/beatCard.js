import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  deleteClientBeat,
  setActiveEditingBeat,
  postFavoriteBeat,
  deleteFavoriteBeat,
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
  ModalPopUp,
  BeatReviewPopup,
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
  const [t, i18n] = useTranslation("global");
  const dispatch = useDispatch();
  const [visibilityReviewsModal, setVisibilityReviewsModal] = useState(false);
  const [visibilityOwnedModal, setVisibilityOwnedModal] = useState(false);
  const [visibilityFavoriteModal, setVisibilityFavoriteModal] = useState(false);
  const [logged, setLogged] = useState(false);
  const { bougthBeats, favoriteBeats } = useSelector(
    (state) => state.client.beats
  );

  const { isLogged } = useSelector((state) => state.client.authSession.auth);

  const isFavorite = Boolean(
    favoriteBeats.find((favoriteBeat) => favoriteBeat._id === beat._id)
  );

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
        console.log("DELETE BEAT - card", beat._id);
        dispatch(deleteClientBeat(beat._id));
      },
    };

    const reviewActions = {
      handleCreateReview: () => {
        dispatch(setActiveBeatCreateReview(beat));
        console.log("creando");
        manageCreateReview();
      },
      handleEditReview: async () => {
        await dispatch(setActiveEditingReview(currentReview));
        console.log("editando");
        manageEditReview();
      },
    };

    const favoriteActions = {
      handleAddFavorite: () => {
        if (!isLogged) return setLogged(true);
        dispatch(postFavoriteBeat({ favorite: beat._id }));
      },
      handleDeleteFavorite: () => {
        dispatch(deleteFavoriteBeat({ favorite: beat._id }));
      },
    };

    return (
      <>
        <div
          className="relative w-full "
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
              className={`gap-estilo3 flex flex-col ${
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
                      {t("beatCar.purchased")}
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
            setLogged={setLogged}
            logged={logged}
            fromClient={fromClient}
            visibilityOwnedModal={visibilityOwnedModal}
            visibilityReviewsModal={visibilityReviewsModal}
            boughtBeat={boughtBeat}
            reviewed={reviewed}
            handleEdit={ownedActions.handleEdit}
            handleDelete={ownedActions.handleDelete}
            handleCreateReview={reviewActions.handleCreateReview}
            handleEditReview={reviewActions.handleEditReview}
            visibilityFavoriteModal={visibilityFavoriteModal}
            isFavorite={isFavorite}
            handleAddFavorite={favoriteActions.handleAddFavorite}
            handleDeleteFavorite={favoriteActions.handleDeleteFavorite}
          />
        </div>
      </>
    );
  } catch (error) {
    console.log("error", error);
  }
}

function Modals({
  setLogged,
  logged,
  fromClient,
  visibilityOwnedModal,
  visibilityReviewsModal,
  boughtBeat,
  reviewed,
  handleEdit,
  handleDelete,
  handleCreateReview,
  handleEditReview,
  isFavorite,
  handleAddFavorite,
  handleDeleteFavorite,
}) {

  const [t, i18n] = useTranslation("global");
  const fromClientBtns = [
    {
      text: "beatCar.edit",
      action: handleEdit,
    },
    {
      text: "beatCar.delete",
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
                <Button key={index} text={t(btn.text)} action={btn.action} />
              ))}
            </div>
          </MiniModalBox>
        </div>
      )}

      {logged && (
        <ModalPopUp>
          <div className="relative flex max-h-full w-12 flex-col justify-center overflow-hidden rounded-3xl bg-white p-10 xl:w-[40%] ">
            <Image
              src="/icon/cross.svg"
              width={15}
              height={15}
              onClick={() => setLogged(false)}
              alt="close"
              className="absolute right-4 top-4 cursor-pointer"
            />
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="text-lg pb-3 font-bold text-red-700">
                  {t("beatCar.modalPopUp1")}
              </h1>
              <h2>
                  {t("beatCar.modalPopUp2")}
              </h2>
              <p>{t("beatCar.modalPopUp3")}</p> 
              <p className="pb-2">{t("beatCar.modalPopUp4")}</p>
              <p className="mb-4">{t("beatCar.modalPopUp5")}</p>
              <Link href="/auth">
            <div className="flex gap-2 rounded-full bg-red-700 pb-2 pl-4 pr-4 pt-2 text-base font-semibold text-white">
              <p>{t("beatCar.modalPopUp6")}</p>
            </div>
          </Link>
            </div>
          </div>
        </ModalPopUp>
      )}

      {!fromClient && visibilityReviewsModal && boughtBeat && (
        <div>
          <MiniModalBox className="right-1 top-1">
            <div className="flex flex-col">
              {boughtBeat && !reviewed && !fromClient && (
                <Button text={t("beatCar.createReview")} action={handleCreateReview} />
              )}
              {boughtBeat && reviewed && !fromClient && (
                <Button text={t("beatCar.editReview")} action={handleEditReview} />
              )}
            </div>
          </MiniModalBox>
        </div>
      )}
      {!fromClient && visibilityReviewsModal && (
        <MiniModalBox className="left-1 top-1">
          {!isFavorite && !fromClient && (
            <Button
              icon="/icon/corazon.svg"
              alt="heart"
              text={""}
              action={handleAddFavorite}
            />
          )}
          {isFavorite && !fromClient && (
            <Button
              icon="/icon/corazon-lleno.svg"
              alt="heart"
              text={""}
              action={handleDeleteFavorite}
            />
          )}
        </MiniModalBox>
      )}
    </>
  );
}

function Button({ text, action, icon, alt }) {
  return (
    <button
      className=" whitespace-nowrap text-sm font-medium text-black"
      onClick={(e) => {
        e.stopPropagation(), action();
      }}
    >
      {icon && <img src={icon} alt={alt} className="aspect-square h-5 w-5" />}
      {text}
    </button>
  );
}
