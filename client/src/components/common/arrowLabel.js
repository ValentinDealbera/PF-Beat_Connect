import Image from "next/image";

export default function ArrowLabel({ label, handleDropdownClick }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleDropdownClick}>
    <button  type="button">
      {label || "Seleccionar"}
    </button>
    <Image src="/icon/arrow-down.svg" width={12} height={12} />
  </div>
  );
}