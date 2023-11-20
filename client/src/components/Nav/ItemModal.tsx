'use client'
import { useState } from 'react'
import { NavigationModal } from '@/components'

interface Props {
  label: string
  labelClass: string
  children: React.ReactNode
  currentMode: 'light' | 'dark'
}

const NavModalItem = ({ labelClass, label, children, currentMode }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const itemStyles = ` ${currentMode === 'light' ? 'color-neutral-black-950' : 'color-neutral-white'}`

  return (
    <div
      className='relative'
      onMouseLeave={() => {
        setVisible(false)
      }}
      onMouseEnter={() => {
        setVisible(true)
      }}
    >
      <p className={` ${labelClass} ${itemStyles} cursor-pointer`}>{label}</p>
      {visible && <NavigationModal>{children}</NavigationModal>}
    </div>
  )
}

export default NavModalItem
