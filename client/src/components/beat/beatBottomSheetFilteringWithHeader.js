import { BeatBottomSheet } from "@/components";
import Image from "next/image";

export default function BeatBottomSheetFilteringWithHeader(props) {
  const handleClick = () => {
    props.setIsDropdownOpen(!props.isDropdownOpen);
  };

  return (
    <BeatBottomSheet setIsDropdownOpen={props.setIsDropdownOpen}>
      <div className="gap-estilo5 padding-x-estilo2 flex flex-col">
        <div className="flex flex-row justify-between">
          <button onClick={props.handleBack}>
            <Image height={6} width={10} src="/icon/arrow-left.svg" />
          </button>
          <button
            onClick={handleClick}
            className="absolute left-1/2 -translate-x-1/2 transform text-lg font-bold"
          >
            {props.title}
          </button>
          <button onClick={props.reset}></button>
        </div>
        {props.children}
      </div>
    </BeatBottomSheet>
  );
}
