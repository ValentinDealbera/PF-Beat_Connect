import Image from "next/image";
import Link from "next/link";

export default function BeatCard({ beat, variant }) {
  console.log(variant);
  return (
    <>
      <div
        className={`background-neutral-white gap-estilo3 flex flex-col ${
          variant === "public"
            ? ""
            : "border-radius-estilo1 px-2 pt-2 pb-5 "
        }`}
      >
        <div>
          <Image
            className="border-radius-estilo2 color-primary-red-700 aspect-square object-cover"
            src={beat.image}
            alt={beat.name}
          />
        </div>
        <div className={`${variant === "public" ? "" :"px-2"}`}>
          <span className="color-primary-red-700 font-semibold">{`$${beat.price}`}</span>
          <span className="font-light">{` | ${beat.BPM}BPM`}</span>
          <h1 className="font-bold">{`${beat.name}`}</h1>
          <div className="flex flex-row items-center gap-1">
            <Link href={`/beats/author/${beat.id}`}>
              <span className="font-light">{`${beat.author?.name}`}</span>
            </Link>
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
