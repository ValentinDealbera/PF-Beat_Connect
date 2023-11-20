'use client'
import AdminMaster from '../Master'
import SellerDashboardHeader from './SellerHeader'
import SellerDashboardSidebar from './SellerSidebar'
import SellerDashboardTopBar from './SellerTopBar'

interface Props {
  children: React.ReactNode
  topBarMode: 'action' | 'message'
  topBarMessage: string
  topBarButtonLabel: string
  onClick: () => void
}

const SellerDashboardLayout = ({ children, topBarMode, topBarMessage, topBarButtonLabel, onClick }: Props) => (
  <AdminMaster>
    <section className='background-neutral-slate-100 flex min-h-screen flex-col items-stretch pb-10 dark:bg-customDark-700 xl:flex-row xl:pb-0'>
      <div id='col1' className=' hidden w-[20%] xl:flex'>
        <SellerDashboardSidebar />
      </div>
      <div id='col1' className=' flex w-full xl:hidden'>
        <SellerDashboardHeader />
      </div>
      <div className='flex w-full flex-col pt-[105px] xl:pt-0'>
        <SellerDashboardTopBar
          mode={topBarMode}
          message={topBarMessage}
          buttonLabel={topBarButtonLabel}
          onClick={onClick}
        />
        <div className='padding-x-dashboard-estilo1 pb-10 w-full'>{children}</div>
      </div>
    </section>
  </AdminMaster>
)

export default SellerDashboardLayout
