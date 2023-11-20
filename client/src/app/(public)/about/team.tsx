'use client'
import { Section } from '@/components'
import Image from 'next/image'
import { nosotros } from '@/data/data'

interface TeamMemberProps {
  member: (typeof nosotros)[0]
}
const TeamMember = ({ member }: TeamMemberProps) => (
  <div className='gap-estilo4 flex min-w-[75vw] flex-col sm:min-w-[40vw] md:min-w-[40vw] lg:min-w-full'>
    <div className='flex flex-col items-center justify-start gap-4 align-middle'>
      <div className='relative aspect-square h-full w-full'>
        <Image src={member.image} alt={member.name} layout='fill' className='aspect-square rounded-full object-cover' />
      </div>
      <div className='flex flex-col justify-center gap-2'>
        <div className='flex flex-col justify-center'>
          <h3 className='text-titulo3-semibold color-neutral-950 text-center'>{member.name}</h3>
        </div>
        <div className='flex flex-row justify-center gap-2 lg:gap-2'>
          {Object.entries(member.redes).map(([red, icono]) => (
            <a
              className='align-middle'
              href={member.enlaces[red as keyof typeof member.enlaces]}
              key={red}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='relative lg:h-[22px] lg:max-h-[22px] w-auto lg:min-w-[22px] h-[28px] max-h-[28px] min-w-[28px]'>
                <Image layout='fill' src={icono} alt={red} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default function TeamSection() {
  return (
    <Section subClassName='padding-x-estilo2 bg-white color-white gap-2 flex-col flex' className='bg-white'>
      <div className='gap-6 flex max-w-[100vw] flex-1 flex-shrink flex-grow grid-cols-1 overflow-scroll overflow-y-hidden overflow-x-scroll pb-24 md:grid-cols-4 lg:grid lg:flex-none lg:flex-shrink-0 lg:flex-grow-0 lg:gap-14 lg:overflow-x-hidden'>
        {nosotros.map((member, index) => (
          <TeamMember member={member} key={index} />
        ))}
      </div>
    </Section>
  )
}
