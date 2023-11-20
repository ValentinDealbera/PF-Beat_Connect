import { type BeatsClass } from '@/interfaces'

interface Props {
  beat: BeatsClass
}

const Title = ({ beat }: Props) => <h1 className='font-bold'>{`${beat?.name}`}</h1>

export default Title
