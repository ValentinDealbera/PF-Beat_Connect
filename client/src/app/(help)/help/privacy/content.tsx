'use client'
import { useTranslation } from 'react-i18next'

export default function Content() {
  const [t] = useTranslation('global')
  return (
    <>
      <p className='text-base-light color-neutral-black-900'>
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.title')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t1')}
        <br />
        <br />
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.t2')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t3')}
        <br />
        <br />
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.t4')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t5')}
        <br />
        <br />
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.t6')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t7')}
        <br />
        <br />
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.t8')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t9')}
        <br />
        <br />
        <span className='text-titulo3-semibold text-red-700 '>{t('helpCenter-privacy.t10')}</span>
        <br />
        <br />
        {t('helpCenter-privacy.t11')}
      </p>
    </>
  )
}
