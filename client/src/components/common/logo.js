import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

export default function Logo() {
  const router = useRouter();
   
  return (
    <Link href="/">
      <div className="logo relative" style={{ width: "150px", height: "40px" }}>
        <ReactSVG
          src={router.pathname.startsWith("/admin") ? "/icon/logo-dark.svg" : "/icon/logo-white.svg"}
          alt="logo"
          className="absolute top-0 left-0 w-full h-full fill-current text-black dark:text-white"
        />
        {/* <Image
          src="/icon/logo-white.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
        /> */}
      </div>
    </Link>
  );
}
