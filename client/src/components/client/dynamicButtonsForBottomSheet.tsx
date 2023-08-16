import Image from "next/image";

type DynamicButtonsForBottomSheetProps = {
  dynamicFilterBtns: {
    label: string;
    handleClick: () => void;
  }[];
};

export default function DynamicButtonsForBottomSheet({
  dynamicFilterBtns,
}: DynamicButtonsForBottomSheetProps) {
  return (
    <div className="flex flex-col gap-4">
      {dynamicFilterBtns.map((e) => (
        <div className="flex w-full flex-col ">
          <hr className="w-full border-slate-200 pb-4" style={{ height: 1 }} />
          <button
            onClick={e.handleClick}
            className="flex w-full flex-row justify-between gap-2"
          >
            {e.label}
            <Image
              height={15}
              width={15}
              src="/icon/arrow-down.svg"
              alt="arrow-down"
            />
          </button>
        </div>
      ))}
    </div>
  );
}
