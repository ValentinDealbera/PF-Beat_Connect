import { BeatCard } from '@/components'
import { useState } from 'react'
import Modals from './modals'

interface BeatsGridProps {
  beats: any
}

export default function NewBeatCardGrid({ beats }: BeatsGridProps) {
  const [visibilityCreateReview, setVisibilityCreateReview] = useState(false)
  const [visibilityEditReview, setVisibilityEditReview] = useState(false)
  const [visibilityViewBeat, setVisibilityViewBeat] = useState(false)
  const [visibilityEditBeat, setVisibilityEditBeat] = useState(false)

  const gridStyles =
    'gap-estilo1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5'

  return (
    <>
      <div className={gridStyles}>
        {Array.isArray(beats) &&
          beats?.map((beat: any) => (
            <BeatCard
              key={beat._id}
              beat={beat}
              variant='public'
              setVisibilityEditBeat={setVisibilityEditBeat}
              setVisibilityCreateReview={setVisibilityCreateReview}
              setVisibilityEditReview={setVisibilityEditReview}
              setVisibilityViewBeat={setVisibilityViewBeat}
            />
          ))}
      </div>
      <Modals
        visibilityCreateReview={visibilityCreateReview}
        setVisibilityCreateReview={setVisibilityCreateReview}
        visibilityEditReview={visibilityEditReview}
        setVisibilityEditReview={setVisibilityEditReview}
        visibilityViewBeat={visibilityViewBeat}
        setVisibilityViewBeat={setVisibilityViewBeat}
        visibilityEditBeat={visibilityEditBeat}
        setVisibilityEditBeat={setVisibilityEditBeat}
      />
    </>
  )
}
