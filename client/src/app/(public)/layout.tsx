import { AdminHeaderBar, Footer, Header } from '@/components'

interface Props {
  children: React.ReactNode
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer mode='dark' />
    </>
  )
}
