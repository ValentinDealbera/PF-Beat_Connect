import { usePathname } from 'next/navigation'

interface Props {
  label: string
  name: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  error?: string
  defaultValue?: string
  className?: string
}

export default function TextArea({ label, name, value, onChange, placeholder, error, defaultValue, className }: Props) {
  const pathname = usePathname()
  const extraClassName = `${
    pathname.startsWith('/admin')
      ? ' dark:text-white   dark:placeholder:text-white border-slate-200 dark:border-none dark:bg-customDark-700'
      : 'placeholder:text-sm-light placeholder:color-neutral-gray-400   color-neutral-black-950'
  }`

  return (
    <label htmlFor={name} className='gap-estilo4 text-sm-medium flex min-w-0 flex-col'>
      {label}
      <textarea
        defaultValue={defaultValue}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} text-sm-regular border-radius-estilo2 px-4 py-2 ${extraClassName}`}
        style={{ borderWidth: '1px' }}
      />
      {error && <p className='gap-estilo4 text-sm-medium color-primary-red-500 ml-2 flex dark:text-red-800'>{error}</p>}
    </label>
  )
}
