interface MiniModalBoxProps {
  children: React.ReactNode
  className?: string
}

export default function MiniModalBox({ children, className }: MiniModalBoxProps) {
  return (
    <div className={`absolute flex flex-col gap-2 p-5 bg-white rounded-xl shadow-2xl ${className} `}>{children}</div>
  )
}
