'use client'
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const IslandDashboard = ({ children, style, className }: Props) => {
  const pathname = usePathname()
  const className2 = `${
    pathname.startsWith('/admin') ? 'dark:text-gray-300 dark:bg-customDark-900 bg-white' : 'background-neutral-white'
  }`
  return (
    <>
      <div
        className={`padding-island-estilo1 ${className}  border-radius-estilo1  ${
          className ? '' : 'w-full'
        } ${className2} `}
        style={style}
      >
        {children}
      </div>
    </>
  )
}

export default IslandDashboard
