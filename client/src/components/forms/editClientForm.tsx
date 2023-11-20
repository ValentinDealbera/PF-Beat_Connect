import { FormColumn, FormContainer, FormRow, Input } from '@/components'
import { handleInputChange } from '@/data/formLogic'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { editClient } from '@/redux/slices/client/authSession'
import { useRouter } from 'next/navigation'
import { validationEditUser } from '@/components/validation/client/editUser'
import { useTranslation } from 'react-i18next'

interface Props {
  mode: string
}

export default function EditClientForm({ mode: modeP }: Props) {
  const [t] = useTranslation('global')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const formRef = useRef<any>(null)
  const [fieldsToValidate, setFieldsToValidate] = useState([]) as any
  const [error, setErrors] = useState({}) as any

  const defaultValues = useAppSelector((state) => state.client.authSession.session.current) || {}
  const id = useAppSelector((state) => state.client.authSession.session.current._id)

  const mode = modeP

  const [form, setForm] = useState({
    username: `${mode === 'edit' ? defaultValues.username : ''}`,
    firstName: `${mode === 'edit' ? defaultValues.firstName : ''}`,
    lastName: `${mode === 'edit' ? defaultValues.lastName : ''}`,
    image: '',
    email: `${mode === 'edit' ? defaultValues.email : ''}`,
    password: '',
    id,
    bio: `${mode === 'edit' ? defaultValues.bio : ''}`,
    backImage: ''
  })

  const handleInput = (e: any) => {
    handleInputChange(e, fieldsToValidate, setFieldsToValidate, form, setForm)
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const formErrors = validationEditUser(form, '*')
      if (Object.keys(formErrors).length === 0) {
        await dispatch(editClient(form))
        formRef.current.reset()
        router.push('/client')
      } else {
        setErrors(formErrors)

        throw new Error('Form Error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   setErrors(validateForm(form, fieldsToValidate, validateMode));
  // }, [form, fieldsToValidate]);

  useEffect(() => {
    setErrors(validationEditUser(form, fieldsToValidate))
  }, [form, fieldsToValidate])

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <FormContainer>
        <FormRow>
          <FormColumn className='w-full'>
            <Input
              id='firstName'
              name='firstName'
              label={t('settingsClient.t1')}
              placeholder={t('settingsClient.t1')}
              defaultValue={mode === 'edit' ? defaultValues.firstName : ''}
              type='text'
              onChange={handleInput}
              error={error.firstName}
            />
          </FormColumn>
          <FormColumn className='w-full'>
            <Input
              name='lastName'
              id='lastName'
              label={t('settingsClient.t5')}
              placeholder={t('settingsClient.t5')}
              defaultValue={mode === 'edit' ? defaultValues.lastName : ''}
              type='text'
              onChange={handleInput}
              error={error.lastName}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn className='w-full'>
            <Input
              name='email'
              label={t('settingsClient.t2')}
              placeholder={t('settingsClient.t2')}
              defaultValue={mode === 'edit' ? defaultValues.email : ''}
              type='email'
              onChange={handleInput}
              error={error.email}
            />
          </FormColumn>
          <FormColumn className='w-full'>
            <Input
              name='username'
              label={t('settingsClient.t3')}
              placeholder={t('settingsClient.t3')}
              defaultValue={mode === 'edit' ? defaultValues.username : ''}
              type='text'
              onChange={handleInput}
              error={error.username}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn className='w-full'>
            <Input
              id='bio'
              name='bio'
              label={t('settingsClient.t6')}
              placeholder={t('settingsClient.t6')}
              defaultValue={mode === 'edit' ? defaultValues.bio : ''}
              type='text'
              onChange={handleInput}
              error={error.bio}
            />
          </FormColumn>
          <FormColumn className='w-full'>
            <Input
              name='image'
              label={t('settingsClient.t4')}
              placeholder={t('settingsClient.t4')}
              type='file'
              onChange={handleInput}
              error={error.image}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn className='w-full'>
            <Input
              name='backImage'
              label={t('settingsClient.t7')}
              placeholder={t('settingsClient.t7')}
              type='file'
              onChange={handleInput}
              error={error.backImage}
            />
          </FormColumn>
          <FormColumn className='w-full'>
            <div />
          </FormColumn>
        </FormRow>
        <button
          type='submit'
          className='background-primary-red-700 color-neutral-white mt-1 w-max rounded-full px-5 py-3 text-sm font-semibold'
        >
          {t('settingsClient.tosave')}
        </button>
      </FormContainer>
    </form>
  )
}
