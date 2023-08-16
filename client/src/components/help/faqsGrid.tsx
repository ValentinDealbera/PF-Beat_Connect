import { faqsAdmin, faqs } from "@/data/data";
import { FaqsItem } from "@/components";

type FaqsGridProps = {
  mode: "admin" | "user";
};

export default function FaqsGrid({ mode }: FaqsGridProps) {
  let datos = mode === "admin" ? faqsAdmin : faqs;

  return (
    <div className="grid grid-cols-1 gap-estilo1  md:grid-cols-2">
      {datos.map((faq) => (
        <FaqsItem faq={faq} />
      ))}
    </div>
  );
}
