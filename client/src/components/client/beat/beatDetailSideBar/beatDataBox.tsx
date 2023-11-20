import { BeatImage, AuthorName, BeatPrice, BeatBPM, BeatTitle } from '@/components'

export default function BeatDataBox({ beat }: any) {
  return (
    <div className='gap-estilo3 flex w-[286px] flex-row bg-white'>
      <BeatImage beat={beat} height={80} width={80} />
      <div className='flex flex-col justify-center'>
        <BeatTitle beat={beat} />
        <AuthorName beat={beat} />
        <div className='pt-0'>
          <BeatPrice beat={beat} />
          <BeatBPM beat={beat} />
        </div>
      </div>
    </div>
  )
}
