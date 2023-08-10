import { BeatsClass } from "@/types";

type BeatBPMProps = {
  beat: BeatsClass;
};

export default function BeatBPM({ beat }: BeatBPMProps) {
  return <span className="font-light">{` | ${beat.BPM}BPM`}</span>;
}
