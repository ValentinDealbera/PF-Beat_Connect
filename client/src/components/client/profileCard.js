import Image from "next/image";
export default function ProfileCard({
  profilePhoto,
  profileName,
  profileMessage,
}) {


  return (
    <div className="flex w-max max-w-full flex-row overflow-hidden rounded-full bg-white  py-2 pl-2 pr-5 sm:max-w-[300px]">
      <div className="gap-estilo4 flex flex-row ">
        <Image
          src={profilePhoto}
          width={75}
          height={75}
          alt="Profile photo"
          className="aspect-square rounded-full border object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder.png";
          }}
        />
        <div className="mx-auto my-auto px-2">
          <div className="gap-estilo4 flex flex-row items-center justify-start">
            <h1 className="text-base-medium ">{profileName}</h1>
            {/* <Image
              src="/icon/checked-blue.svg"
              alt="checked profile"
              width={20}
              height={20}
            /> */}
          </div>
          <h3 className="text-sm-light ">{profileMessage}</h3>
        </div>
      </div>
    </div>
  );
}
