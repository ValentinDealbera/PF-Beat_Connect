import { useState } from 'react'
import { useAppSelector } from '@/redux/hooks'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { BeatRightSheet, ClientReview, EditReviewForm } from '@/components'

export default function ReviewsGrid() {
  const [t] = useTranslation('global')
  const [isDropDown, setIsDropdownOpen] = useState(false)
  const reviews = useAppSelector((state) => state.client.reviews.reviews)

  const manageEditReview = () => {
    setIsDropdownOpen(!isDropDown)
  }

  const renderEmptyState = (
    <div className='flex w-full flex-col justify-center gap-4'>
      <h1 className='mt-5 text-center text-2xl font-medium'>{t('reviewCardGrid.t1')}</h1>
      <div className='flex w-full justify-center'>
        <Link href='/beats'>
          <button className='text-base-semibold mt-2 w-full rounded-full bg-red-700 px-4 py-2 text-white'>
            {t('reviewCardGrid.t2')}
          </button>
        </Link>
      </div>
    </div>
  )

  const renderReviews = reviews.map((review: any) => (
    <ClientReview currentMode='' review={review} manageEditReview={manageEditReview} />
  ))

  const renderEditReviewForm = (
    <div className='hidden sm:flex'>
      <BeatRightSheet width='min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px]' setIsDropdownOpen={setIsDropdownOpen}>
        <EditReviewForm manageEditReview={manageEditReview} />
      </BeatRightSheet>
    </div>
  )

  return (
    <>
      {reviews.length === 0 && renderEmptyState}
      {reviews.length > 0 && (
        <div className='gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'>
          {renderReviews}
        </div>
      )}
      {isDropDown && renderEditReviewForm}
    </>
  )
}
