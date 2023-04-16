export default function ModalBoxForNav(props) {
  return (
    <div className=" absolute left-[50%] translate-x-[-50%] w-max " id="modalBoxForNav" >
      <div className=" flex flex-col gap-2 mt-3 rounded-lg bg-white py-6 px-6 shadow-2xl">
        {props.children}
      </div>
    </div>
  );
}
