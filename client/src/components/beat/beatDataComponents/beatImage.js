import Image from "next/image";

export default function BeatImage({ beat, height, width }) {
  return (
    <div
      className="relative aspect-square rounded-md object-cover"
      style={{ height: height, width: width }}
    >
      <Image
        src={beat.image}
        alt="Beat image"
        layout="fill"
        className="rounded-xl object-cover"
      />
    </div>
  );
}
