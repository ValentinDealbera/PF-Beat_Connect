import HeroSection from './_components/Hero'
import BeatsSection from './_components/Beats'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client | BeatConnect'
}

const BuyerProfile = () => (
  <>
    <HeroSection />
    <BeatsSection />
  </>
)

export default BuyerProfile
