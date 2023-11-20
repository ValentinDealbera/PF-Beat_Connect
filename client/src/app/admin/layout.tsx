import { Footer } from '@/components'

interface Props {
  children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => (
  <>
    <main>{children}</main>
    <Footer mode='dark' />
  </>
)

export default AdminLayout
