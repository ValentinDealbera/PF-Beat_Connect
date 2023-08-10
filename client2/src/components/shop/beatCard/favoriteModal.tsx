import { MiniModalBox } from "@/components";
import Button from "./button";
import {
  deleteFavoriteBeat,
  postFavoriteBeat,
} from "@/redux/slices/client/beats";
import { useAppDispatch } from "@/redux/hooks";
import { BeatsClass } from "@/types";

type FavoriteModalProps = {
  fromClient: boolean;
  visibilityReviewEditBag: boolean;
  isFavorite: boolean;
  setLogged: (logged: boolean) => void;
  isLogged: boolean;
  beat: BeatsClass;
};

export default function FavoriteModal({
  fromClient,
  visibilityReviewEditBag,
  isFavorite,
  setLogged,
  isLogged,
  beat,
}: FavoriteModalProps) {
  const dispatch = useAppDispatch();

  const handleAddFavorite = () => {
    if (!isLogged) return setLogged(true);
    dispatch(postFavoriteBeat(beat));
  };

  const handleDeleteFavorite = () => {
    dispatch(deleteFavoriteBeat(beat));
  };

  return (
    <>
      <h1 className="text-2xl">FavoriteModal: {visibilityReviewEditBag} </h1>
      {!fromClient && visibilityReviewEditBag && (
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
