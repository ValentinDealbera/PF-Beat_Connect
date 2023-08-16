import { AdminHeaderBar, Footer, Header } from "@/components";

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <>
      <AdminHeaderBar />
      <Header />
      <main>{children}</main>
      <Footer mode={"dark"} />
    </>
  );
}
