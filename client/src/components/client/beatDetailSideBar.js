import Image from "next/image";

export default function BeatDetailSideBar({ beat }) {
  const dynamicBeatDetailBox = [
    {
      msg1: "Free License, MP3",
      msg2: "$0.00",
      beat: beat,
    },
    {
      msg1: "Standart License, WAV",
      msg2: "$10.00",
      beat: beat,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-8 px-4 sm:px-9 pb-10 sm:pt-8">
        <BeatDataBox beat={beat} />
        <div className="flex flex-col gap-3">
          <p className=" color-primary-red-700  text-sm font-medium">
            Precios y licencias
          </p>
          <div className=" flex flex-col gap-2">
            {dynamicBeatDetailBox.map((box) => {
              return (
                <BeatDetailBox
                  msg1={box.msg1}
                  msg2={box.msg2}
                  beat={box.beat}
                  key={box.msg1}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function BeatDataBox({ beat }) {
  return (
    <div className="gap-estilo3 flex w-[286px] flex-row bg-white">
      <Image
        height={80}
        width={80}
        className="border-radius-estilo2 aspect-square object-cover"
        src={beat.image}
        alt={beat.name}
      />
      <div className="flex flex-col justify-center">
        <h1 className="text-base font-bold">{`${beat.name}`}</h1>
        <div className="flex flex-row items-center gap-1">
          <span className="text-sm font-light">{`${beat.author?.name}`}</span>
          <Image
            className="inline object-cover"
            width={14}
            height={14}
            src={"/icon/checked-blue.svg"}
            alt="checked"
          />
        </div>
        <div className="pt-0">
          <span className="color-primary-red-700 text-sm font-semibold">{`$${beat.price}`}</span>
          <span className="text-sm font-light">{` | ${beat.BPM}BPM`}</span>
        </div>
      </div>
    </div>
  );
}

function BeatDetailBox({ msg1, msg2 }) {
  return (
    <div className="h-auto rounded-3xl bg-white border-red-700 border-2 px-4 py-4">
      <p className="pb-1 text-base font-medium text-red-700">{msg1}</p>
      <p className="pb-[10px] text-sm font-semibold text-red-700">{msg2}</p>
      <button className=" rounded-3xl bg-red-700 px-5 py-[10px] text-sm font-semibold text-white">
        Añadir al carrito
      </button>
    </div>
  );
}
