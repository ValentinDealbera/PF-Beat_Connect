interface MiniModalBoxProps {
  children: React.ReactNode
  className?: string
}

const MiniModalBox = ({ children, className }: MiniModalBoxProps) => (
  <div className={`absolute flex flex-col gap-2 p-5 bg-white rounded-xl shadow-2xl ${className} `}>{children}</div>
)

export default MiniModalBox
