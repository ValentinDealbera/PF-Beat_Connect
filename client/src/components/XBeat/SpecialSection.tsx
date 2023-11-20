'use client'
import { Section, BeatsGrid } from '@/components'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchFeaturedBeats } from '@/redux/slices/beats'

interface Props {
  title: string
}

const SpecialSection = ({ title }: Props) => {
  const featuredBeats = useAppSelector((state) => state?.beats?.featuredItems) || []
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFeaturedBeats())
  }, [])

  return (
    <Section subClassName='padding-x-estilo2 padding-y-estilo2 gap-8 flex flex-col'>
      <h1 className='text-titulo2-medium'>{title}</h1>
      <BeatsGrid beats={featuredBeats} />
    </Section>
  )
}

export default SpecialSection
