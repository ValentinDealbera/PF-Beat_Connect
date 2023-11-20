'use client'
import { BeatRightSheet } from '@/components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

interface BecomeSellerProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const BecomeSeller = ({ visible, setVisible }: BecomeSellerProps) => {
  const [terms, setTerms] = useState(false)
  const [t] = useTranslation('global')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    alert('Caracteristica desactivada')
    // if (!terms) {
    //   toast.error(t("becomeSeller.error1"), toastError);
    //   return;
    // }
    // try {
    //   const data = await axios.get(`${serverUrl}cart/toseller`);
    //   router.push(data.data.link);
    // } catch (error) {
    //   toast.error(t("becomeSeller.error2"), toastError);
    //   console.log(error);
    // }
  }

  return (
    <>
      {visible && (
        <BeatRightSheet width='min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] ' setIsDropdownOpen={setVisible}>
          <div className='flex h-full flex-col items-center justify-center gap-7 px-4 xs:px-8 sm:px-14 sm:py-10  '>
            <div className='flex flex-col items-center justify-center gap-2'>
              <h4 className='text-titulo2-regular text-center'>
                {t('becomeSeller.t1')} <span className='text-titulo2-semibold text-red-700'>BeatConnect</span>{' '}
                {t('becomeSeller.t2')} <span className='text-titulo2-semibold'>{t('becomeSeller.t3')}</span>
              </h4>
              <p className='text-base-light text-center'>{t('becomeSeller.t4')}</p>
            </div>
            <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
              <div className='flex w-full flex-col items-center justify-start gap-4 '>
                <div className='flex w-full flex-row items-center justify-start gap-2'>
                  <input
                    type='checkbox'
                    id='terms'
                    name='terms'
                    value='ok'
                    onChange={() => {
                      setTerms(!terms)
                    }}
                  />
                  <Link href='help/terms'>
                    <label
                      onClick={() => {
                        setVisible(!visible)
                      }}
                      className='text-base-light hover:cursor-pointer'
                    >
                      {t('becomeSeller.t5')}
                    </label>
                  </Link>
                </div>
              </div>
              <button type='submit' className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'>
                {t('becomeSeller.t6')}
              </button>
            </form>
          </div>
        </BeatRightSheet>
      )}
    </>
  )
}

export default BecomeSeller
