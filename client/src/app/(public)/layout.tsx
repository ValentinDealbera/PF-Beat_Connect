import { Footer, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

const PublicLayout = (props: Props) => (
  <>
    <Header />
    <main>{props.children}</main>
    <Footer mode='dark' />
  </>
)

export default PublicLayout
