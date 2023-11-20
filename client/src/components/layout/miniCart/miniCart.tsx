import { useAppSelector } from '@/redux/hooks'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import Modal from './modal'

export default function MiniCart() {
  const [t] = useTranslation('global')
  const cartItems = useAppSelector((state) => state?.cart.cart) || []
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className='relative aspect-square w-[43px] cursor-pointer rounded-full bg-red-700 p-4'
        onClick={() => {
          setVisible(!visible)
        }}
      >
        <Image src='/icon/cart.svg' layout='fill' className='aspect-square  object-cover p-3' alt={t('cart')} />
      </div>
      <Modal visible={visible} setVisible={setVisible} cartItems={cartItems} />
    </>
  )
}
