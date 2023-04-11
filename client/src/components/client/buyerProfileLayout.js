import { Section, IslandDashboard, BuyerNavSettings } from "@/components";

export default function BuyerProfileLayout({ children }) {
  return (
    <Section
      subClassName="padding-estilo3 gap-estilo1 flex flex-row lg:max-w-[1024px] "
      className="background-neutral-slate-100"
    >
      <IslandDashboard className="w-2/5">
        <BuyerNavSettings />
      </IslandDashboard>
      <IslandDashboard>{children}</IslandDashboard>
    </Section>
  );
}
