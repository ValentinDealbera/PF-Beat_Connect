import { BeatsClass } from "@/types";

type BeatPriceProps = {
  beat: BeatsClass;
};

export default function BeatPrice({ beat }: BeatPriceProps) {
  return (
    <span className="color-primary-red-700 font-semibold">{`$${beat.priceAmount}`}</span>
  );
}
