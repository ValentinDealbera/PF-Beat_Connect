import { Logo } from "@/components";

export default function SimpleHeader({mode} ) {
  return (
    <>
      <header className="flex w-full  flex-row justify-center fixed z-30  py-8">
        <div className="padding-x-estilo2 flex items-center" >
        <Logo mode={mode} />
        </div>
      </header>
    </>
  );
}
