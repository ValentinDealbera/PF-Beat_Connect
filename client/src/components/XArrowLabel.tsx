import Image from 'next/image'

interface ArrowLabelProps {
  label?: string
  handleDropdownClick?: () => void
  iconStatus?: boolean
  labelClass?: string
}

const ArrowLabel = ({ label, handleDropdownClick, iconStatus, labelClass }: ArrowLabelProps) => (
  <div className='flex items-center gap-2 cursor-pointer' onClick={handleDropdownClick}>
    <button className={labelClass} type='button'>
      {label ?? 'Seleccionar'}
    </button>
    {iconStatus === true && <Image src='/icon/arrow-down.svg' width={12} height={12} alt='arrow-down' />}
  </div>
)

export default ArrowLabel
