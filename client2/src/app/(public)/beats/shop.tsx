"use client";
import { BeatsGrid, BeatFilters, PaginateBeats } from "@/components";
import { useAppSelector } from "@/redux/hooks";

export default function ShopSection() {
  const beats = useAppSelector((state) => state?.beats?.publicItems) || [];
  return (
    <>
      {/* <BeatFilters /> */}
      <BeatsGrid beats={beats} />
      <PaginateBeats />
    </>
  );
}
