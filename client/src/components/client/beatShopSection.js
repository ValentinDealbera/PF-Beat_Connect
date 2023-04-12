import { BeatCardGrid, Section, BuyerNavGeneral, BeatFilters } from "@/components";
import { beats } from "@/data/fakeDB";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BeatShopSection({ mode }) {
  const activeIndex = useSelector((state) => state.profile.activeIndex);
  const [beatsData, setBeatsData] = useState([]);

  useEffect(() => {
    if (activeIndex === 0) {
      setBeatsData(beats);
    } else if (activeIndex === 1) {
      setBeatsData(beats.filter((beat) => beat.genre === "trap"));
    } else if (activeIndex === 2) {
      setBeatsData(beats.filter((beat) => beat.genre === "hip-hop"));
    }
  }, [activeIndex]);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo5 flex flex-col">
      {mode === "shop" && <BeatFilters/>}
      {mode === "profile" && <BuyerNavGeneral activeIndex={0} />}
      <BeatCardGrid beats={beatsData} />
    </Section>
  );
}
