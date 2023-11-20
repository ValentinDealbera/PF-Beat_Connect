import { type ReviewsClass } from '@/types'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface TextBoxProps {
  review: ReviewsClass
  currentMode: string
}

export default function TextBox({ review, currentMode }: TextBoxProps) {
  const [t] = useTranslation('global')
  const { title, comment } = review
  const username = `${review.createdBy.firstName} ${review.createdBy.lastName}`

  return (
    <div
      className={`border-radius-estilo1  flex flex-col  gap-4 p-5 text-start ${
        currentMode === 'light' ? ' ' : 'border-indigo-500/100; border'
      }`}
    >
      <div className='border-radius-estilo1 flex flex-row items-center gap-2 '>
        <Image
          alt='client'
          className='aspect-square rounded-full object-cover'
          src={review.createdBy.image}
          width={40}
          height={40}
        />
        <h1 className='text-base-medium flex text-sm'>{username}</h1>
      </div>
      <div className='flex flex-col '>
        <p className=' text-subtitulo-medium text-sm'>{title}</p>
        <p className='text-base-light text-sm'>{comment}</p>
      </div>
      <p className='text-base-semibold text-sm'>
        {review.beat.name}
        {' | '}
        {review.rating} {t('clientReview')}
      </p>
    </div>
  )
}
