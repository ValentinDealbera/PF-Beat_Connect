import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Logo() {
  const {theme} = useTheme()
   const logoPath = theme === 'light' ? '/icon/logo.svg' : '/icon/logo-dark.svg';
  return (
    <Link href="/">
      <div className="logo relative" style={{ width: "150px", height: "40px" }}>
        <Image
          src="/icon/logo.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </Link>
  );
}
