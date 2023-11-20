'use client'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/cart'
import { useTranslation } from 'react-i18next'
import { type BeatsClass } from '@/interfaces'

interface Props {
  beat: BeatsClass
  posAction: () => void
}

const AddToCart = ({ beat, posAction }: Props) => {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const authorId = beat?.userCreator?._id ? beat?.userCreator?._id : beat?.userCreator

  const handleAddToCart = async () => {
    await dispatch(addToCart({ authorId, beat }))
    posAction()
  }

  return (
    <button className=' text-sm font-semibold text-red-700' onClick={handleAddToCart}>
      {t('beatDetailSideBar.t3')}
    </button>
  )
}

export default AddToCart
