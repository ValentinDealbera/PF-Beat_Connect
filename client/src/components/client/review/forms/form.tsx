import { FormColumn, FormContainer, FormRow, Input, TextArea } from '@/components'
import { type ReviewsClass } from '@/types'
import { useTranslation } from 'react-i18next'

interface FormProps {
  handleInputChange: (e: any) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  currentReview?: ReviewsClass
  setRatingValue: (value: number) => void
  ratingValue: number
  title: string
  hasDefaultValues: boolean
}

export default function Form({
  handleInputChange,
  handleSubmit,
  currentReview,
  setRatingValue,
  ratingValue,
  title,
  hasDefaultValues
}: FormProps) {
  const [t] = useTranslation('global')
  const rating = [1, 2, 3, 4, 5]

  return (
    <div className='flex h-full flex-col items-center justify-center gap-7 px-4 xs:px-8 sm:px-14 sm:py-10 overflow-y-hidden  '>
      <div className='flex w-full flex-col gap-3 overflow-y-hidden'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h4 className='text-titulo3-regular text-center'>{t(title)}</h4>
        </div>
        <div className=' flex place-content-center gap-2'>
          {rating.map((item) => (
            <>
              <button
                onClick={() => {
                  setRatingValue(item)
                }}
                className='flex h-[30px] w-[30px]'
              >
                <img
                  className='h-full w-full '
                  src={
                    item <= ratingValue
                      ? 'https://www.svgrepo.com/show/13695/star.svg'
                      : 'https://www.svgrepo.com/show/182485/star.svg'
                  }
                />
              </button>
            </>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormRow>
              <FormColumn className='w-full'>
                <Input
                  name='title'
                  label={t('editReview.t3')}
                  placeholder={t('editReview.t3')}
                  type='text'
                  onChange={handleInputChange}
                  className='w-full'
                  defaultValue={hasDefaultValues ? currentReview?.title : ''}
                />
                <TextArea
                  name='comment'
                  label={t('editReview.t4')}
                  placeholder={t('editReview.t4')}
                  onChange={handleInputChange}
                  className=' w-full h-24'
                  defaultValue={hasDefaultValues ? currentReview?.comment : ''}
                />
              </FormColumn>
            </FormRow>
            <button type='submit' className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'>
              {t('editReview.t5')}
            </button>
          </FormContainer>
        </form>
      </div>
    </div>
  )
}
