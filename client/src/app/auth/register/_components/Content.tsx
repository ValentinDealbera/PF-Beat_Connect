'use client'
import { Input, GoogleButton } from '@/components'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { jsonRegister } from '@/redux/slices/client/authSession'
import { useAppDispatch } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'
import { ValidateRegister } from '@/components/validation/client/validateRegister'

const Content = () => {
  const [t] = useTranslation('global')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({}) as any
  const [error, setErrors] = useState({}) as any
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const validationErrors = ValidateRegister(form, '*') as any
    setErrors(validationErrors)
  }, [form])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value || '' })
  }

  const onClick = () => {
    const validationErrors = ValidateRegister(form, '*') as any
    setErrors(validationErrors)
    if (form.firstName && form.lastName && !validationErrors.firstName && !validationErrors.lastName) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const validationErrors = ValidateRegister(form, '*')
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      await dispatch(jsonRegister(form))
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-titulo3-regular mb-6'>
        {t('register.t1')} <span className='text-titulo3-semibold'>BeatConnect</span>
      </h1>
      <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
        {step === 1 && (
          <div id='step1' className='flex w-full flex-col gap-4'>
            <Input
              type='text'
              name='firstName'
              label={t('register.t2')}
              placeholder={t('register.t2')}
              className='w-full'
              onChange={handleChange}
              error={error.firstName ? error.firstName : ''}
            />
            <Input
              type='text'
              name='lastName'
              label={t('register.t3')}
              placeholder={t('register.t3')}
              className='w-full'
              onChange={handleChange}
              error={error.lastName ? error.lastName : ''}
            />
            <button
              type='button'
              className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'
              onClick={onClick}
            >
              {t('register.t4')}
            </button>
          </div>
        )}
        {step === 2 && (
          <div id='step2' className='flex w-full flex-col gap-4'>
            <Input
              type='email'
              name='email'
              label={t('register.t5')}
              placeholder={t('register.t5')}
              className='w-full'
              onChange={handleChange}
              error={error.email}
            />
            <Input
              type='text'
              name='username'
              label={t('register.t6')}
              placeholder={t('register.t6')}
              className='w-full'
              onChange={handleChange}
              error={error.username}
            />
            <Input
              type='password'
              name='password'
              label={t('register.t7')}
              placeholder={t('register.t7')}
              onChange={handleChange}
              error={error.password}
            />
            <button type='submit' className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'>
              {t('register.t8')}
            </button>
          </div>
        )}
      </form>
      <hr className='my-6 w-full' />
      <GoogleButton />
      <p className='mt-6 w-full text-center font-light'>
        {t('register.t9')}{' '}
        <Link href='/auth' className='font-medium text-red-700'>
          {t('register.t10')}
        </Link>
      </p>
    </>
  )
}

export default Content
