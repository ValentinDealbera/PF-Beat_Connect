import { faqsAdmin, faqs } from "@/data/data";
import { FaqsItem } from "@/components";

export default function FaqsGrid(mode) {

  let datos = [];

  console.log(mode.mode)

  if (mode.mode === "admin"){
    datos = faqsAdmin;
  } else{
    datos = faqs;
  };

  console.log(datos)

  return (
    <div className="grid grid-cols-1 gap-estilo1  md:grid-cols-2">
      {datos.map((faq) => (
        <FaqsItem   key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
