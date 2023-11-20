import { setSettingsActiveIndex } from '@/redux/slices/profile'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useTranslation } from 'react-i18next'

interface IndexerItemProps {
  item: any
  index: number
}

const IndexerItem = ({ item, index }: IndexerItemProps) => {
  const activeIndex = useAppSelector((state) => state.profile.settingsActiveIndex)
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const textStyles = index === activeIndex ? 'text-base-semibold' : 'text-base-light'

  return (
    <>
      {item.visible && (
        <h5 className={`cursor-pointer ${textStyles}`} onClick={() => dispatch(setSettingsActiveIndex(index))}>
          {t(item.title)}
        </h5>
      )}
    </>
  )
}

const ClientSettingsIndexer = () => {
  const loginMethod = useAppSelector((state) => state.client.authSession.auth.loginMethod)

  const buyerGeneralNav = [
    {
      title: 'buyerGeneralNav.profile',
      visible: true
    },
    {
      title: 'buyerGeneralNav.password',
      visible: loginMethod !== 'google'
    }
  ]

  return (
    <div className='gap-estilo2 flex'>
      {buyerGeneralNav.map((item, index) => (
        <IndexerItem item={item} index={index} key={index} />
      ))}
    </div>
  )
}

export default ClientSettingsIndexer
