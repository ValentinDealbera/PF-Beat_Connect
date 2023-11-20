'use client'
import { Section } from '@/components'
import { usePathname } from 'next/navigation'
import HeroSettings from './_components/Hero'
import ClientSettingsIndexer from './_components/Indexer'

interface Props {
  children: React.ReactNode
  title: string
  aceptedPath: string
}

const SettingsTemplate = ({ children, title, aceptedPath }: Props) => {
  const pathname = usePathname()

  if (pathname !== aceptedPath) {
    return null
  }

  return (
    <>
      <HeroSettings title={title} />
      <Section subClassName='padding-x-estilo2 padding-y-estilo2 gap-estilo2 flex flex-col'>
        {pathname === '/client/settings' && <ClientSettingsIndexer />}
        {children}
      </Section>
    </>
  )
}

export default SettingsTemplate
