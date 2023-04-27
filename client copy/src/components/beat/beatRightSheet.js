export default function BeatRightSheet({ children, setIsDropdownOpen, width = "w-[360px]"}) {
    return (
      <>
      <div onClick={()=>{setIsDropdownOpen(false)}} className="z-40 fixed w-screen h-screen top-0 left-0 bg-black opacity-50"></div>
        <div className={`z-50 overflow-y-scroll fixed max-h-screen min-h-screen ${width} top-0 bottom-0 right-0 bg-white pb-10 pt-5 rounded-tl-3xl rounded-bl-3xl`}>
            {children}
        </div>
      </>
    );
  }
  