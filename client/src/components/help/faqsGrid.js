import { faqsAdmin } from "@/data/data";
import { FaqsItem } from "@/components";

export default function FaqsGrid() {
  return (
    <div className="grid grid-cols-1 gap-estilo1  md:grid-cols-2">
      {faqsAdmin.map((faq) => (
        <FaqsItem   key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
