'use client'
import { Hero } from '@/components'
import { useTranslation } from 'react-i18next'

const HeroSection = () => {
  const [t] = useTranslation('global')
  return (
    <Hero
      imageAlt='Hero Image'
      image='/images/yannis-papanastasopoulos-yWF2LLan-_o-unsplash(1).webp'
      className='background-primary-red-700 min-h-[350px] items-center justify-center align-middle md:min-h-[45vh]'
    >
      <div className='padding-estilo2  gap-estilo3 mt-6 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center'>
        <h1 className='text-titulo1-regular text-white'>
          {t('beats.t1')} <span className='text-titulo1-semibold text-white'>{t('beats.t2')}</span>
        </h1>
      </div>
    </Hero>
  )
}

export default HeroSection
