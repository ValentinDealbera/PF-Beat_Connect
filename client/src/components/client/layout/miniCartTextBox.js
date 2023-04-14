import Image from "next/image";
import Link from "next/link";

export default function MiniCartTextBox({ beat }) {
  return (
    <div>

      <h1 className="font-bold">{`${beat.name}`}</h1>
      <span className="color-primary-red-700 font-semibold">{`$${beat.price}`}</span>
    
      <div className="flex flex-row items-center gap-1">
        <Link
          href={`/beats/author/${beat.id}`}
          onClick={(e) => e.stopPropagation()}
        >
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
  );
}
