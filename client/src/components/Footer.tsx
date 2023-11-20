import { LanguageChanger, Logo, Nav } from '@/components'
import { helpItems, generalItems, accountItems } from '@/utils/navItems.const'
import { useTranslation } from 'react-i18next'

interface Props {
  mode: 'light' | 'dark'
}

const Footer = (props: Props) => {
  const [t] = useTranslation('global')
  const footerStyles = props.mode === 'light' ? 'background-neutral-white xl:hidden' : 'bg-gray-950'

  return (
    <>
      <footer className={`${footerStyles} flex flex-row items-center  justify-center align-middle`}>
        <div className='padding-x-estilo2 padding-y-estilo1 flex flex-col items-start justify-between gap-8 align-middle md:flex-row'>
          <Logo />
          <div className='flex flex-col items-start gap-8 md:flex-row lg:gap-12'>
            <FooterNav items={generalItems} title={t('footerNav.general')} mode={props.mode} />
            <FooterNav items={helpItems} title={t('footerNav.help')} mode={props.mode} />
            <FooterNav items={accountItems} title={t('footerNav.account')} mode={props.mode} />
            <div className='gap-estilo4 flex flex-col'>
              <h3 className='text-subtitulo-semibold color-neutral-white'>{t('footerNav.idioma')}</h3>
              <LanguageChanger />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

interface ItemProps {
  name: string
  url: string
  visible: boolean
}

interface PropsNav {
  items: ItemProps[]
  title: string
  mode: 'light' | 'dark'
}

const FooterNav = ({ items, title, mode }: PropsNav) => {
  const titleStyles = mode === 'light' ? 'color-neutral-black-950' : 'color-neutral-white'
  return (
    <>
      <div className='gap-estilo4 flex flex-col'>
        <h3 className={`text-subtitulo-semibold ${titleStyles}`}>{title}</h3>
        <Nav items={items} currentMode={mode} withModal={false} center={false} horizontal={false} />
      </div>
    </>
  )
}

export default Footer
