import Image from "next/image";
import Link from "next/link";
import { externalManageDropdown } from "./newBeatCardGrid";
import { useSelector, useDispatch } from "react-redux";
import { setActiveItemDetail } from "@/redux/slices/beats";
//import { fetchCurrentBeat } from "@/redux/slices/client";
import {
  deleteClientBeat,
  setActiveEditingBeat,
} from "@/redux/slices/client/beats";

import { setActiveEditingReview, setActiveBeatCreateReview } from "@/redux/slices/client/reviews";
import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  manageEditBeat,
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
  try {
    const { _id } = useSelector(
      (state) => state.client.authSession.session.current
    );

    const userReviews = useSelector((state) => state.client.reviews.reviews);
    const reviewed2 = userReviews.find(
      (review) => review.beat._id === beat._id
    );

    const reviewed = Boolean(reviewed2);
    const fromClient = _id === beat.userCreator._id;
    const { bougthBeats, ownedBeats } = useSelector(
      (state) => state.client.beats
    );

    const boughtBeat2 = bougthBeats.find(
      (boughtBeat) => boughtBeat._id === beat._id
    );

    const boughtBeat = Boolean(boughtBeat2);
    console.log("boughtBeat", boughtBeat, beat.name, bougthBeats, reviewed);

    const handleAction = () => {
      dispatch(setActiveItemDetail(beat));
      //externalManageDropdown();
      manageView();
    };

    const handleEdit = async () => {
      await dispatch(setActiveEditingBeat(beat));
      manageEditBeat();
    };

    const handleDelete = () => {
      dispatch(deleteClientBeat(beat._id));
    };

    const handleCreateReview = () => {
      dispatch(setActiveBeatCreateReview(beat));
      manageCreateReview();
    };

    const handleEditReview = async () => {
      await dispatch(setActiveEditingReview(reviewed2));
      manageEditReview();
    };

    return (
      <>
        <div
          onClick={handleAction}
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
              <BeatPrice beat={beat} />
              <BeatBPM beat={beat} />
              <BeatTitle beat={beat} />
              <AuthorName beat={beat} />
            </div>
          </div>
          {fromClient && (
            <>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleEdit();
                }}
              >
                Editar {beat.name}
              </button>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleDelete();
                }}
              >
                Borrar {beat.name}
              </button>
            </>
          )}
          {boughtBeat && !reviewed &&  !fromClient && (
            <>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleCreateReview();
                }}
              >
                Dejar review a {beat.name}
              </button>
            </>
          )}
          {boughtBeat && reviewed && !fromClient && (
            <>
              <button
                className="bg-black px-8 py-8 text-white"
                onClick={(e) => {
                  e.stopPropagation(), handleEditReview();
                }}
              >
                editar review a {beat.name}
              </button>
            </>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.log("error", error);
  }
}
