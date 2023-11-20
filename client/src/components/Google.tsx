'use client'
import Image from 'next/image'
import { useAppDispatch } from '@/redux/hooks'
import { setLoginMethod } from '@/redux/slices/client/authSession'
import { useRouter } from 'next/navigation'
import { serverUrl } from '@/utils/config.const'
import { useTranslation } from 'react-i18next'

const GoogleButton = () => {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = async () => {
    dispatch(setLoginMethod('google'))
    router.push(`${serverUrl}google`)
  }

  return (
    <button
      className='text-base-medium flex w-full  items-center justify-center gap-2 rounded-full border px-8 py-2 text-black'
      style={{ background: '#fff' }}
      onClick={handleLogin}
    >
      <div className='rounded-full bg-white p-2'>
        <Image src='/icon/google.png' alt='Google' width={15} height={15} className='aspect-square' />
      </div>
      <span>{t('authIndex.continueGoogle')}</span>
    </button>
  )
}

export default GoogleButton
