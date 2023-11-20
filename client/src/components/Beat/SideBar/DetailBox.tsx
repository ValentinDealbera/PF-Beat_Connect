'use client'
import { useTranslation } from 'react-i18next'

interface Props {
  msg1: string
  msg2: string
  beat: any
  handleModalReview: () => void
  type: string
  hasReview: boolean
}

const BeatDetailBox = ({ msg1, msg2, beat, handleModalReview, type, hasReview }: Props) => {
  const [t] = useTranslation('global')
  return (
    <div className='h-auto'>
      <p className='pb-1 text-base font-medium text-black'>{msg1}</p>
      <p className=' mb-1 text-sm font-semibold text-red-700'>{msg2}</p>
      {hasReview && type !== 'free' ? (
        <button className=' text-sm font-semibold text-red-700' onClick={handleModalReview}>
          {t('beatDetailSideBar.t4')}
        </button>
      ) : type === 'free' ? (
        <a className=' text-sm font-semibold text-red-700' download={beat?.name} href={beat?.audioMP3}>
          {t('beatDetailSideBar.t2')}
        </a>
      ) : (
        <></>
      )}
    </div>
  )
}

export default BeatDetailBox
