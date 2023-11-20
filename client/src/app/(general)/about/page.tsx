import Hero from './_components/Hero'
import AboutSection from './_components/General'
import TeamSection from './_components/Team'
import TechSection from './_components/Technologies'
import AboutAppSection from './_components/Application'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | BeatConnect'
}

const About = () => (
  <>
    <Hero />
    <AboutSection />
    <TeamSection />
    <AboutAppSection />
    <TechSection />
  </>
)

export default About
