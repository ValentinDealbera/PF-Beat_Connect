'use client'
import { BeatsSpecialSection } from '@/components'
import HeroSection from './Hero'
import ShopSection from './Shop'
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
