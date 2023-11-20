'use client'
import { MultiBoldText, Section } from '@/components'
import { useTranslation } from 'react-i18next'

const Promo = () => {
  const [t] = useTranslation('global')
  return (
    <Section
      subClassName='flex min-w-full flex-col-reverse  2xl:container lg:flex-row 2xl:pr-24 bg-neutral-100 color-white gap-2 flex '
      className=' bg-neutral-100 flex min-w-full flex-col-reverse  2xl:container lg:flex-row 2xl:pr-24'
    >
      <div className='padding-x-estilo2  py-16 lg:padding-y-estilo1 flex lg:h-full w-full flex-col justify-center gap-2 lg:w-1/2 '>
        <MultiBoldText startText={t('beats.t5')} endText={t('beats.t6')} endClassName='text-red-700' />
        <p className='text-base-light'>{t('beats.t7')}</p>
      </div>
      <div
        style={{
          backgroundImage: 'url(/images/glenn-van-de-wiel-ySfXlAqg8QQ-unsplash.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className='aspect-square max-h-[400px] lg:max-h-none w-full lg:aspect-auto lg:h-full lg:w-1/2 '
      />
    </Section>
  )
}

export default Promo
