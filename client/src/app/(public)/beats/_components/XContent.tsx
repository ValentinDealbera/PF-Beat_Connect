'use client'
import { BeatsSpecialSection } from '@/components'
import HeroSection from './XHero'
import ShopSection from './XShop'
import PromoSection from './Promo'
import { useTranslation } from 'react-i18next'

const Beats = () => {
  const [t] = useTranslation('global')
  return (
    <>
      <HeroSection />
      <BeatsSpecialSection title={t('beats.t3') + ' ' + t('beats.t4')} />
      <PromoSection />
      <ShopSection />
    </>
  )
}

export default Beats
