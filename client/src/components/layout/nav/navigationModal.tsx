interface ModalProps {
  children: React.ReactNode
}

export default function NavigationModal({ children }: ModalProps) {
  return (
    <div className='absolute left-[50%] translate-x-[-50%] w-auto ' id='modalBoxForNav'>
      <div className='relative flex flex-col gap-1 mt-3 rounded-lg bg-white py-6 px-6 shadow-2xl'>{children}</div>
    </div>
  )
}
