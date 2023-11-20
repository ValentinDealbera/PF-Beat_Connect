import { BeatBottomSheet } from '@/components'
import Image from 'next/image'

interface Props {
  title: string
  isDropdownOpen: boolean
  setIsDropdownOpen: (value: boolean) => void
  handleBack: () => void
  reset: () => void
}

const BeatBottomSheetFilteringWithHeader = ({
  title,
  isDropdownOpen,
  setIsDropdownOpen,
  handleBack,
  reset,
  children
}: React.PropsWithChildren<Props>) => {
  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <BeatBottomSheet setIsDropdownOpen={setIsDropdownOpen}>
      <div className='gap-estilo5 padding-x-estilo2 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <button onClick={handleBack}>
            <Image height={6} width={10} src='/icon/arrow-left.svg' alt='' />
          </button>
          <button onClick={handleClick} className='absolute left-1/2 -translate-x-1/2 transform text-lg font-bold'>
            {title}
          </button>
          <button onClick={reset} />
        </div>
        {children}
      </div>
    </BeatBottomSheet>
  )
}

export default BeatBottomSheetFilteringWithHeader
