'use client'
import { MiniModalBox } from '@/components'
import Button from './XButton'
import { deleteFavoriteBeat, postFavoriteBeat } from '@/redux/slices/client/beats'
import { useAppDispatch } from '@/redux/hooks'
import { type BeatsClass } from '@/interfaces'

interface Props {
  fromClient: boolean
  visibilityReviewEditBag: boolean
  isFavorite: boolean
  setLogged: (logged: boolean) => void
  isLogged: boolean
  beat: BeatsClass
}

const FavoriteModal = ({ fromClient, visibilityReviewEditBag, isFavorite, setLogged, isLogged, beat }: Props) => {
  const dispatch = useAppDispatch()

  const handleAddFavorite = () => {
    if (!isLogged) {
      setLogged(true)
      return
    }
    dispatch(postFavoriteBeat(beat))
  }

  const handleDeleteFavorite = () => {
    dispatch(deleteFavoriteBeat(beat))
  }

  return (
    <>
      {!fromClient && visibilityReviewEditBag && (
        <MiniModalBox className='left-1 top-1'>
          {((!isFavorite && !fromClient) || !isLogged) && (
            <Button icon='/icon/corazon.svg' alt='heart' text='' action={handleAddFavorite} />
          )}
          {isFavorite && !fromClient && isLogged && (
            <Button icon='/icon/corazon-lleno.svg' alt='heart' text='' action={handleDeleteFavorite} />
          )}
        </MiniModalBox>
      )}
    </>
  )
}

export default FavoriteModal
