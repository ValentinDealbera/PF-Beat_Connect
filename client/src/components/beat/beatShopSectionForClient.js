import {
  BeatCardGrid,
  Section,
  BuyerNavGeneral,
  BeatFilters,
  NewBeatCardGrid,
} from "@/components";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function BeatShopSectionForClient() {
  const { authSettings } = useSelector((state) => state.client);
  const { isSeller } = authSettings;
  const { beatsDisplayMode, generalActiveIndex } = useSelector(
    (state) => state.beats
  );

  console.log("isSeller", isSeller, "beatsDisplayMode", beatsDisplayMode, "generalActiveIndex", generalActiveIndex);

  const { activeItems } = useSelector((state) => state?.beats) || [];

  const [sellerVisibility, setSellerVisibility] = useState(true);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
{
        generalActiveIndex === 0 ? (
            <NewBeatCardGrid beats={activeItems} />
        ) : generalActiveIndex === 1 && isSeller === false ? (
            <ForSellerOnly />
        ) : generalActiveIndex === 1 && isSeller===true? (
            <NewBeatCardGrid beats={activeItems} />
        ) : (
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
