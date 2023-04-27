import Image from "next/image";
import { validateImage } from "@/utils/validateImage";

export default function BeatImage({ beat, height, width }) {

const imageSrc = validateImage(beat.image);

  return (
    <div
      className="relative aspect-square rounded-md object-cover"
      style={{ height: height, width: width }}
    >
      <Image
        src={imageSrc}
        alt="Beat image"
        layout="fill"
        className="rounded-xl object-cover"
      />
    </div>
  );
}
