interface ButtonProps {
  text: string
  action: () => void
  icon?: string
  alt?: string
}

export default function Button({ text, action, icon, alt }: ButtonProps) {
  return (
    <button
      className=' whitespace-nowrap text-sm font-medium text-black'
      onClick={(e) => {
        e.stopPropagation(), action()
      }}
    >
      {icon && <img src={icon} alt={alt} className='aspect-square h-5 w-5' />}
      {text}
    </button>
  )
}
