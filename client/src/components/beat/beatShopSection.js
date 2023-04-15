import {
  BeatCardGrid,
  Section,
  BuyerNavGeneral,
  BeatFilters,
} from "@/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBeatsDisplayMode } from "@/redux/slices/beats";

export default function BeatShopSection({ mode }) {
  const dispatch = useDispatch();
  console.log("mode", mode);
  useEffect(() => {
    dispatch(setBeatsDisplayMode(mode));
  }, []);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      {mode === "shop" && <BeatFilters />}
      {mode === "profile" && <BuyerNavGeneral />}
      <BeatCardGrid />
    </Section>
  );
}
