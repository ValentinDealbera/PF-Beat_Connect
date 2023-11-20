import { type CSSProperties } from 'react'

interface Props {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
  subClassName?: string
}

const Section = ({ children, style, className, subClassName }: Props) => (
  <section className={`flex w-full flex-row justify-center relative ${className} `} style={style}>
    <div className={subClassName}>{children}</div>
  </section>
)

export default Section
