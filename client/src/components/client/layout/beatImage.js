import Image from "next/image";

export default function BeatImage({ producto, height, width }) {
  return (
    <div
      className="relative aspect-square rounded-md object-cover"
      style={{ height: height, width: width }}
    >
      <Image
        src={producto.image}
        alt={producto.name}
        layout="fill"
        className="rounded-xl object-cover"
      />
    </div>
  );
}
