import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { externalManageDropdown } from "@/components/beat/beatCardGrid";
import { addToCart } from "@/redux/slices/cart";
import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  BeatAudio,
  AddToCart,
} from "@/components";

export default function BeatDetailSideBar() {
  const currentBeat = useSelector((state) => state.beats.activeItemDetail);

  const dynamicBeatDetailBox = [
    {
      msg1: "Free License, MP3",
      msg2: "$0.00",
      beat: currentBeat,
    },
    {
      msg1: "Standart License, WAV",
      msg2: "$10.00",
      beat: currentBeat,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8 px-4  sm:px-9 sm:pt-8">
        <BeatDataBox beat={currentBeat} />
        <div className="flex flex-col gap-3">
          <p className=" color-primary-red-700  text-sm font-medium">
            Precios y licencias
          </p>
          <div className=" flex flex-col gap-4">
            {dynamicBeatDetailBox.map((box) => {
              return (
                <div>
                  <BeatDetailBox
                    msg1={box.msg1}
                    msg2={box.msg2}
                    key={box.msg1}
                    beat={currentBeat}
                  />
                  <hr className="mt-4 border-slate-200" />
                </div>
              );
            })}
          </div>
          <BeatAudio beat={currentBeat} />
        </div>
      </div>
    </>
  );
}

function BeatDataBox({ beat }) {
  return (
    <div className="gap-estilo3 flex w-[286px] flex-row bg-white">
      <BeatImage beat={beat} height={80} width={80} />
      <div className="flex flex-col justify-center">
        <BeatTitle beat={beat} />
        <AuthorName beat={beat} />
        <div className="pt-0">
          <BeatPrice beat={beat} />
          <BeatBPM beat={beat} />
        </div>
      </div>
    </div>
  );
}

function BeatDetailBox({ msg1, msg2, beat }) {
  const dispatch = useDispatch();
  return (
    <div className="h-auto">
      <p className="pb-1 text-base font-medium text-black">{msg1}</p>
      <p className=" mb-1 text-sm font-semibold text-red-700">{msg2}</p>
<AddToCart beat={beat} posAction={() => externalManageDropdown()} />
    </div>
  );
}
