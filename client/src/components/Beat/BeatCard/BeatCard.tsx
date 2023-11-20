'use client'
import { useEffect, useRef, useState } from 'react'
import Modals from './Modals/ModalManager'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setActiveItemDetail } from '@/redux/slices/beats'
import { useTranslation } from 'react-i18next'
import Bpm from './Bpm'
import BeatImage from './Image'
import Price from './Price'
import Title from './Title'
import AuthorName from './Author'

interface Props {
  beat: any
  variant: 'public' | 'private'
  mode?: 'grid' | 'flex'
  setVisibilityCreateReview: (visibility: boolean) => void
  setVisibilityEditReview: (visibility: boolean) => void
  setVisibilityViewBeat: (visibility: boolean) => void
  setVisibilityEditBeat: (visibility: boolean) => void
}

const BeatCard = ({
  beat,
  variant,
  mode,
  setVisibilityCreateReview,
  setVisibilityEditReview,
  setVisibilityViewBeat,
  setVisibilityEditBeat
}: Props) => {
  const dispatch = useAppDispatch()
  const [t] = useTranslation('global')
  const [visibilityReviewEditBag, setVisibilityReviewEditBag] = useState(false)
  const [visibilityOwnedBag, setVisibilityOwnedBag] = useState(false)
  const [tapVisible, setTapVisible] = useState(false)
  const { bougthBeats } = useAppSelector((state) => state.client.beats)
  const ref = useRef<any>(null)
  const boughtBeat = Boolean(bougthBeats.find((boughtBeat) => boughtBeat._id === beat._id))

  const handleClick = async () => {
    if (window.innerWidth > 1023) {
      dispatch(setActiveItemDetail(beat))
      setVisibilityViewBeat(true)
    }
  }

  const handleDoubleClick = async () => {
    if (window.innerWidth <= 1023) {
      dispatch(setActiveItemDetail(beat))
      setVisibilityViewBeat(true)
    }
  }

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisibilityReviewEditBag(false)
      setVisibilityOwnedBag(false)
      setTapVisible(false)
    } else {
      setVisibilityReviewEditBag(true)
      setVisibilityOwnedBag(true)
      setTapVisible(true)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return (
    <div
      ref={ref}
      className='relative w-full '
      onClick={(e: any) => {
        e.stopPropagation()
        handleClick()
      }}
      onDoubleClick={(e: any) => {
        e.stopPropagation()
        handleDoubleClick()
      }}
      onMouseEnter={() => {
        setVisibilityReviewEditBag(true)
        setVisibilityOwnedBag(true)
      }}
      onMouseLeave={() => {
        setVisibilityReviewEditBag(false)
        setVisibilityOwnedBag(false)
      }}
    >
      <div className={mode === 'grid' ? 'w-full' : ''}>
        <div
          className={`gap-estilo3 flex flex-col ${variant === 'public' ? '' : 'border-radius-estilo1 px-2 pb-5 pt-2 '}`}
        >
          <BeatImage beat={beat} height='auto' width='auto' tapVisible={tapVisible} />
          <div className={`${variant === 'public' ? '' : 'px-2'}`}>
            {boughtBeat ? (
              <>
                <span className='color-primary-red-700 font-semibold'>{t('beatCar.purchased')}</span>
                <Bpm beat={beat} />
              </>
            ) : (
              <>
                <Price beat={beat} />
                <Bpm beat={beat} />
              </>
            )}
            <Title beat={beat} />
            <AuthorName beat={beat} />
          </div>
        </div>
      </div>
      <Modals
        beat={beat}
        visibilityOwnedBag={visibilityOwnedBag}
        visibilityReviewEditBag={visibilityReviewEditBag}
        setVisibilityCreateReview={setVisibilityCreateReview}
        setVisibilityEditReview={setVisibilityEditReview}
        setVisibilityEditBeat={setVisibilityEditBeat}
      />
    </div>
  )
}

export default BeatCard
