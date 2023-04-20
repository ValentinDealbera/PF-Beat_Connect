import {
  BeatCardGrid,
  Section,
  BuyerNavGeneral,
  BeatFilters,
  NewBeatCardGrid,
  ClientReview,
} from "@/components";

import { reviews } from "../../data/fakeDB";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserReviews } from "@/redux/slices/beats";

export default function BeatShopSectionForClient(props) {
  const { authSettings } = useSelector((state) => state.client);
  const { _id } = useSelector((state) => state.client.client);
  const { activeReviewDetail } = useSelector((state) => state.beats);
  const { isSeller } = authSettings;
  const dispatch = useDispatch();
  const { beatsDisplayMode, generalActiveIndex } = useSelector(
    (state) => state.beats
  );

  // console.log(
  //   "isSeller",
  //   isSeller,
  //   "beatsDisplayMode",
  //   beatsDisplayMode,
  //   "generalActiveIndex",
  //   generalActiveIndex
  // );

  useEffect(() => {
    dispatch(fetchUserReviews(_id));
  }, []);

  const { activeItems } = useSelector((state) => state?.beats) || [];

  const [sellerVisibility, setSellerVisibility] = useState(true);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
      {generalActiveIndex === 0 ? (
        <NewBeatCardGrid beats={activeItems} />
      ) : generalActiveIndex === 1 && isSeller === false ? (
        <ForSellerOnly />
      ) : generalActiveIndex === 1 && isSeller === true ? (
        <NewBeatCardGrid beats={activeItems} />
      ) : (
        <div>
          <div className="gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
            <>
              {activeReviewDetail?.map((review) => (
                <>
                  <ClientReview
                    currentMode={props.currentMode}
                    title={review.title}
                    comment={review.comment}
                    username={review.username}
                  />
                </>
              ))}
            </>
          </div>
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
