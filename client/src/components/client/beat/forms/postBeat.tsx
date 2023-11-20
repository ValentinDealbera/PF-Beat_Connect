import { BeatRightSheet, Input, Select } from '@/components'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { postClientBeat } from '@/redux/slices/client/beats'
import { ValidationCreateBeat } from '../../../validation/validationCreateBeat'
import { fetchGenres } from '@/redux/slices/filters'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

interface PostBeatProps {
  visible: boolean
  setVisible: (visible: boolean) => void
}

export default function PostBeat({ visible, setVisible }: PostBeatProps) {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const [fieldsToValidate, setFieldsToValidate] = useState([]) as any
  const [selected, setSelected] = useState('')
  const [error, setErrors] = useState({}) as any
  const genres = useAppSelector((state) => state?.filters?.genres)
  const { _id } = useAppSelector((state) => state?.client?.authSession?.session?.current)

  const [form, setForm] = useState({
    name: '',
    priceAmount: '',
    genre: selected,
    userCreator: _id,
    bpm: '',
    image: {},
    audioMP3: {},
    audioWAV: {},
    _id
  })

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, userCreator: _id, _id }))
  }, [_id])

  const handleInputChange = (e: any) => {
    if (e.target.type === 'file') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      })
    } else {
      setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }))
    }

    const { name } = e.target
    if (!fieldsToValidate.includes(name)) {
      setFieldsToValidate([...fieldsToValidate, name])
    }
  }

  const handleSelectChange = (e: any) => {
    setSelected(e)
    setForm((prevForm) => ({ ...prevForm, genre: e }))
  }

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  useEffect(() => {
    setErrors(ValidationCreateBeat(form, fieldsToValidate))
  }, [form, fieldsToValidate])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const formErrors = ValidationCreateBeat(form, '*')
    if (Object.keys(formErrors).length === 0) {
      await dispatch(postClientBeat(form))
      setVisible(false)
    } else {
      setErrors(formErrors)
    }
    e.target.reset()
  }

  return (
    <>
      {visible && (
        <BeatRightSheet width='min-w-[100vw] xs:min-w-[90vw] sm:min-w-[450px] ' setIsDropdownOpen={setVisible}>
          <div className='flex h-full flex-col items-center justify-center gap-7 px-4 xs:px-8 sm:px-14 sm:py-10 overflow-y-hidden  '>
            <div className='flex w-full flex-col gap-5 overflow-y-hidden'>
              <div className='flex flex-col items-center justify-center gap-0'>
                <h4 className='text-titulo3-regular text-center'>
                  {t('postBeat.t1')} <span className='text-titulo3-semibold text-red-700'>{t('postBeat.t2')}</span>{' '}
                </h4>
                <p className='text-base-light text-center'>{t('postBeat.t3')}</p>
              </div>
              <form onSubmit={handleSubmit} className='flex max-h-full w-full flex-col gap-5 overflow-y-scroll'>
                <div className='flex flex-col gap-4'>
                  <Input
                    name='name'
                    label={t('postBeat.form1')}
                    type='text'
                    onChange={handleInputChange}
                    error={error.name}
                    className='w-full'
                    placeholder={t('postBeat.form2')}
                    labelClass='w-full'
                  />
                  <Input
                    name='priceAmount'
                    prefix='$'
                    label={t('postBeat.form3')}
                    type='number'
                    onChange={handleInputChange}
                    error={error.priceAmount}
                    placeholder={t('postBeat.form4')}
                    className='w-full'
                    labelClass='w-full'
                  />
                  <Select
                    label={t('postBeat.form5')}
                    valores={genres}
                    setSeleccionados={handleSelectChange}
                    value={selected}
                    error={error.genre}
                    labelClass='w-full text-sm-regular text-sm-medium'
                  />
                  <Input
                    name='bpm'
                    label={t('postBeat.form7')}
                    placeholder='BPMs'
                    type='number'
                    onChange={handleInputChange}
                    error={error.bpm}
                    className='w-full'
                    labelClass='w-full'
                  />

                  <Input
                    name='image'
                    label={t('postBeat.form9')}
                    placeholder='Beat Image'
                    type='file'
                    onChange={handleInputChange}
                    error={error.image}
                    className='w-full'
                    labelClass='w-full'
                  />
                  <Input
                    name='audioMP3'
                    label={t('postBeat.form12')}
                    placeholder='Upload your Beat'
                    type='file'
                    onChange={handleInputChange}
                    error={error.audioMP3}
                    className='w-full'
                    labelClass='w-full'
                  />
                  <Input
                    name='audioWAV'
                    label={t('postBeat.form13')}
                    placeholder='Upload your Beat'
                    type='file'
                    onChange={handleInputChange}
                    error={error.audioWAV}
                    className='w-full'
                    labelClass='w-full'
                  />
                </div>
                <button
                  type='submit'
                  className='text-base-semibold mt-2  w-full rounded-full bg-red-700 py-2 text-white'
                >
                  {t('postBeat.form14')}
                </button>
              </form>
            </div>
          </div>
        </BeatRightSheet>
      )}
    </>
  )
}
