import { ModalPopUp } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

interface ModalLoginProps {
  logged: boolean
  setLogged: (value: boolean) => void
}

export default function ModalLogin({ logged, setLogged }: ModalLoginProps) {
  const [t] = useTranslation('global')
  return (
    <>
      {logged && (
        <ModalPopUp>
          <div className='relative flex max-h-full  flex-col justify-center overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-10 md:p-7 lg:p-10 w-max '>
            <Image
              src='/icon/cross.svg'
              width={15}
              height={15}
              onClick={() => {
                setLogged(false)
              }}
              alt='close'
              className='absolute right-4 top-4 cursor-pointer'
            />
            <div className='flex w-full flex-col items-center justify-center'>
              <h1 className='pb-2 text-titulo3-semibold text-center font-bold text-red-700'>
                {t('beatCar.modalPopUp1')}
              </h1>
              <h2 className='text-center text-base-light'>{t('beatCar.modalPopUp2')}</h2>
              <p className='text-center text-base-light'>{t('beatCar.modalPopUp3')}</p>
              <p className='text-center text-base-medium'>{t('beatCar.modalPopUp4')}</p>
              <p className='mb-4 text-center text-base-light'>{t('beatCar.modalPopUp5')}</p>
              <Link href='/auth'>
                <div className='flex gap-2 rounded-full bg-red-700 pb-2 pl-4 pr-4 pt-2 text-base font-semibold text-white'>
                  <p>{t('beatCar.modalPopUp6')}</p>
                </div>
              </Link>
            </div>
          </div>
        </ModalPopUp>
      )}
    </>
  )
}
