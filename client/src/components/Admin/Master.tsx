'use client'
import { useAppDispatch } from '@/redux/hooks'
import { adminGetData } from '@/redux/slices/admin/adminSession'
import { useEffect, useMemo } from 'react'
import { debounce } from 'lodash'

interface Props {
  children: React.ReactNode
}

const AdminMaster = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  const delayedAdminGetBeats = useMemo(() => debounce(async () => await dispatch(adminGetData()), 500), [dispatch])

  useEffect(() => {
    const cancelDebounce = () => {
      delayedAdminGetBeats.cancel()
    }

    delayedAdminGetBeats()

    return cancelDebounce
  }, [])

  return <>{children}</>
}

export default AdminMaster
