import { Logo } from "@/components";

export default function SimpleHeader({ mode }) {
  return (
    <>
      <header className="fixed z-30  flex w-full flex-row justify-center  py-8">
        <div className="padding-x-estilo2 flex items-center">
          <Logo mode={mode} />
        </div>
      </header>
    </>
  );
}
