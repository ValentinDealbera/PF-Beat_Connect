import { BeatsSpecialSection } from "@/components";
import HeroSection from "./hero";
import ShopSection from "./shop";
import PromoSection from "./promoSection";

export default function Beats() {
  return (
    <>
      <HeroSection />
      <BeatsSpecialSection title={"beats.t3"} />
      <PromoSection />
      <ShopSection />
    </>
  );
}
