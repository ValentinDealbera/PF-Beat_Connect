import {
  Section,
  BuyerNavGeneral,
  NewBeatCardGrid,
  ClientReview,
  ReviewCardGrid,
} from "@/components";

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

  const isLoading = useSelector((state) => state.client.authSession.actionStatus.getUserDataLoading);
console.log("isLoadingxxx", isLoading);
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
      {generalActiveIndex === 0 ? (
        <NewBeatCardGrid beats={bougthBeats} isLoading={isLoading} />
      ) : generalActiveIndex === 1 && isSeller === false ? (
        <ForSellerOnly />
      ) : generalActiveIndex === 1 && isSeller === true ? (
        <NewBeatCardGrid beats={ownedBeats} isLoading={isLoading} />
      ) : generalActiveIndex === 2 ? (
        <div>
          <NewBeatCardGrid beats={favoriteBeats} isLoading={isLoading} />
        </div>
      ) : (
        <ReviewCardGrid />
      )}
    </Section>
  );
}

function ForSellerOnly() {
  return (
    <div>
      <h1>Esta caracteristica es solo para vendedores</h1>
    </div>
  );
}
