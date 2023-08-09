import React, { useState, useRef, useEffect } from "react";
import {
  MiniModalBox,
  ArrowLabel,
  CheckboxGroup,
  ModalBoxForNav,
} from "@/components";

export default function ModalOnHover({
  seleccionados,
  setSeleccionados,
  children,
  labelClass,

  iconStatus,
  label,
  values,
}) {
  const id = "modalOnHover";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  useEffect(() => {
    if (dropdownRef.current === null) return;
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
      if (dropdownRef.current === null) return;
      dropdownRef.current.removeEventListener("mouseenter", handleMouseEnter);
      dropdownRef.current.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [dropdownRef, hoverTimeout]);



  return (
    <div ref={dropdownRef} type="button"  className="">
      <ArrowLabel
        label={label}
        iconStatus={iconStatus}
        labelClass={labelClass}
      />

      {isDropdownOpen && <ModalBoxForNav>{children}</ModalBoxForNav>}
    </div>
  );
}
