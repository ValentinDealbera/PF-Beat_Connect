import { Section, IslandDashboard, BuyerNavSettings } from "@/components";

export default function BuyerProfileLayout({ children }) {
  return (
    <Section
      subClassName="padding-estilo3 gap-estilo1 flex flex-col sm:flex-row lg:max-w-[1024px] "
      className="background-neutral-slate-100"
    >
      <IslandDashboard className=" h-max  w-full sm:w-max">
        <BuyerNavSettings />
      </IslandDashboard>
      <IslandDashboard>{children}</IslandDashboard>
    </Section>
  );
}
