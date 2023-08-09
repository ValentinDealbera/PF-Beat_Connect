import Image from "next/image";

type ProfileCardProps = {
  profilePhoto: string;
  profileName: string;
  profileMessage: string;
};

export default function ProfileCard({
  profilePhoto,
  profileName,
  profileMessage,
}: ProfileCardProps) {
  return (
    <div className="flex w-max max-w-full gap-estilo4 flex-row overflow-hidden rounded-full bg-white  py-2 pl-2 pr-5 sm:max-w-[300px]">
      <Image
        src={profilePhoto}
        width={75}
        height={75}
        alt="Profile photo"
        className="aspect-square rounded-full border object-cover"
      />
      <div className="flex items-center px-2">
        <h1 className="text-base-medium ">{profileName}</h1>
        <h3 className="text-sm-light ">{profileMessage}</h3>
      </div>
    </div>
  );
}
