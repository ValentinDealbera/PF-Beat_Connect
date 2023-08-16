import { BeatsClass } from "@/types";

type BeatTitleProps = {
  beat: BeatsClass;
};

export default function BeatTitle({ beat }: BeatTitleProps) {
  return <h1 className="font-bold">{`${beat?.name}`}</h1>;
}
