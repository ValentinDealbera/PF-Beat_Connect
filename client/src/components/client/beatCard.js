import Image from "next/image"
import Foto from '../../../public/images/matthew-moloney-tKB1GDJUq9c-unsplash.jpg'

export default function BeatCard ({beat, height, width}) {
    return (
        <>
        <div className='flex flex-col background-neutral-white gap-estilo3'>
            <div>
            <Image className="aspect-square border-radius-estilo2" src={Foto} alt={"No No No"} />
            </div>
            <div>
            <span className="font-semibold color-primary-red-700">{`$${'29.99'}`}</span><span className="font-light">{` | ${'100'}BPM`}</span>
            <h1 className="font-bold">{`${'No No No - $50 UNLIM'}`}</h1>
            <div className="flex flex-row items-center gap-1">
            <span className="font-light">{`${'Example Author'}`}</span><Image className="inline" width={14} height={14} src={'/icon/checked-blue.svg'}/>
            </div>
            </div>
        </div>
        </>
    )
}