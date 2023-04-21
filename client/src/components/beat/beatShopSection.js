import { Section, BeatFilters, NewBeatCardGrid } from "@/components";
import { selectFilteredBeats } from "@/redux/selectors/filters";
import { useSelector, useDispatch } from "react-redux";
import { fetchBeats } from "@/redux/slices/beats";
import { useEffect } from "react";

export default function BeatShopSection() {
  const beatFilters = useSelector(selectFilteredBeats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBeats(beatFilters));
    console.log("fucking query >", beatFilters);
  }, []);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BeatFilters />
      <NewBeatCardGrid beats={beatFilters} />
    </Section>
  );
}
