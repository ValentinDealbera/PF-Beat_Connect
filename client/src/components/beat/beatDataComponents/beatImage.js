import Image from "next/image";

const BeatImage = ({ beat, height, width }) => {

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
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/placeholder.png";
        }}
      />
    </div>
  );
};

export default BeatImage;
