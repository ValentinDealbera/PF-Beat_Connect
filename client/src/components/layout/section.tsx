import { type CSSProperties } from 'react'

interface SectionProps {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
  subClassName?: string
}

export default function Section({ children, style, className, subClassName }: SectionProps) {
  return (
    <section className={`flex w-full flex-row justify-center relative ${className} `} style={style}>
      <div className={subClassName}>{children}</div>
    </section>
  )
}
