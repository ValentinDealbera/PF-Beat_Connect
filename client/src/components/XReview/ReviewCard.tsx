'use client'
import { deleteClientReview, setActiveEditingReview } from '@/redux/slices/client/reviews'
import { useState } from 'react'
import Modals from './ModalManager'
import { useAppDispatch } from '@/redux/hooks'
import TextBox from './Text'
import { type ReviewsClass } from '@/interfaces'

interface Props {
  review: ReviewsClass
  manageEditReview: () => void
  currentMode: string
}

const ReviewCard = ({ review, manageEditReview, currentMode }: Props) => {
  const dispatch = useAppDispatch()
  const [visibilityOwnedModal, setVisibilityOwnedModal] = useState(false)

  const handleEdit = async () => {
    dispatch(setActiveEditingReview(review))
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

export default ReviewCard
