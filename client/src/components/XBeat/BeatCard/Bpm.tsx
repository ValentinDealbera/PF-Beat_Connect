import { type BeatsClass } from '@/interfaces'

interface Props {
  beat: BeatsClass
}

const BPM = ({ beat }: Props) => <span className='font-light'>{` | ${beat?.BPM}BPM`}</span>

export default BPM
