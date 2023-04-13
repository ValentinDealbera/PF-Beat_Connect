import Image from "next/image";

export default function ArrowLabel({ label, handleDropdownClick, iconStatus, labelClass }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleDropdownClick}>
    <button className={labelClass}  type="button">
      {label || "Seleccionar"}
    </button>
    {iconStatus === true &&  <Image src="/icon/arrow-down.svg" width={12} height={12} /> }
  </div>
  );
}