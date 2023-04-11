import Foto from "../../../public/images/matthew-moloney-tKB1GDJUq9c-unsplash.jpg";
import Image from "next/image";
import { navPublic } from "@/data/data";
import { useRouter } from "next/router";
export default function ClientReview() {
    const router = useRouter();

    const currentSlug = router.pathname;
    console.log(currentSlug);
  
    const currentItem = navPublic.find((item) => currentSlug === item.url);
    const currentMode = currentItem ? currentItem.colorMode : "light";
  console.log(currentMode)
  return (
    <div className= {`text-start flex flex-col gap-estilo4  border-radius-estilo1 p-5 ${
        currentMode === "light" ? " " : "border-4 border-indigo-500/100;"
      }`}  >
      <div className="flex flex-row items-cegnter border-radius-estilo1 gap-estilo4 " >
        <Image  alt="client"  className="aspect-square rounded-full object-cover"  src={Foto} width={40} height={40}  />
        <h1 className="text-base-medium text-sm flex">@ExampleName</h1>
      </div>
      <p className="text-base-light text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis elit
        vitae est facilisis luctus a nec purus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </p>
    </div>
  );
}
