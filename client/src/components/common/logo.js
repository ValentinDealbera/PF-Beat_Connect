import Image from "next/image";
import Link from "next/link";
export default function Logo({ mode }) {
  console.log("logo", mode);

  return (
    <Link href="/">
      <div className="logo relative" style={{ width: "150px", height: "40px" }}>
        <Image
          src={mode === "light" ? "/icon/logo.svg" : "/icon/logo-white.svg"}
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Link>
  );
}
