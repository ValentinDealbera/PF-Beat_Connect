import AuthorName from '../BeatCard/Author'
import Bpm from '../BeatCard/Bpm'
import BeatImage from '../BeatCard/Image'
import Price from '../BeatCard/Price'
import Title from '../BeatCard/Title'

const BeatDataBox = ({ beat }: any) => (
  <div className='gap-estilo3 flex w-[286px] flex-row bg-white'>
    <BeatImage beat={beat} height={80} width={80} />
    <div className='flex flex-col justify-center'>
      <Title beat={beat} />
      <AuthorName beat={beat} />
      <div className='pt-0'>
        <Price beat={beat} />
        <Bpm beat={beat} />
      </div>
    </div>
  </div>
)

export default BeatDataBox
