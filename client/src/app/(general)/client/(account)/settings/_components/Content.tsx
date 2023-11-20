'use client'
import { EditClientForm, EditPasswordForm } from '@/components'
import { useAppSelector } from '@/redux/hooks'

const Content = () => {
  const activeIndex = useAppSelector((state) => state.profile.settingsActiveIndex)

  return <>{activeIndex === 0 ? <EditClientForm mode='edit' /> : <EditPasswordForm />}</>
}

export default Content
