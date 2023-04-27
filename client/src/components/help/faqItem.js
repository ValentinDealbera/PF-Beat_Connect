import Image from "next/image";

export default function FaqsItem({ faq }) {
  return (
    <div className="faq-item gap-estilo4 flex flex-col">
      <div className="gap-estilo4 flex flex-row">
        <Image src="/icon/faq-icon.svg" width={24} height={24} alt="faq-icon" className="dark:text-green-200" />
        <h3 className="text-subtitulo-medium">{faq.title}</h3>
      </div>
      <p className="text-base-light">{faq.content}</p>
    </div>
  );
}
