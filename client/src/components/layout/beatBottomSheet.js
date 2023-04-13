export default function BeatBottomSheet({ children, setIsDropdownOpen }) {
  return (
    <>
    <div onClick={()=>{setIsDropdownOpen(false)}} class="z-40 fixed w-full h-full top-0 left-0 bg-gray-600 opacity-50 "></div>
      <div class="z-50 overflow-y-scroll max-h-[80vh] min-h-[50vh] fixed w-full bottom-0 left-0 bg-white pb-10 pt-5 rounded-tr-3xl rounded-tl-3xl">
          {children}
      </div>
    </>
  );
}
