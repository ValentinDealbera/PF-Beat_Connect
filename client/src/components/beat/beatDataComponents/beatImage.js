import Image from "next/image";
import { ImageCache } from "@/components";

const BeatImage = ({ beat, height, width, tapVisible = false }) => {
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
        { tapVisible && (
        <p className="text-sm-regular absolute left-1/2 px-3 py-1 rounded-full top-1/2 z-10 w-max -translate-x-1/2 -translate-y-1/2 transform bg-[#000000b3] text-center text-white lg:hidden">
        Doble tap para más detalles
      </p>
        )
        }


        {/* <ImageCache imageUrl={beat.image} /> */}
      </div>
    );
  } catch (error) {
    console.log("error", error);
  }
};

export default BeatImage;
