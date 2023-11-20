'use client'
import { SellerDashboardLayout, IslandDashboard, AdminCreateUserForm } from '@/components'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function AdminUserCreate() {
  const [t] = useTranslation('global')
  const childRef = useRef<any>()

  const handleExternalSubmit = () => {
    childRef.current.submit()
  }

  return (
    <SellerDashboardLayout
      topBarMode='action'
      topBarMessage={t('dashboardNav.createUser')}
      topBarButtonLabel={t('adminBeatsCreate.t1')}
      onClick={handleExternalSubmit}
    >
      <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
        <AdminCreateUserForm mode='create' ref={childRef} />
      </IslandDashboard>
    </SellerDashboardLayout>
  )
}
