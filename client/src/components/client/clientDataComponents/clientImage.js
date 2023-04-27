import Image from "next/image"
import { validateImage } from "@/utils/validateImage";

export default function ClientImage({client, height, width}) {
  const imageSrc = validateImage(client.profilePicture);
    return(
        <Image
        src={imageSrc}
        width={height}
        height={width}
        alt="Profile photo"
        className="aspect-square rounded-full object-cover  "
      />
    )
}

