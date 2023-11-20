import { type BeatsClass } from '@/types'

interface BeatBPMProps {
  beat: BeatsClass
}

export default function BeatBPM({ beat }: BeatBPMProps) {
  return <span className='font-light'>{` | ${beat?.BPM}BPM`}</span>
}
