import { Main, HelpContainer, Head } from "@/components";
import { useTranslation } from "react-i18next";

export default function HelpOverview() {
  const [t, i18n] = useTranslation("global");
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer
          helpTitle={"helpTitle"}
          helpParagraph={"helpParagraph"}
        >
          <p className="text-base-light color-neutral-black-900">
            <span className="text-titulo3-semibold text-red-700 ">
              {t("helpCenter-terms.title")}
            </span>
            <br /> <br />
            {t("helpCenter-terms.t1")}
            <br /> <br />
            {t("helpCenter-terms.t2")}
            <br /> <br />
            {t("helpCenter-terms.t3")}
            <br /> <br />
            {t("helpCenter-terms.t4")}
            <br /> <br />
            {t("helpCenter-terms.t5")}
            <br /> <br />
            {t("helpCenter-terms.t6")}
            <br /> <br />
            {t("helpCenter-terms.t7")}
            <br /> <br />
            {t("helpCenter-terms.t8")}
            <br /> <br />
            {t("helpCenter-terms.t9")}
            <br /> <br />
            {t("helpCenter-terms.t10")}
            <br /> <br />
            {t("helpCenter-terms.t11")}
            <br /> <br />
            {t("helpCenter-terms.t12")}
          </p>
        </HelpContainer>
      </Main>
    </>
  );
}
