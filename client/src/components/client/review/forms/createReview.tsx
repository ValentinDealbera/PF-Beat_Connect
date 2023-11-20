import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { postClientReview } from '@/redux/slices/client/reviews'
import Form from './form'

interface Props {
  manageCreateReview: (value: boolean) => void
}

export default function ReviewForm({ manageCreateReview }: Props) {
  const dispatch = useAppDispatch()
  const [ratingValue, setRatingValue] = useState(0)

  const currentBeat = useAppSelector((state) => state?.client?.reviews?.activeBeatCreateReview)

  const currentUserId = useAppSelector((state) => state?.client?.authSession?.session?.current?._id)

  const [formFields, setFormFields] = useState({
    title: '',
    comment: '',
    rating: ratingValue ?? 0,
    createdBy: currentUserId ?? '',
    beat: currentBeat._id ?? ''
  })

  const handleInputChange = (event: any) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await dispatch(postClientReview(formFields))
    manageCreateReview(false)
  }

  useEffect(() => {
    setFormFields({
      ...formFields,
      createdBy: currentUserId,
      beat: currentBeat._id,
      rating: ratingValue
    })
  }, [ratingValue, currentUserId, currentBeat])

  return (
    <Form
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      ratingValue={ratingValue}
      setRatingValue={setRatingValue}
      title='beatCar.createReview'
      hasDefaultValues={false}
    />
  )
}
