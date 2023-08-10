type Props = {
  children: React.ReactNode;
};

export default function ModalPopUp({ children }: Props) {
  return (
    <>
      <div
        style={{ background: "#00000080" }}
        className="padding-estilo2 fixed min-w-[100vw] left-0 top-0 z-[100] flex h-screen w-full items-center justify-center"
      >
        {children}
      </div>
    </>
  );
}
