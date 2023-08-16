import AdminLayoutContent from "./content";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
