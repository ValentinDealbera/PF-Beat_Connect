'use client'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { resetReducer } from '@/redux/slices/client/authSession'

import { serverUrl } from '@/data/config'

export default function Logout() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const loginMethod = useAppSelector((state) => state.client.authSession.auth.loginMethod)

  const logOutJson = async () => {
    dispatch(resetReducer())
    // resetPersist()
  }

  useEffect(() => {
    const logOut = async () => {
      await logOutJson()

      if (loginMethod === 'google') {
        router.push(`${serverUrl}google/logout`)
      } else {
        window.location.reload()
        router.push('/')
      }
    }

    if (loginMethod !== '') {
      logOut()
    } else {
      router.push('/')
    }
  }, [])

  return <></> // Opcionalmente puedes retornar algún contenido o null si no necesitas mostrar nada en este componente
}
