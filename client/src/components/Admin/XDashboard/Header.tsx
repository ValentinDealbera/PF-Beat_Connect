'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'

const AdminHeaderBar = () => {
  const [t] = useTranslation('global')
  const pathname = usePathname()
  const router = useRouter()
  const { isLogged, isAdmin } = useAppSelector((state) => state.client.authSession.auth)

  if (pathname.startsWith('/admin') || pathname.startsWith('/auth') || !isAdmin || !isLogged) {
    return null
  }

  return (
    <>
      <div className='bg-black w-full flex justify-center '>
        <div className='padding-x-estilo2 flex h-10 items-center justify-between bg-black'>
          <p className='text-sm-light text-white'>{t('adminHeaderBar.t1')}</p>
          <button
            className='text-sm-semibold text-white'
            onClick={() => {
              router.push('/admin')
            }}
          >
            {t('adminHeaderBar.t2')}
          </button>
        </div>
      </div>
    </>
  )
}

export default AdminHeaderBar
