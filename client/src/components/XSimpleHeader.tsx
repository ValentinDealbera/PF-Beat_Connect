'use client'
import { Logo } from '@/components'
import i18n from 'i18next'

const SimpleHeader = () => {
  const currentLanguage = i18n.language
  return (
    <header className='fixed z-30  flex w-full flex-row justify-center  py-8'>
      <div className='padding-x-estilo2 flex items-center  justify-between'>
        <Logo />
        <div className='flex flex-row gap-4 md:flex-row lg:gap-2'>
          <button
            onClick={async () => await i18n.changeLanguage('es')}
            className={`text-white  ${currentLanguage === 'es' ? 'font-bold underline' : 'font-light'}`}
          >
            Español
          </button>
          <button
            onClick={async () => await i18n.changeLanguage('en')}
            className={`text-white  ${currentLanguage === 'en' ? 'font-bold underline' : 'font-light'}`}
          >
            English
          </button>
        </div>
      </div>
    </header>
  )
}

export default SimpleHeader
