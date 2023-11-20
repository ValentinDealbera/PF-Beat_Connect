import ModalLogin from './modalLogin'
import ModalReviewEdit from './modalReviewEdit'
import FavoriteModal from './favoriteModal'
import ModalBeatManage from './modalBeatManage'
import { useAppSelector } from '@/redux/hooks'
import { useState } from 'react'
import { type BeatsClass, type ReviewsClass } from '@/types'

interface ModalsProps {
  beat: BeatsClass
  visibilityOwnedBag: boolean
  visibilityReviewEditBag: boolean
  setVisibilityCreateReview: (visibility: boolean) => void
  setVisibilityEditReview: (visibility: boolean) => void
  setVisibilityEditBeat: (visibility: boolean) => void
}

export default function Modals({
  beat,
  visibilityOwnedBag,
  visibilityReviewEditBag,
  setVisibilityCreateReview,
  setVisibilityEditReview,
  setVisibilityEditBeat
}: ModalsProps) {
  const { isLogged } = useAppSelector((state) => state.client.authSession.auth)
  const { _id: userId } = useAppSelector((state) => state.client.authSession.session.current)
  const [logged, setLogged] = useState(false)

  const fromClient = userId === beat.userCreator._id

  const userReviews = useAppSelector((state) => state.client.reviews.reviews)
  const { favoriteBeats, bougthBeats } = useAppSelector((state) => state.client.beats)

  const reviewed = Boolean(
    userReviews.find((review: ReviewsClass) => review.beat._id === beat._id && review.softDelete)
  )

  const boughtBeat = Boolean(bougthBeats.find((boughtBeat) => boughtBeat._id === beat._id))

  const isFavorite = Boolean(favoriteBeats.find((favoriteBeat) => favoriteBeat._id === beat._id))

  return (
    <>
      <ModalBeatManage
        fromClient={fromClient}
        visibilityOwnedModal={visibilityOwnedBag}
        beat={beat}
        isLogged={isLogged}
        setVisibilityEditBeat={setVisibilityEditBeat}
      />
      <ModalLogin logged={logged} setLogged={setLogged} />
      <ModalReviewEdit
        fromClient={fromClient}
        visibilityReviewEditBag={visibilityReviewEditBag}
        boughtBeat={boughtBeat}
        reviewed={reviewed}
        beat={beat}
        isLogged={isLogged}
        setVisibilityCreateReview={setVisibilityCreateReview}
        setVisibilityEditReview={setVisibilityEditReview}
      />
      <FavoriteModal
        fromClient={fromClient}
        visibilityReviewEditBag={visibilityReviewEditBag}
        isFavorite={isFavorite}
        setLogged={setLogged}
        isLogged={isLogged}
        beat={beat}
      />
    </>
  )
}
