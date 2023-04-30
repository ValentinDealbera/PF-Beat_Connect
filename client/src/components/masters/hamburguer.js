import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useState } from "react";
import NavModalItem from "../layout/nav/navModalItem";
import VerticalNav from "../layout/nav/verticalNav";
import { navHelp } from "@/data/data";

export default function Hamburger({ options }) {
  const [dropDown, setDropDown] = useState(false);
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <button
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        {" "}
        Tocame{" "}
      </button>
      {dropDown && (
        <div className="w-fit rounded-xl border-2">
          <div className="flex flex-col gap-1 px-4 py-2">
            {options.map((option) => {
              return (
                option.visible && (
                  <Link href={option.url}>
                    {" "}
                    <p>{t(option.name)}</p>
                  </Link>
                )
              );
            })}
            <NavModalItem
              iconStatus={false}
              label={t("navModalItem.label")}
              id={"helpItemModal"}
              labelClass={"text-base-light text-black relative"}
            >
              <VerticalNav className="absolute" navItems={navHelp} title={"Centro de ayuda"} />
            </NavModalItem>
          </div>
        </div>
      )}
    </>
  );
}
