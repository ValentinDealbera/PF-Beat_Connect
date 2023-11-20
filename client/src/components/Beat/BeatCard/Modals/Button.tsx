'use client'

interface Props {
  text: string
  action: () => void
  icon?: string
  alt?: string
}

const Button = ({ text, action, icon, alt }: Props) => (
  <button
    className=' whitespace-nowrap text-sm font-medium text-black'
    onClick={(e) => {
      e.stopPropagation()
      action()
    }}
  >
    {icon && <img src={icon} alt={alt} className='aspect-square h-5 w-5' />}
    {text}
  </button>
)

export default Button
