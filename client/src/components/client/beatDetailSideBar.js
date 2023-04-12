import Image from "next/image"
import { useEffect } from "react"

function BeatDetailBox({msg1, msg2}) {
  return (
    <div className="mx-9 h-32 mb-2 bg-red-100 rounded-3xl">
      <div className="px-4 py-4">
        <p className="pb-2 text-red-700 font-medium text-base">{msg1}</p>
        <p className="pb-[10px] text-red-700 font-semibold text-sm">{msg2}</p>
        <button className=" text-white bg-red-700 py-[10px] px-5 rounded-3xl font-semibold text-sm">Añadir al carrito</button>
      </div>
    </div>
  )
}

export default function BeatDetailSideBar ({beat}) {
    useEffect(()=>{console.log(beat);}, [])
    return (
        <>
        <div className="mx-9 w-[286px] pt-14 -mt-5 pb-8 bg-white gap-estilo3 flex flex-row">
        <div>
          <Image
          height={80}
          width={80}
            className="border-radius-estilo2 aspect-square object-cover"
            src={beat.image}
            alt={beat.name}
          />
        </div>
        <div>
          <h1 className="text-base font-bold">{`${beat.name}`}</h1>
          <div className="flex flex-row items-center gap-1">
            <span className="text-sm font-light">{`${beat.author?.name}`}</span>
            <Image
              className="inline"
              width={14}
              height={14}
              src={"/icon/checked-blue.svg"}
              alt="checked"
            />
          </div>
          <div className="pt-2">
          <span className="color-primary-red-700 text-sm font-semibold">{`$${beat.price}`}</span>
          <span className="font-light text-sm">{` | ${beat.BPM}BPM`}</span>
          </div>
        </div>
      </div>
          <span className=" block text-sm mx-9 color-primary-red-700 font-medium mb-4">Precios y licencias</span>
          <BeatDetailBox msg1='Free License, MP3' msg2='$0.00' beat={beat}/>
          <BeatDetailBox msg1='Standart License, WAV' msg2='$9.99' beat={beat}/>
          <BeatDetailBox msg1='Premium License, WAV' msg2='$29.99' beat={beat}/>
        </>
    )
}