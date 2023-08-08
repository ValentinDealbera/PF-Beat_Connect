import { Logo } from "@/components";
import Link from "next/link";
import { helpItems, generalItems, accountItems } from "@/data/navItems";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function Footer(props) {
  const [t, i18n] = useTranslation("global");
  //obtenemos el idioma actual
  const currentLanguage = i18n.language;
  return (
    <>
      <footer
        className={`${
          props.mode === "light"
            ? "background-neutral-white xl:hidden"
            : "bg-gray-950"
        } flex flex-row items-center  justify-center align-middle`}
      >
        <div className="padding-x-estilo2 padding-y-estilo1 flex flex-col items-start justify-between gap-8 align-middle md:flex-row">
          <Logo mode={props.mode} />
          <div className="flex flex-col items-start gap-8 md:flex-row lg:gap-12">
            <FooterNav
              items={generalItems}
              title={t("footerNav.general")}
              mode={props.mode}
            />
            <FooterNav
              items={helpItems}
              title={t("footerNav.help")}
              mode={props.mode}
            />
            <FooterNav
              items={accountItems}
              title={t("footerNav.account")}
              mode={props.mode}
            />
            <div className="gap-estilo4 flex flex-col">
              <h3 className="text-subtitulo-semibold color-neutral-white">
                {t("footerNav.idioma")}
              </h3>

              <div className="flex flex-col justify-start items-start gap-4 md:flex-row lg:gap-2">
                <button
                  onClick={() => i18n.changeLanguage("es")}
                  className={`text-white  ${
                    currentLanguage === "es"
                      ? "font-bold underline"
                      : "font-light"
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`text-white  ${
                    currentLanguage === "en"
                      ? "font-bold underline"
                      : "font-light"
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterNav({ items, title, mode }) {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <div className="gap-estilo4 flex flex-col">
        <h3
          className={`text-subtitulo-semibold ${
            mode === "light" ? "color-neutral-black-950" : "color-neutral-white"
          }`}
        >
          {title}
        </h3>
        <nav className="">
          <ul className="gap-estilo4 flex flex-col">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`${
                    mode === "light"
                      ? "color-neutral-black-950  text-base-light"
                      : "color-neutral-white text-base-light"
                  }`}
                >
                  {t(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
