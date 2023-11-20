import { type BeatsClass } from '@/interfaces'

interface Props {
  beat: BeatsClass
}

const Audio = ({ beat }: Props) => {
  try {
    return (
      <audio controls className='mt-2 w-full rounded-full  bg-white'>
        <source src={beat?.audioMP3} type='audio/mpeg' />
      </audio>
    )
  } catch (error) {
    console.log(error)
  }
}

export default Audio
