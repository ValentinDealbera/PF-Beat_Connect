'use client'
import { MiniModalBox } from '@/components'
import Button from './XButton'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/redux/hooks'
import { deleteClientBeat, setActiveEditingBeat } from '@/redux/slices/client/beats'
import { type BeatsClass } from '@/interfaces'

interface Props {
  fromClient: boolean
  visibilityOwnedModal: boolean
  beat: BeatsClass
  setVisibilityEditBeat: (visibility: boolean) => void
  isLogged?: boolean
}

const ModalBeatManage = ({ fromClient, visibilityOwnedModal, beat, setVisibilityEditBeat, isLogged }: Props) => {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()

  const handleEdit = async () => {
    dispatch(setActiveEditingBeat(beat))
    setVisibilityEditBeat(true)
  }

  const handleDelete = () => {
    dispatch(deleteClientBeat(beat._id))
  }

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
      {fromClient && visibilityOwnedModal && isLogged && (
        <div>
          <MiniModalBox className='right-1 top-1  '>
            <div className='flex flex-col gap-1'>
              {fromClientBtns.map((btn: any, index: number) => (
                <Button key={index} text={t(btn.text)} action={btn.action} />
              ))}
            </div>
          </MiniModalBox>
        </div>
      )}
    </>
  )
}

export default ModalBeatManage
