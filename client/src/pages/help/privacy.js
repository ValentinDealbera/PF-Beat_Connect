import { Main, HelpContainer, Head } from "@/components";
import { useTranslation } from "react-i18next";

export default function HelpOverview() {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer
          helpTitle={"helpPrivacyTitle"}
          helpParagraph={"helpPrivacyParagraph"}
        >
          <p className="text-base-light color-neutral-black-900">
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.title")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t1")}
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.t2")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t3")}
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.t4")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t5")}
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.t6")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t7")}
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.t8")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t9")}
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
            {t("helpCenter-privacy.t10")}
            </span>
            <br />
            <br />
            {t("helpCenter-privacy.t11")}
          </p>
        </HelpContainer>
      </Main>
    </>
  );
}
