'use client'
import { IslandDashboard, FaqsGrid, SellerDashboardLayout } from '@/components'
import { useTranslation } from 'react-i18next'

export default function Content() {
  const [t] = useTranslation('global')
  return (
    <SellerDashboardLayout topBarMode='message' topBarMessage={t('admin.t1')} topBarButtonLabel='' onClick={() => {}}>
      <IslandDashboard className='flex flex-col gap-5 xl:gap-8 '>
        <h1 className='text-subtitulo-semibold dark:text-white '>{t('admin.t2')}</h1>
        <FaqsGrid mode='admin' />
      </IslandDashboard>
    </SellerDashboardLayout>
  )
}
