'use client'
import { Section, MultiBoldText } from '@/components'
import { useTranslation } from 'react-i18next'

const Application = () => {
  const [t] = useTranslation('global')
  return (
    <Section
      subClassName='padding-x-estilo2 padding-y-estilo1 bg-neutral-100 color-white gap-2 flex-col flex'
      className='bg-neutral-100'
    >
      <MultiBoldText startText={t('about.t4')} endText={t('about.t5')} />
      <p className='text-base-light color-neutral-900'>{t('about.t6')}</p>
    </Section>
  )
}

export default Application
