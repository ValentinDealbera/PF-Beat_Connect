import { type BeatsClass } from '@/interfaces'

interface Props {
  beat: BeatsClass
}

const Price = ({ beat }: Props) => (
  <span className='color-primary-red-700 font-semibold'>{`$${beat?.priceAmount}`}</span>
)

export default Price
