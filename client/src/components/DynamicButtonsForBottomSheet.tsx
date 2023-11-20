import Image from 'next/image'

interface DynamicButtonsForBottomSheetProps {
  dynamicFilterBtns: Array<{
    label: string
    handleClick: () => void
  }>
}

const DynamicButtonsForBottomSheet = ({ dynamicFilterBtns }: DynamicButtonsForBottomSheetProps) => (
  <div className='flex flex-col gap-4'>
    {dynamicFilterBtns.map((e) => (
      <div className='flex w-full flex-col ' key={e.label}>
        <hr className='w-full border-slate-200 pb-4' style={{ height: 1 }} />
        <button onClick={e.handleClick} className='flex w-full flex-row justify-between gap-2'>
          {e.label}
          <Image height={15} width={15} src='/icon/arrow-down.svg' alt='arrow-down' />
        </button>
      </div>
    ))}
  </div>
)

export default DynamicButtonsForBottomSheet
