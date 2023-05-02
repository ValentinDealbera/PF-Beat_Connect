import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";

export default function FaqsItem({ faq }) {
  const router = useRouter();
  const [t, i18n] = useTranslation("global");
  return (
    <div className="faq-item gap-estilo4 flex flex-col">
      <div className="gap-estilo4 flex flex-row  items-center">
        <ReactSVG
          src={
            router.pathname.startsWith("/help")
              ? "/icon/dashboard/faq-dark.svg"
              : "/icon/dashboard/faq-icon.svg"
          }
          className="dashboard-item__icon h-[24px] w-[24px] fill-current text-black dark:text-dark"
        />
        <h3 className="text-subtitulo-medium">{t(faq.title)}</h3>
      </div>
      <p className="text-base-light">{t(faq.content)}</p>
    </div>
  );
}
