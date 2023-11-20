'use client'
import { Section, DynamicTableLight } from '@/components'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { rowsBuilder } from './operation'

export default function Content() {
  const [t] = useTranslation('global')
  const [montoVar, setMontoVar] = useState('')
  const [operacionVar, setOperacionVar] = useState('')
  const [fechaVar, setFechaVar] = useState('')

  const beats = useAppSelector((state) => state.client.orders.orders) as any
  const beatsFiltered = beats.filter((item: any) => item.beat)

  useEffect(() => {
    setMontoVar(t('billing.t2').toLocaleLowerCase())
    setOperacionVar(t('billing.t3').toLocaleLowerCase())
    setFechaVar(t('billing.t4').toLocaleLowerCase())
  }, [t('billing.t2'), t('billing.t3'), t('billing.t4')])

  const headers = ['Beat', t('billing.t2'), t('billing.t3'), t('billing.t4')]
  const rows = rowsBuilder(beatsFiltered, t, montoVar, operacionVar, fechaVar)

  return (
    <Section subClassName='w-full gap-estilo2 flex flex-col'>
      {rows.length > 0 ? (
        <DynamicTableLight headers={headers} rows={rows} />
      ) : (
        <p className='text-base-medium'>{t('billing.empty')} </p>
      )}
    </Section>
  )
}
