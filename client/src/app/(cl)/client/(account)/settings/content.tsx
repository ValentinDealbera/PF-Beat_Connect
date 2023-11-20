'use client'
import { EditClientForm, EditPasswordForm } from '@/components'
import { useAppSelector } from '@/redux/hooks'

export default function BuyerProfile() {
  const activeIndex = useAppSelector((state) => state.profile.settingsActiveIndex)

  return <>{activeIndex == 0 ? <EditClientForm mode='edit' /> : <EditPasswordForm />}</>
}
