import { MiniModalBox } from '@/components'
import { useTranslation } from 'react-i18next'

interface ButtonProps {
  text: string
  action: () => void
}

function Button({ text, action }: ButtonProps) {
  return (
    <button
      className=' whitespace-nowrap text-sm font-medium text-black'
      onClick={(e) => {
        e.stopPropagation(), action()
      }}
    >
      {text}
    </button>
  )
}

interface ModalsProps {
  visibilityOwnedModal: boolean
  handleEdit: () => void
  handleDelete: () => void
}

export default function Modals({ visibilityOwnedModal, handleEdit, handleDelete }: ModalsProps) {
  const [t] = useTranslation('global')
  const fromClientBtns = [
    {
      text: 'beatCar.edit',
      action: handleEdit
    },
    {
      text: 'beatCar.delete',
      action: handleDelete
    }
  ]

  return (
    <>
      {visibilityOwnedModal && (
        <MiniModalBox className='right-1 top-1'>
          {fromClientBtns.map((btn, index) => (
            <Button key={index} text={t(btn.text)} action={btn.action} />
          ))}
        </MiniModalBox>
      )}
    </>
  )
}
