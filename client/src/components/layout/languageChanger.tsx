import { useTranslation } from 'react-i18next'

export default function LanguageChanger() {
  const { t, i18n } = useTranslation('global')
  const currentLanguage = i18n.language
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language)
  }

  return (
    <div className='flex flex-col justify-start items-start gap-4 md:flex-row lg:gap-2'>
      <LanguageButton
        onClick={() => {
          handleLanguageChange('es')
        }}
        isActive={currentLanguage === 'es'}
        text='Español'
      />
      <LanguageButton
        onClick={() => {
          handleLanguageChange('en')
        }}
        isActive={currentLanguage === 'en'}
        text='English'
      />
    </div>
  )
}

interface LanguageButtonProps {
  onClick: () => void
  isActive: boolean
  text: string
}

function LanguageButton({ onClick, isActive, text }: LanguageButtonProps) {
  return (
    <button onClick={onClick} className={`text-white ${isActive ? 'font-bold underline' : 'font-light'}`}>
      {text}
    </button>
  )
}
