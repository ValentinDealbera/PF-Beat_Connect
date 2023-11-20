'use client'
import { useTranslation } from 'react-i18next'
import { ReactSVG } from 'react-svg'
import { usePathname } from 'next/navigation'

const FaqsItem = ({ faq }: any) => {
  const pathname = usePathname()
  const [t] = useTranslation('global')
  const className = pathname.startsWith('/admin') ? 'text-black dark:text-white' : 'text-black'

  return (
    <div className='faq-item gap-estilo4 flex flex-col'>
      <div className='gap-estilo4 flex flex-row  items-center'>
        <ReactSVG src='/icon/dashboard/faq-dark.svg' className={` h-[24px] w-[24px] fill-current ${className}`} />
        <h3 className='text-subtitulo-medium'>{t(faq.title)}</h3>
      </div>
      <p className='text-base-light'>{t(faq.content1)}</p>
      <br />
      <p className='text-base-light'>{t(faq.content2)}</p>
      <br />
      <p className='text-base-light'>{t(faq.content3)}</p>
    </div>
  )
}

export default FaqsItem
