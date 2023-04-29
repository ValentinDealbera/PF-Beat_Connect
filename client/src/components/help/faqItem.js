import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";

export default function FaqsItem({ faq }) {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="faq-item gap-estilo4 flex flex-col">
      <div className="gap-estilo4 flex flex-row  items-center">
        <ReactSVG
          src="/icon/faq-icon.svg"
          className="dashboard-item__icon h-[24px] w-[24px] fill-current text-black dark:text-white"
        />
        <h3 className="text-subtitulo-medium">{t(faq.title)}</h3>
      </div>
      <p className="text-base-light">{t(faq.content)}</p>
    </div>
  );
}
