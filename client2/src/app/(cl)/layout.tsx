import { Footer, Header } from "@/components";

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer mode={"dark"} />
    </>
  );
}
