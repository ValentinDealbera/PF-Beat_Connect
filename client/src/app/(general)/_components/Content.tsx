'use client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { BeatsSpecialSection, Hero } from '@/components'

const heroImageStyles =
  'background-primary-red-700 min-h-[85vh] items-center justify-center align-middle md:min-h-[65vh]'
const textBoxStyles = 'text-paragraph1-regular text-base-light text-white lg:w-[75%] '
const buttonStyles = 'background-primary-red-700 color-neutral-white w-max rounded-full px-8 py-3 text-sm font-semibold'

const HeroText = () => {
  const [t] = useTranslation('global')
  const router = useRouter()
  const title1 = t('home.t1')
  const title2 = t('home.t2')
  const description = t('home.t3')
  const buttonText = t('home.t4')

  return (
    <div className='flex w-full flex-col justify-center gap-3'>
      <div id='text-box'>
        <h1 className='text-titulo1-regular text-white'>
          {title1}
          <span className='text-titulo1-semibold text-white'>{title2}</span>
        </h1>
        <p className={textBoxStyles}>{description}</p>
      </div>
      <button
        className={buttonStyles}
        onClick={() => {
          router.push('/beats')
        }}
      >
        {buttonText}
      </button>
    </div>
  )
}

const Content = () => {
  const [t] = useTranslation('global')
  const beatsTitle = `Beats ${t('home.t5')}`

  return (
    <>
      <Hero image='/images/jurre-houtkamp-xaye243ldn4-unsplash.webp' imageAlt='Hero' className={heroImageStyles}>
        <div className='padding-estilo2 gap-estilo3 mt-6 flex h-full w-full flex-col items-start justify-between align-middle md:flex-row md:items-center'>
          <HeroText />
        </div>
      </Hero>
      <BeatsSpecialSection title={beatsTitle} />
    </>
  )
}

export default Content
