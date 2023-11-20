'use client'
import { Input, GoogleButton } from '@/components'
import Link from 'next/link'
import { jsonLogin } from '@/redux/slices/client/authSession'
import { useAppDispatch } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { toast } from 'sonner'

const Content = () => {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const [error] = useState({}) as any

  const handleInput = (e: any) => {
    // const { name, value } = e.target
    // const data = {
    //   email: name === 'email' ? value : '',
    //   password: name === 'password' ? value : ''
    // }
    // const validationErrors = ValidateAuth(data)
    // setErrors({ ...error, [name]: validationErrors[name] });
  }

  const handleLogin = (e: any) => {
    e.preventDefault()
    try {
      const data = {
        email: e.target.email.value,
        password: e.target.password.value
      }

      if (!error.email && !error.password) {
        dispatch(jsonLogin(data))
      }
    } catch (error) {
      toast.error('Ocurrio un error, recarga la pagina')
    }
  }

  return (
    <>
      <h1 className='text-titulo3-regular mb-6'>
        {t('authIndex.t1')} <span className='text-titulo3-semibold'>{t('authIndex.t2')}</span>
      </h1>
      <form onSubmit={handleLogin} className='flex w-full flex-col gap-4'>
        <Input
          type='email'
          name='email'
          label={t('authIndex.label')}
          placeholder={t('authIndex.placeholder')}
          className='w-full'
          error={error.email}
          onChange={handleInput}
        />
        <Input
          type='password'
          name='password'
          label={t('authIndex.labelPassword')}
          placeholder={t('authIndex.placeholderPassword')}
          error={error.password}
          onChange={handleInput}
        />
        <p className=' w-full text-center font-light'>
          {t('authIndex.t3')}{' '}
          <Link href='/auth/recover' className='font-medium text-red-700'>
            {t('authIndex.t4')}
          </Link>
        </p>
        <button type='submit' className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'>
          {t('authIndex.t5')}
        </button>
      </form>
      <hr className='my-6 w-full' />
      <GoogleButton />
      <p className='mt-6 w-full text-center font-light'>
        {t('authIndex.t6')}{' '}
        <Link href='/auth/register' className='font-medium text-red-700'>
          {t('authIndex.t7')}
        </Link>
      </p>
    </>
  )
}

export default Content
