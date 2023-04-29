import Image from "next/image";

export default function BeatBPM({ beat}) {
  return <span className="font-light">{` | ${beat.BPM}BPM`}</span>;
}
