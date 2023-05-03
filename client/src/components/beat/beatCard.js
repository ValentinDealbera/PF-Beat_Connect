import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
import { useState, useRef, useEffect } from "react";
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
  const [showSelect, setShowSelect] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [logged, setLogged] = useState(false);
  const { bougthBeats, favoriteBeats } = useSelector(
    (state) => state.client.beats
  );
const [tapVisible, setTapVisible] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const ref = useRef(null);

  const { isLogged } = useSelector((state) => state.client.authSession.auth);
  const isFavorite = Boolean(
    favoriteBeats.find((favoriteBeat) => favoriteBeat._id === beat._id)
  );
  const userReviews = useSelector((state) => state.client.reviews.reviews);
  const { _id } = useSelector(
    (state) => state.client.authSession.session.current
  );

  const fromClient = _id === beat.userCreator._id;

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisibilityReviewsModal(false);
        setVisibilityOwnedModal(false);
        setTapVisible(false);
      } else {
        setVisibilityReviewsModal(true);
        setVisibilityOwnedModal(true);
        setTapVisible(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, isSelected]);

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

    //--------------------Funciones de accion--------------------
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

    const favoriteActions = {
      handleAddFavorite: () => {
        if (!isLogged) return setLogged(true);
        dispatch(postFavoriteBeat({ favorite: beat._id }));
      },
      handleDeleteFavorite: () => {
        dispatch(deleteFavoriteBeat({ favorite: beat._id }));
      },
    };

    //--------------------Funciones de control de eventos--------------------

    function handleTouchStart() {
      setTouchStartTime(Date.now());
    }
    function handleTouchEnd() {
      const touchEndTime = Date.now();
      if (touchEndTime - touchStartTime < 200) {
        if (isSelected === true) {
          return;
        }
        setShowSelect(!showSelect);
      }
    }
    function handleClick() {
      if (window.innerWidth > 1023) {
        ownedActions.handleAction();
      }
    }
    function handleDoubleClick() {
      if (window.innerWidth <= 1023) {
        ownedActions.handleAction();
      }
    }

    return (
      <>
        <div
          ref={ref}
          className="relative w-full "
          onMouseEnter={() => {
            setVisibilityReviewsModal(true);
            setVisibilityOwnedModal(true);
          }}
          onMouseLeave={() => {
            setVisibilityReviewsModal(false);
            setVisibilityOwnedModal(false);
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            onClick={handleClick}
            className={mode === "grid" ? "w-full" : `${width}`}
          >
            <div
              className={`gap-estilo3 flex flex-col ${
                variant === "public"
                  ? ""
                  : "border-radius-estilo1 px-2 pb-5 pt-2 "
              }`}
            >
              <BeatImage beat={beat} height={"auto"} width={"auto"} tapVisible={tapVisible} />
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
          <div className="relative flex max-h-full  flex-col justify-center overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-10 md:p-7 lg:p-10 w-max ">
            <Image
              src="/icon/cross.svg"
              width={15}
              height={15}
              onClick={() => setLogged(false)}
              alt="close"
              className="absolute right-4 top-4 cursor-pointer"
            />
            <div className="flex w-full flex-col items-center justify-center">
              <h1 className="pb-2 text-titulo3-semibold text-center font-bold text-red-700">
                {t("beatCar.modalPopUp1")}
              </h1>
              <h2 className="text-center text-base-light" >{t("beatCar.modalPopUp2")}</h2>
              <p className="text-center text-base-light">{t("beatCar.modalPopUp3")}</p>
              <p className="text-center text-base-medium">{t("beatCar.modalPopUp4")}</p>
              <p className="mb-4 text-center text-base-light">{t("beatCar.modalPopUp5")}</p>
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
                <Button
                  text={t("beatCar.createReview")}
                  action={handleCreateReview}
                />
              )}
              {boughtBeat && reviewed && !fromClient && (
                <Button
                  text={t("beatCar.editReview")}
                  action={handleEditReview}
                />
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
