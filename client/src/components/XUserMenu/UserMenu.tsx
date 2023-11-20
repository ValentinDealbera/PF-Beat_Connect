'use client'
import { MiniCart } from '@/components'
import ProfileBox from './Profile'
import LoginButton from './Button'
import { useAppSelector as useSelector } from '@/redux/hooks'

interface Props {
  className?: string
  navData?: any
  title?: string
}

const UserBoxNav = ({ className, navData }: Props) => {
  const { isLogged } = useSelector((state) => state.client.authSession.auth)
  return (
    <div className={`flex flex-row items-center justify-center gap-4 align-middle ${className}`}>
      <MiniCart />
      {isLogged ? <ProfileBox navClient={navData} /> : <LoginButton />}
    </div>
  )
}

export default UserBoxNav
