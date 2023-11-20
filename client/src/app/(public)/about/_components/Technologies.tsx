'use client'
import { Section, MultiBoldText } from '@/components'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { tecnologias } from '@/data/data'

interface TechCardProps {
  tecnologia: (typeof tecnologias)[0]
}

const TechCard = ({ tecnologia }: TechCardProps) => {
  const [t] = useTranslation('global')

  return (
    <div className='gap-estilo4 flex flex-col' key={tecnologia.id}>
      <div className='gap-estilo4 flex flex-row items-center justify-start align-middle'>
        <div className='relative h-[50px] max-h-[50px] w-[50px] max-w-[50px]'>
          <Image src={tecnologia.image} alt={tecnologia.title} layout='fill' className='object-contain' />
        </div>
        <h3 className='text-titulo3-semibold color-neutral-950 text-center'>{tecnologia.title}</h3>
      </div>
      <p className='text-base-light color-neutral-900'>{t(tecnologia.description)}</p>
    </div>
  )
}

const Technologies = () => {
  const [t] = useTranslation('global')
  const heroStyles = 'padding-x-estilo2 padding-y-estilo1 flex flex-col gap-12 items-center '
  const gridStyles = 'lg:gap-estilo1 grid grid-cols-1 gap-10 md:grid-cols-2'

  return (
    <Section subClassName={heroStyles}>
      <MultiBoldText startText={t('about.t7')} endText={t('about.t8')} className='text-center' />
      <div className={gridStyles}>
        {tecnologias.map((tecnologia) => (
          <TechCard tecnologia={tecnologia} key={tecnologia.id} />
        ))}
      </div>
    </Section>
  )
}

export default Technologies
