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
  const { bougthBeats, ownedBeats } = useSelector(
    (state) => state.client.beats
  );

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
      {generalActiveIndex === 0 ? (
        <NewBeatCardGrid beats={bougthBeats} />
      ) : generalActiveIndex === 1 && isSeller === false ? (
        <ForSellerOnly />
      ) : generalActiveIndex === 1 && isSeller === true ? (
        <NewBeatCardGrid beats={ownedBeats} />
      ) : (
        <div>
          <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
            <>
              <ReviewCardGrid />
            </>
          </div>
          {activeReviewDetail.length === 0 && (
            <div className="flex w-full items-end justify-center">
              <h1 className="mb-8 mt-5 text-center text-2xl font-medium">
                Hey, parece que no hay nada por aqui 🤯
              </h1>
            </div>
          )}
        </div>
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
