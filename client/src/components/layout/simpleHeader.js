import { Logo } from "@/components";

export default function SimpleHeader() {
  return (
    <>
      <header className="padding-x-estilo2 z-30 flex w-full  flex-row justify-start bg-white py-8">
        <Logo mode="light" />
      </header>
    </>
  );
}
