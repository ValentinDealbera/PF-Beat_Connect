import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactSVG } from "react-svg";

export default function Logo() {
  const pathname = usePathname();

  return (
    <Link href="/">
      <div className="logo relative" style={{ width: "150px", height: "40px" }}>
        <ReactSVG
          src={
            pathname.startsWith("/admin")
              ? "/icon/logo-dark.svg"
              : "/icon/logo-white.svg"
          }
          className="absolute top-0 left-0 w-full h-full fill-current text-black dark:text-white"
        />
      </div>
    </Link>
  );
}
