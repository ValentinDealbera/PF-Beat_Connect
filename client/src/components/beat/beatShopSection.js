import {
  BeatCardGrid,
  Section,
  BuyerNavGeneral,
  BeatFilters,
} from "@/components";

export default function BeatShopSection() {
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BeatFilters />
      <BuyerNavGeneral />
      <BeatCardGrid />
    </Section>
  );
}
