'use client'
import { Section, MultiBoldText } from '@/components'
import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const [t] = useTranslation('global')
  const aboutTitle = t('about.t1')
  const aboutTitle2 = t('about.t2')
  const aboutText = t('about.t3')

  return (
    <Section subClassName='padding-x-estilo2 padding-y-estilo1 gap-2 flex-col flex'>
      <MultiBoldText startText={aboutTitle} endText={aboutTitle2} />
      <p className='text-base-light'>{aboutText}</p>
    </Section>
  )
}
