import { Logo } from '@/components'
import SellerDashboardNav from './SellerNav'

const SellerDashboardSidebar = () => (
  <section>
    <div className='sticky max-h-screen top-0 padding-x-dashboard-estilo1 background-neutral-white flex h-full flex-col items-start justify-start py-10 align-middle dark:bg-customDark-900'>
      <div className='mb-10'>
        <Logo />
      </div>
      <SellerDashboardNav />
    </div>
  </section>
)

export default SellerDashboardSidebar
