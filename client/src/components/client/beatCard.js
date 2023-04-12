import Image from "next/image";

export default function BeatCard({ beat, height, width }) {
  return (
    <>
      <div className="background-neutral-white gap-estilo3 flex flex-col">
        <div>
          <Image
            className="border-radius-estilo2 aspect-square object-cover"
            src={beat.image}
            alt={beat.name}
          />
        </div>
        <div>
          <span className="color-primary-red-700 font-semibold">{`$${beat.price}`}</span>
          <span className="font-light">{` | ${beat.BPM}BPM`}</span>
          <h1 className="font-bold">{`${beat.name}`}</h1>
          <div className="flex flex-row items-center gap-1">
            <span className="font-light">{`${beat.author?.name}`}</span>
            <Image
              className="inline"
              width={14}
              height={14}
              src={"/icon/checked-blue.svg"}
              alt="checked"
            />
          </div>
        </div>
      </div>
    </>
  );
}
