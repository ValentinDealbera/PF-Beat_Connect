'use client'
import { type ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchBeats } from '@/redux/slices/beats'

interface Props {
  children: ReactNode
}

const Querier = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state) => state?.beats?.pages?.current)
  useEffect(() => {
    dispatch(fetchBeats({}))
  }, [])

  useEffect(() => {
    dispatch(fetchBeats({ page: currentPage }))
  }, [currentPage])

  return <>{children}</>
}

export default Querier
