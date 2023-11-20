'use client'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'

interface DashboardItemProps {
  title: string
  link: string
  icon: string
}

const DashboardItem = ({ title, link, icon }: DashboardItemProps) => (
  <Link href={link}>
    <div className='gap-estilo4 flex flex-row'>
      <ReactSVG src={icon} className='dashboard-item__icon text-black fill-current dark:text-white' />
      <div className='text-base-medium dark:text-white'>{title}</div>
    </div>
  </Link>
)

export default DashboardItem
