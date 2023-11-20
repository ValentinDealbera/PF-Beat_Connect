'use client'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { setGoogleSuccessful, resetReducer, getUserData } from '@/redux/slices/client/authSession'
import { serverUrl } from '@/utils/config.const'

interface Props {
  children: React.ReactNode
}

const HOC = ({ children }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const dispatch = useAppDispatch()
  const {
    loginMethod,
    isAdmin,
    isLogged,
    tokenValid,
    google: { googleSessionID },
    json: { token }
  } = useAppSelector((state) => state?.client?.authSession?.auth)

  const { _id } = useAppSelector((state) => state?.client?.authSession?.session?.current)

  const hocIsWorking = true
  const experimentalIsClient = isLogged
  const experimentalIsAdmin = isAdmin

  const GoogleSessionID = params.get('session') ?? googleSessionID
  const clientId = params.get('id') ?? _id
  // const clientId = _id && _id !== "" ? _id : params.id;

  // --------------------
  // HOC GOOGLE AUTH
  const googleAuth = async (headers: any) => {
    try {
      await axios.get(`${serverUrl}google/verify`, {
        headers
      })

      if (clientId && clientId !== undefined) {
        const session = (await dispatch(getUserData(clientId))) as any
        console.log('session', session?.payload?.session?.softDelete)
        if (session?.payload?.session?.softDelete === true) {
          dispatch(resetReducer())
          router.push('/')
          return
        }

        dispatch(
          setGoogleSuccessful({
            isLogged: true,
            tokenValid: true,
            googleSessionID: headers.session
            //   session: userData,
          })
        )
      }
    } catch (error) {
      console.log('Error al iniciar con google', error)
      dispatch(resetReducer())
      router.push('/')
    }
  }

  useEffect(() => {
    console.log('GoogleSessionID', GoogleSessionID, loginMethod, clientId, params)
    if (loginMethod === 'google' && GoogleSessionID) {
      const headers = { session: GoogleSessionID }
      googleAuth(headers)
    }
  }, [GoogleSessionID, loginMethod, clientId])

  // --------------------
  // HOC JSON AUTH
  const jsonAuth = async (headers: any) => {
    try {
      await axios.get(`${serverUrl}auth/me`, {
        headers
      })
    } catch (error) {
      console.log('Error:', error)
      dispatch(resetReducer())
      router.push('/')
    }
  }

  useEffect(() => {
    if (loginMethod === 'json' && token) {
      const headers = { Authorization: `Bearer ${token}` }
      jsonAuth(headers)
    }
  }, [])

  if (!hocIsWorking) {
    return <>{children}</>
  }

  if (pathname.startsWith('/client')) {
    if (!experimentalIsClient || !tokenValid) {
      router.push('/')
      return <></>
    } else {
      return <>{children}</>
    }
  } else if (pathname.startsWith('/admin')) {
    if (!experimentalIsAdmin || !tokenValid) {
      router.push('/')
    } else {
      return <>{children}</>
    }
  } else if (pathname.startsWith('/auth')) {
    if (pathname === '/auth/logout') {
      return <>{children}</>
    }
    if (isLogged) {
      router.push('/')
    } else {
      return <>{children}</>
    }
  } else {
    return <>{children}</>
  }
}

export default HOC
