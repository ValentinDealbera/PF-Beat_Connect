import { useState, useEffect } from "react";

export default function BeatBottomSheet({ children, setIsDropdownOpen }) {

  const [hasElapsed, setHasElapsed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasElapsed(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    if (hasElapsed) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
    <div onClick={handleClick} class="z-40 fixed w-full h-full top-0 left-0 bg-black opacity-50 "></div>
      <div class="z-50 overflow-y-scroll max-h-[80vh]  fixed w-full bottom-0 left-0 bg-white pb-10 pt-8 rounded-tr-3xl rounded-tl-3xl">
          {children}
      </div>
    </>
  );
}
