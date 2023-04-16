import {
  BeatCardGrid,
  Section,
  BuyerNavGeneral,
  BeatFilters,
} from "@/components";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BeatShopSection() {
  const router = useRouter();
  const { authSettings } = useSelector((state) => state.client);
  const { beatsDisplayMode, generalActiveIndex } = useSelector(
    (state) => state.beats
  );
  const { isSeller } = authSettings;
  const [sellerVisibility, setSellerVisibility] = useState(true);

  useEffect(() => {
    if (
      isSeller === false &&
      beatsDisplayMode === 2 &&
      generalActiveIndex === 1
    ) {
      setSellerVisibility(false);
    } else {
      setSellerVisibility(true);
    }
  }, [isSeller, beatsDisplayMode, generalActiveIndex]);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BeatFilters />
      <BuyerNavGeneral />
      {generalActiveIndex != 2 && (
        <>{sellerVisibility === true ? <BeatCardGrid /> : <ForSellerOnly />}</>
      )}
      {
        generalActiveIndex === 2 && (
          <div>
            <h1>Muy pronto prodras ver tus reviews</h1>
          </div>
        )
      }
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
