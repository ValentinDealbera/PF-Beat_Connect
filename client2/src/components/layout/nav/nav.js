import Link from "next/link";
import { useRouter } from "next/router";
import {NavModalItem, VerticalNav} from "@/components";
import {navHelp, navPublic} from "@/data/data";
import { useTranslation } from "react-i18next";

export default function Nav({ currentMode}) {
  const router = useRouter();
  const [t, i18n] = useTranslation("global");

  return (
    <>
      <nav className="z-10 hidden lg:flex">
        <ul className="gap-estilo2 flex flex-row">
          {navPublic.map(
            (item, index) =>
              item.visible === true && (
                <li key={index}>
                  <Link
                    href={item.url}
                    className={`${
                      item.url === router.pathname
                        ? "text-base-semibold"
                        : "text-base-light"
                    } ${
                      currentMode === "light"
                        ? "color-neutral-black-950"
                        : "color-neutral-white"
                    }`}
                  >
                    {t(item.name)}
                  </Link>
                </li>
              )
          )}
          <li className="relative" >
            <NavModalItem iconStatus={false} label={t("navModalItem.label")}  id={"helpItemModal"} labelClass={"text-base-light text-white"}>
              <VerticalNav navItems={navHelp} title={"Centro de ayuda"} />
            </NavModalItem>
            </li>
        </ul>
      </nav>
    </>
  );
}
