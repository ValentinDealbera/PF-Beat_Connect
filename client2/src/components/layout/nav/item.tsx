import Link from "next/link";
import { useTranslation } from "react-i18next";

type NavItemProps = {
  item: any;
  currentMode: "light" | "dark";
  pathname: string;
};

export default function NavItem({ item, currentMode, pathname }: NavItemProps) {
  const [t] = useTranslation("global");
  const itemStyles = `${
    item.url === pathname ? "text-base-semibold" : "text-base-light"
  } ${
    currentMode === "light" ? "color-neutral-black-950" : "color-neutral-white"
  }`;

  return (
    <Link href={item.url} className={itemStyles}>
      {t(item.name)}
    </Link>
  );
}
