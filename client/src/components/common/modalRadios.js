import React, { useState, useRef, useEffect } from "react";

export default function MultiRadios({
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

  return (
    <div ref={dropdownRef} type="button" id="dropdown">
      <button onClick={handleDropdownClick} type="button">
        {label}
      </button>
      <div className="absolute flex flex-col">
        {isDropdownOpen &&
          values.map((valor) => (
            <div>
              <input
                type="radio"
                id={valor}
                name="radio"
                value={valor}
                checked={seleccionados === valor}
                onChange={(e) => setSeleccionados(e.target.value)}
              />
              <label htmlFor={valor}>{valor}</label>
            </div>
          ))}
      </div>
    </div>
  );
}
