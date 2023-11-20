'use client'
import { BeatsGrid, BeatFilters, PaginateBeats, Section } from '@/components'
import { useAppSelector } from '@/redux/hooks'

export default function ShopSection() {
  const beats = useAppSelector((state) => state?.beats?.publicItems) || []
  return (
    <>
      <Section subClassName='padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col'>
        <BeatFilters />
        <BeatsGrid beats={beats} />
        <PaginateBeats />
      </Section>
    </>
  )
}
