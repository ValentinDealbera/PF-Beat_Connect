import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import { ReactSVG } from "react-svg";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
   
  return (
    <Link href="/">
      <div className="logo relative" style={{ width: "150px", height: "40px" }}>
        <ReactSVG
          src={pathname.startsWith("/admin") ? "/icon/logo-dark.svg" : "/icon/logo-white.svg"}
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
