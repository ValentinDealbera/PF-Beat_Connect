import { deleteClientReview, setActiveEditingReview } from '@/redux/slices/client/reviews'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modals from './modals'
import { useAppDispatch } from '@/redux/hooks'
import TextBox from './textBox'
import { type ReviewsClass } from '@/types'

interface Props {
  review: ReviewsClass
  manageEditReview: () => void
  currentMode: string
}

export default function ClientReview({ review, manageEditReview, currentMode }: Props) {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const [visibilityOwnedModal, setVisibilityOwnedModal] = useState(false)

  const handleEdit = async () => {
    await dispatch(setActiveEditingReview(review))
    manageEditReview()
  }

  const handleDelete = () => {
    dispatch(deleteClientReview(review._id))
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => {
        currentMode !== 'showcase' && setVisibilityOwnedModal(true)
      }}
      onMouseLeave={() => {
        currentMode !== 'showcase' && setVisibilityOwnedModal(false)
      }}
    >
      <TextBox review={review} currentMode={currentMode} />
      <Modals handleDelete={handleDelete} handleEdit={handleEdit} visibilityOwnedModal={visibilityOwnedModal} />
    </div>
  )
}
