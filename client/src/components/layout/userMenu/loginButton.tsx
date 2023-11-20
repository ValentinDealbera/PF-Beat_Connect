import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function LoginButton() {
  const [t] = useTranslation('global')
  return (
    <Link href='/auth'>
      <div className='flex gap-2 rounded-full bg-red-700 pb-2 pl-4 pr-4 pt-2 text-sm font-semibold text-white'>
        <p>{t('userBoxNav')}</p>
      </div>
    </Link>
  )
}
