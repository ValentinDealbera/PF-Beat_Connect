import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AuthorName({ beat }) {
  const router = useRouter();
  // const { firstName, lastName } = useSelector(
  //   (state) => state.beats.currentAuthor
  // );


  // const currentUser = useSelector((state) => state.client.client);
  // const [userFullName, setUserFullName] = useState("");

  // useEffect(() => {
  //   if (router.pathname === "/beats/author/[slug]") {
  //     if (!beat.userCreator.firstName && !beat.userCreator.lastName) {
       
  //       setUserFullName(`${firstName} ${lastName}`);
  //     } else {
  //       setUserFullName(
  //         `${beat.userCreator.firstName} ${beat.userCreator.lastName}`
  //       );
  //     }
  //   } else if (router.pathname === "/client") {
  //     if (!beat.userCreator.firstName && !beat.userCreator.lastName) {
  //       setUserFullName(`${currentUser.firstName} ${currentUser.lastName}`);
  //     } else {
  //       setUserFullName(
  //         `${beat.userCreator.firstName} ${beat.userCreator.lastName}`
  //       );
  //     }
  //   } else {
  //     setUserFullName(
  //       `${beat.userCreator.firstName} ${beat.userCreator.lastName}`
  //     );
  //   }
  // }, [beat, currentUser, firstName, lastName, router.query.slug]);

  const userFullName = `${beat.userCreator.firstName} ${beat.userCreator.lastName}`

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
