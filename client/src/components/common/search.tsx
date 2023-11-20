import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface SearchProps {
  colorMode: 'light' | 'dark'
  sizeMode: 'small' | 'large'
  className?: string
  response: (value: string) => void
  value: string
}

export default function Search({ colorMode, sizeMode, className, response, value }: SearchProps) {
  const [t] = useTranslation('global')
  return (
    <>
      <div
        className={`${colorMode === 'light' ? 'background-neutral-white' : 'background-primary-red-700'} ${
          sizeMode === 'small' ? 'px-6 py-2' : 'px-8 py-3'
        } border-radius-estilo1 gap-estilo4 flex flex-row  items-center justify-start ${className}`}
      >
        <Image
          src={colorMode === 'light' ? '/icon/search-red.svg' : '/icon/search-white.svg'}
          alt='Search'
          width={sizeMode === 'small' ? 13 : 20}
          height={sizeMode === 'small' ? 13 : 20}
          className='aspect-square'
        />
        <input
          type='text'
          placeholder={t('search')}
          value={value}
          className={`border-none bg-transparent outline-none ${
            colorMode === 'light'
              ? 'color-primary-red-700 placeholder:color-primary-red-700'
              : 'color-neutral-white placeholder:color-neutral-white'
          } text-paragraph1-regular w-full`}
          onChange={(e) => {
            try {
              response(e.target.value)
            } catch (error) {
              console.log(error)
            }
          }}
        />
      </div>
    </>
  )
}
