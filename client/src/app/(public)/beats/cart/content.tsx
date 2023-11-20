'use client'
import { Section, IslandDashboard, DynamicTableLight, BeatsSpecialSection } from '@/components'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { deleteFromCart } from '@/redux/slices/cart'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

export default function Carrito() {
  const [t] = useTranslation('global')
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state?.cart.cart) || ([] as any)
  const user = useAppSelector((state) => state.client.authSession.session.current._id)

  const precio_por_autor = [] as any

  cartItems.forEach((item: any) => {
    const authorId = item.beat.userCreator._id ? item.beat.userCreator._id : item.beat.userCreator
    const author = item.beat.userCreator.firstName
      ? `${item.beat.userCreator.firstName} ${item.beat.userCreator.lastName}`
      : item.beat.userCreator
    const price = item.beat.priceAmount
    const image = item.beat.userCreator.image
    const index = precio_por_autor.findIndex((obj: any) => obj.authorId === authorId)
    if (index === -1) {
      precio_por_autor.push({ authorId, author, price, image })
    } else {
      precio_por_autor[index].price += price
    }
  })

  const headers = ['Beat', t('cartHeaders.t1'), t('cartHeaders.t2')]

  const [price, setPrice] = useState('')
  const [actions, setActions] = useState('')
  useEffect(() => {
    setPrice(t('cartHeaders.t1').toLocaleLowerCase())
    setActions(t('cartHeaders.t2').toLocaleLowerCase())
  }, [t('cartHeaders.t1'), t('cartHeaders.t2')])

  const rows = cartItems.map((item: any) => ({
    id: item.beat._id,
    beat: (
      <div className='flex items-center gap-4 '>
        <Image src={item.beat.image} width={70} height={70} className='aspect-square rounded-xl' alt='beat' />
        <div className='flex flex-col'>
          <h3 className='text-base-medium'>{item.beat.name}</h3>
          <p className='text-sm-light'>
            {item.beat.userCreator.firstName} {item.beat.userCreator.lastName}
          </p>
        </div>
      </div>
    ),
    [price]: <p className='text-sm-medium'>${item.beat.priceAmount}</p>,
    [actions]: (
      <button className='text-sm-medium' onClick={() => dispatch(deleteFromCart({ id: item.beat._id }))}>
        {t('cartHeaders.t3')}
      </button>
    )
  }))

  const idsOfSellers = precio_por_autor.map((item: any) => item.authorId)
  const idsOfBuyer = user

  const cartIds = cartItems.map((item: any) => item.beat._id)

  const toPay = {
    cart: cartIds,
    seller: idsOfSellers[0],
    buyer: idsOfBuyer
  }

  const handlePayment = () => {
    alert('Las compras estan desactivadas')
  }
  // if (!isLogged) {
  //   return alert("Debes iniciar sesion para poder comprar");
  // }

  // axios
  //   .post(`${serverUrl}cart/pay`, toPay, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       userid: user,
  //     },
  //   })
  //   .then((res) => {
  //     router.push(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  let className
  if (cartItems.length === 0) {
    className = 'h-full'
  } else {
    className = 'h-[80%]'
  }

  return (
    <>
      <Section subClassName='padding-x-estilo2 pt-[108px]   pb-[0px]' className=''>
        <div
          style={{
            backgroundImage: 'url(/images/cartbg.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: '-1'
          }}
          className={`absolute left-0 top-0  ${className} max-h-[65vh] w-full`}
        />
        {cartItems.length <= 0 && (
          <div className='flex items-center justify-center '>
            <h1 className='text-titulo2-medium pb-10 text-white'>{t('miniCart.t3')}</h1>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className='flex flex-col gap-5 pt-10 lg:flex-row xl:gap-10'>
            <IslandDashboard
              className='flex h-max w-full flex-col gap-4'
              style={{ boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.08)' }}
            >
              <h1 className='text-titulo2-medium'>{t('cartHeaders.title')}</h1>
              <DynamicTableLight headers={headers} rows={rows} />
            </IslandDashboard>
            <IslandDashboard
              className='flex h-max w-full flex-col gap-6 lg:w-[40%]'
              style={{ boxShadow: '0px 0px 15px 2px rgba(0, 0, 0, 0.08)' }}
            >
              <h2 className='text-subtitulo-medium'>{t('cartHeaders.t4')}</h2>
              <div id='precio_por_autor' className='flex flex-col gap-4'>
                {precio_por_autor.map((item: any) => (
                  <div>
                    <div className='flex items-center justify-between gap-4'>
                      <div className='flex items-center gap-1'>
                        <Image src={item.image} width={50} height={50} className='rounded-full' alt='user' />
                        <h3 className='text-base-medium'>{item.author}</h3>
                      </div>
                      <span className='text-base-semibold text-red-700'>${item.price}</span>
                    </div>
                    <hr className='mt-4 border-slate-200' />
                  </div>
                ))}
              </div>
              <div id='total' className='flex flex-col items-center gap-2'>
                <div className='flex w-full items-center justify-between gap-4'>
                  <h3 className='text-base-light'>{t('cartHeaders.t5')}</h3>
                  <span className='text-base-semibold text-red-700'>
                    ${cartItems.reduce((acc: any, item: any) => acc + item.beat.priceAmount, 0)}
                  </span>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <h3 className='text-base-light'>{t('cartHeaders.t6')}</h3>
                  <span className='text-base-semibold text-red-700'>$0</span>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <h3 className='text-base-semibold'>{t('cartHeaders.t7')}</h3>
                  <span className='text-base-semibold text-red-700'>
                    ${cartItems.reduce((acc: any, item: any) => acc + item.beat.priceAmount, 0)}
                  </span>
                </div>
              </div>
              <button className='text-base-semibold rounded-full bg-red-700 py-2 text-white' onClick={handlePayment}>
                {t('cartHeaders.t8')}
              </button>
            </IslandDashboard>
          </div>
        )}
      </Section>
      <BeatsSpecialSection title={'Beats' + ' ' + t('home.t5')} />
    </>
  )
}
