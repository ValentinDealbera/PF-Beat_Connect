import Image from "next/image";
import { ImageCache } from "@/components";


const BeatImage = ({ beat, height, width }) => {
try {
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
      {/* <ImageCache imageUrl={beat.image} /> */}
    </div>
  );
}
catch (error) {
  console.log("error", error);
}
};


export default BeatImage;
