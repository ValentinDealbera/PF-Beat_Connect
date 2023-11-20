import { SellerDashboardTopBar, SellerDashboardHeader } from '@/components'

export default function ClientDashboardEdit({ children, topBarMode, topBarMessage, topBarButtonLabel, onClick }) {
  return (
    <>
      <section className='background-neutral-slate-100 flex min-h-screen flex-col items-stretch pb-10 xl:flex-row xl:pb-0 '>
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
          <div className='padding-x-dashboard-estilo1  w-full'>{children}</div>
        </div>
      </section>
    </>
  )
}
