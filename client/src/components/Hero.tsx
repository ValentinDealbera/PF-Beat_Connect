import Image from 'next/image'

interface Props {
  image?: string
  imageAlt: string
  className?: string
  subClassName?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Hero = ({ image, imageAlt, className, subClassName, style, children }: Props) => (
  <section id='hero' className={`relative flex w-full flex-row  ${className}`} style={style}>
    {image && (
      <div className='absolute h-full w-full'>
        <Image fill src={image} alt={imageAlt} className='absolute h-full w-full object-cover z-[0]' />
        <div className='absolute h-full w-full z-[1] bg-black opacity-60' />
      </div>
    )}
    <div className={` flex h-full w-full  justify-center z-[2] ${subClassName} `}>{children}</div>
  </section>
)

export default Hero
