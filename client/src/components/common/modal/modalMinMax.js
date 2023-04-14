import React, { useState, useRef, useEffect } from "react";
import { MiniModalBox, Input, ArrowLabel, MinMax } from "@/components";

export default function ModalMinMax({
  seleccionados,
  setSeleccionados,
  label,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div ref={dropdownRef} type="button" id="dropdown">
      <ArrowLabel label={label} handleDropdownClick={handleDropdownClick} iconStatus={true} />
      <div className="absolute">
        {isDropdownOpen && (
          <MiniModalBox>
            <MinMax
              seleccionados={seleccionados}
              setSeleccionados={setSeleccionados}
              label={label}
            />
          </MiniModalBox>
        )}
      </div>
    </div>
  );
}
