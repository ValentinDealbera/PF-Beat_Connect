import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function AuthorName({ beat }) {
  const userFullName = `${beat.userCreator.firstName} ${beat.userCreator.lastName}`;

  return (
    <div className="flex flex-row items-center gap-1">
      <Link
        href={`/beats/author/${beat.userCreator?._id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-light">{userFullName}</span>
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
