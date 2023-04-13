import React, { useState, useRef, useEffect } from "react";
import { MiniModalBox, ArrowLabel, CheckboxGroup, ModalBoxForNav } from "@/components";
import Image from "next/image";

export default function UserBoxNav({children, id}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    function handleMouseLeave() {
      setHoverTimeout(
        setTimeout(() => {
         setIsDropdownOpen(false);
        }, 100) // Change this value to adjust the delay before closing the modal on hover leave
      );
    }
    function handleMouseEnter() {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      //si estamos sobre el elemento que tiene el id recibido por props, debemos abrir el dropdown
      if (id === dropdownRef.current.id) setIsDropdownOpen(true);
      else return;
    }
    dropdownRef.current.addEventListener("mouseenter", handleMouseEnter);
    dropdownRef.current.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      dropdownRef.current.removeEventListener("mouseenter", handleMouseEnter);
      dropdownRef.current.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [dropdownRef, hoverTimeout]);



  return (
    <div ref={dropdownRef} type="button" id={id} className="relative" >
        <div className="rounded-full bg-white pr-4 pb-1 pt-1 pl-1 flex gap-2" >
            <Image src="/images/aleksandr-surnin-uV07XhI2m7o-unsplash.jpg" width={35} height={35} className="rounded-full aspect-square object-cover" />
      <ArrowLabel label={"Jhon Doe"} iconStatus={false} labelClass={"text-sm-medium"} />
      </div>
      {isDropdownOpen && <ModalBoxForNav>{children}</ModalBoxForNav>}
    </div>
  );
}
