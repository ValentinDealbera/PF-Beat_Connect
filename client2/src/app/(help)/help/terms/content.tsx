"use client";
import { useTranslation } from "react-i18next";

export default function Content() {
  const [t] = useTranslation("global");
  return (
    <>
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
    </>
  );
}
