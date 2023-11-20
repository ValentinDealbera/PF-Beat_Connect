import HeroSection from './_components/XHero'
import BeatsSection from './_components/XBeats'
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
