export default function ModalPopUp(props) {
    console.log("pp",props)
  return (
    <>
      <div
        style={{ background: "#00000080" }}
        className="padding-estilo2 fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center"
      >
        {props.children}
      </div>
    </>
  );
}
