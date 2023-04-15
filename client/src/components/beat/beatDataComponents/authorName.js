import Link from "next/link";
import Image from "next/image";

export default function AuthorName({ beat }) {
  return (
    <div className="flex flex-row items-center gap-1">
      <Link
        href={`/beats/author/${beat.userCreator?._id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-light">{`${beat.userCreator?.firstName}${" "}${
          beat.userCreator?.lastName
        }`}</span>
      </Link>
      <Image
        className="inline"
        width={14}
        height={14}
        src={"/icon/checked-blue.svg"}
        alt="checked"
      />
    </div>
  );
}
