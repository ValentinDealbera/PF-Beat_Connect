import React, { useState, useEffect, useRef } from "react";

function Select({ valores, setSeleccionados, seleccionados, label, type }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      } else {
      }
    }

    // Agregar evento de clic al elemento 'window'
    window.addEventListener("click", handleClickOutside);

    // Eliminar evento de clic cuando se desmonta el componente
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  function handleDropdownClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }
  if (type === "multiSelect") {
    return (
      <div ref={dropdownRef} type="button" id="dropdown">
        <div id="dropdown-content">
          <button onClick={() => handleDropdownClick()} type="button">
            {seleccionados.length > 0
              ? seleccionados
                  .slice(0, 2)
                  .map((v) => v.label)
                  .join(", ")
                  .slice(0, 50) + (seleccionados.length > 1 ? "..." : "")
              : label || "Seleccionar ⌄"}
          </button>
          <>
            {isDropdownOpen && (
              <div className="absolute p-1.5 background-neutral-white rounded-lg" id="dropdown-content">
                {valores.map((valor, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={valor.value}
                      checked={seleccionados.some(
                        (v) => v.value === valor.value
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSeleccionados([
                            ...seleccionados,
                            { label: valor.label, value: valor.value },
                          ]);
                        } else {
                          setSeleccionados(
                            seleccionados.filter((v) => v.value !== valor.value)
                          );
                        }
                      }}
                    />
                    <label>{valor.label}</label>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      </div>
    );
  }
  if(type === 'prices') {
    return (
        <div ref={dropdownRef} type="button" id="dropdown">
        <div id="dropdown-content">
          <button onClick={() => handleDropdownClick()} type="button">
            {label + " ⌄" || "Seleccionar ⌄"}
          </button>
          <>
            {isDropdownOpen && (
                <div className="flex flex-col absolute background-neutral-white p-1.5 rounded-lg">
                    <div className="flex flex-row gap-2">
                        <input type='checkbox' checked={seleccionados.filter} onChange={(e)=>setSeleccionados({...seleccionados, filter: !seleccionados.filter})}/> <label> Filter by {label}</label>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input className="w-16" value={seleccionados.min} min={0} onChange={(e)=>setSeleccionados({...seleccionados, min: e.target.value})} type="number" placeholder="min."/>
                        <span> - </span>
                        <input className="w-16"  value={seleccionados.max} min={0} onChange={(e)=>setSeleccionados({...seleccionados, max: e.target.value})} type="number" placeholder="max."/>
                    </div>
                </div>
              )}
          </>
        </div>
      </div>
    )
  }
  if (!type){
    return (
        <div>
        <select style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }} onChange={(e)=>setSeleccionados(e.target.value)} className="bg-white" defaultValue='none'>
            <option disabled value='none'>{label} ⌄</option>
        {valores.map(e=>{
            return (
                <option key={e.value} value={e.value}>
                    {e.label}
                </option>
            )
        })}
        </select>
        </div>
    )
  }
}

export default Select;
