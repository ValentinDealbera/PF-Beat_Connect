import Image from "next/image";

export default function ClientImage({ client, height, width }) {
  return (
    <Image
      src={client.profilePicture}
      width={height}
      height={width}
      alt="Profile photo"
      className="aspect-square rounded-full object-cover  "
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/images/placeholder.png";
      }}
    />
  );
}
