import Image from "next/image";

const BeatImage = ({ beat, height, width }) => {

  return (
    <div
      className="relative aspect-square rounded-md object-cover"
      style={{ height: height, width: width }}
    >
      <Image
        src={beat.image}
        alt={beat.name}
        layout="fill"
        className="rounded-xl object-cover"
      />
    </div>
  );
};

export default BeatImage;
