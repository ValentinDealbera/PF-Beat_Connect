import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function FaqsItem({ faq }) {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="faq-item gap-estilo4 flex flex-col">
      <div className="gap-estilo4 flex flex-row">

        <Image src="/icon/faq-icon.svg" width={24} height={24} alt="faq-icon" className="dark:text-green-200" />
        <h3 className="text-subtitulo-medium">{t(faq.title)}</h3>

        {/* <Image src="/icon/faq-icon.svg" width={24} height={24} alt="faq-icon" />
        <h3 className="text-subtitulo-medium">{t(faq.title)}</h3> */}

      </div>
      <p className="text-base-light">{t(faq.content)}</p>
    </div>
  );
}
