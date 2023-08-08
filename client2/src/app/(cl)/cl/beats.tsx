"use client";
import { BeatsGrid, BuyerNavGeneral, Section } from "@/components";
import ReviewsGrid from "@/components/shop/reviewsGrid";

export default function BeatsSection() {
  const index = 0;
  return (
    <Section subClassName="padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col">
      <BuyerNavGeneral />
      {index >= 0 && index <= 2 ? <BeatsGrid beats={{}} /> : <ReviewsGrid />}
    </Section>
  );
}
