import React, { useState, useRef, useEffect } from "react";
import { Checkbox, MiniModalBox, ArrowLabel, CheckboxGroup } from "@/components";
import Image from "next/image";

export default function MultiSelect({
  seleccionados,
  setSeleccionados,
  label,
  values,
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

  console.log(values);

  return (
    <div ref={dropdownRef} type="button" id="dropdown">
      <ArrowLabel label={label} handleDropdownClick={handleDropdownClick} />


      {isDropdownOpen && (
        <MiniModalBox>
         
  
            <CheckboxGroup values={values} seleccionados={seleccionados} setSeleccionados={setSeleccionados} label={label} /> 
       
        </MiniModalBox>
      )}
    </div>
  );
}
