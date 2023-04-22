import { Section, BeatFilters, NewBeatCardGrid } from "@/components";
import { useSelector } from "react-redux";

export default function BeatShopSection() {
  const filteredBeats = useSelector((state) => state.beats.publicItems);

  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BeatFilters />
      <NewBeatCardGrid beats={filteredBeats} />
    </Section>
  );
}
