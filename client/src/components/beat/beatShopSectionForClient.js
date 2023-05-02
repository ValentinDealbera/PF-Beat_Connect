import {
  Section,
  BuyerNavGeneral,
  NewBeatCardGrid,
  ClientReview,
  ReviewCardGrid,
  manageBecomeSeller,
} from "@/components";

import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//import { fetchUserReviews } from "@/redux/slices/beats";

export default function BeatShopSectionForClient(props) {

  const {
    auth: { isSeller },
    session: {
      current: { _id },
    },
  } = useSelector((state) => state.client.authSession);

  const { activeReviewDetail, generalActiveIndex } = useSelector(
    (state) => state.beats
  );

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(fetchUserReviews(_id));
  }, []);

  const { activeItems } = useSelector((state) => state?.beats) || [];
  const { bougthBeats, ownedBeats, favoriteBeats } = useSelector(
    (state) => state.client.beats
  );

  const isLoading = useSelector(
    (state) => state.client.authSession.actionStatus.getUserDataLoading
  );
  console.log("isLoadingxxx", isLoading);
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
      {generalActiveIndex === 0 ? (
        <NewBeatCardGrid
          beats={bougthBeats}
          mode="bougth"
          isLoading={isLoading}
        />
      ) : generalActiveIndex === 1 && isSeller === false ? (
        <ForSellerOnly />
      ) : generalActiveIndex === 1 && isSeller === true ? (
        <NewBeatCardGrid
          beats={ownedBeats}
          mode="owned"
          isLoading={isLoading}
        />
      ) : generalActiveIndex === 2 ? (
        <div>
          <NewBeatCardGrid
            beats={favoriteBeats}
            mode="favorite"
            isLoading={isLoading}
          />
        </div>
      ) : (
        <ReviewCardGrid />
      )}
    </Section>
  );
}

function ForSellerOnly() {
  const [t] = useTranslation("global");
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <h1 className="mt-5 text-center text-2xl font-medium">
          {t("beatShopSectionForClient.t1")}
      </h1>
      <div className="flex w-full justify-center ">
        <button
          className="text-base-semibold mt-2 w-fit rounded-full bg-red-700 px-4 py-2 text-white"
          onClick={() => manageBecomeSeller()}
        >
            {t("beatShopSectionForClient.t2")}
        </button>
      </div>
    </div>
  );
}
