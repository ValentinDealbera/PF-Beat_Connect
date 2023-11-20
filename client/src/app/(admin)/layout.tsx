import AdminLayoutContent from './content'

interface Props {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}
