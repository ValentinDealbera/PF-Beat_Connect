import { Section, IslandDashboard, BuyerNavSettings } from "@/components";

export default function BuyerProfileLayout({ children }) {
  return (
    <>
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col">
      <BuyerNavSettings />
     {children}
    </Section>
    </>
  );
}
