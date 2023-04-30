import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  manageEditBeat,
  MiniModalBox,
} from "@/components";

export default function BeatRightSheet({
  children,
  setIsDropdownOpen,
  width = "w-[360px]",
}) {
  return (
    <div
      id="master-box"
      className="fixed z-40 flex h-screen w-screen items-end  top-0 right-0 justify-end overflow-hidden"
    >
      <div
        id="box"
        className={`relative z-50 flex h-screen items-start justify-end xs:rounded-bl-3xl xs:rounded-tl-3xl bg-white ${width} overflow-hidden py-10`}
      >
        <img
          onClick={() => {
            setIsDropdownOpen(false);
          }}
          className=" absolute left-0 top-0 z-40 h-16 w-16 cursor-pointer p-6"
          src="/icon/cross.svg"
          alt="close"
        />
        <div className=" w-full h-full relative">
        <div className="absolute w-full h-full">{children}</div>
        </div>
        
      </div>

      <div
        onClick={() => {
          setIsDropdownOpen(false);
        }}
        className="fixed left-0 top-0 z-40 h-screen w-screen  bg-black opacity-50"
      ></div>
    </div>
  );
}
