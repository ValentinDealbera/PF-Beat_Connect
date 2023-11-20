import { Footer, Header } from '@/components'
import Template from './HelpTemplate'

interface Props {
  children: React.ReactNode
}

const HelpLayout = ({ children }: Props) => (
  <>
    <Header />
    <main>
      <Template title='helpIndexTitle' aceptedPath='/help' paragraph='helpIndexParagraph'>
        {children}
      </Template>
      <Template title='helpPrivacyTitle' aceptedPath='/help/privacy' paragraph='helpPrivacyParagraph'>
        {children}
      </Template>
      <Template title='helpTermsTitle' aceptedPath='/help/terms' paragraph='helpTermsParagraph'>
        {children}
      </Template>
    </main>
    <Footer mode='dark' />
  </>
)

export default HelpLayout
