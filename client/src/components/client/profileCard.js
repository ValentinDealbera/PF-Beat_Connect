import Image from "next/image";

export default function ProfileCard({
  profilePhoto,
  profileName,
  profileMessage,
}) {
  return (
    <div className="border-radius-estilo2 flex w-max max-w-full flex-row overflow-hidden bg-white py-4 sm:w-[300px] sm:px-1">
      <div className="gap-estilo4 mx-auto my-auto flex flex-row px-6">
        <Image
          src={profilePhoto}
          width={80}
          height={80}
          alt="Profile photo"
          className="aspect-square rounded-full border object-cover"
        />
        <div className="mx-auto my-auto px-2">
          <div className="gap-estilo4 flex flex-row items-center justify-start">
            <h1 className="text-base-medium ">{profileName}</h1>
            <Image
              src="/icon/checked-blue.svg"
              alt="checked profile"
              width={20}
              height={20}
            />
          </div>
          <h3 className="text-sm-light ">{profileMessage}</h3>
        </div>
      </div>
    </div>
  );
}
