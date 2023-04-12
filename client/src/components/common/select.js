import { BeatBottomSheet } from "@/components";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

function Select({
  valores,
  setSeleccionados,
  seleccionados,
  label,
  type,
  viewPort,
  click,
}) {
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
    if (viewPort === "mobile") {
      return (
        <div ref={dropdownRef} type="button" id="dropdown">
          <div id="dropdown-content">
            <button
              className="text-base"
              onClick={() => handleDropdownClick()}
              type="button"
            >
              {label || "Seleccionar"}
            </button>
            <>
              {isDropdownOpen && (
                <BeatBottomSheet>
                  <div className="gap-estilo3 padding-x-estilo2 flex flex-col">
                  <div className="flex flex-row justify-between">
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
                
              >
                <Image height={15} width={15} src="/icon/arrow-down.svg"/>
              </button>
              <button
                className="text-lg absolute left-1/2 transform -translate-x-1/2 font-bold"
              >
                {label}
              </button>
              <button
                onClick={() => {
                }}
              >
                Reset
              </button>
              </div>
                <div
                  className="background-neutral-white rounded-lg p-1.5 flex flex-col gap-estilo3"
                  id="dropdown-content"
                >
                  {valores.map((valor, index) => (
                    <div key={index}>
                      <input
                        className="text-base"
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
                              seleccionados.filter(
                                (v) => v.value !== valor.value
                              )
                            );
                          }
                        }}
                      />
                      <label className="text-lg" > {valor.label}</label>
                    </div>
                  ))}
                </div>
                </div>
                </BeatBottomSheet>
              )}
            </>
          </div>
        </div>
      );
    }
    return (
      <div ref={dropdownRef} type="button" id="dropdown">
        <div id="dropdown-content">
          <button onClick={() => handleDropdownClick()} type="button">
            {label || "Seleccionar"}
          </button>
          <>
            {isDropdownOpen && (
              <div
                className="background-neutral-white absolute rounded-lg p-1.5"
                id="dropdown-content"
              >
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

  if (type === "prices") {
    if (viewPort === "mobile") {
      return (
        <div ref={dropdownRef} type="button" id="dropdown">
          <div id="dropdown-content">
            <button onClick={() => handleDropdownClick()} type="button">
              {label}
            </button>
            <>
              {isDropdownOpen && (
                <BeatBottomSheet>
                <div className="gap-estilo3 padding-x-estilo2 flex flex-col">
                <div className="flex flex-row justify-between">
            <button
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              
            >
              <Image height={15} width={15} src="/icon/arrow-down.svg"/>
            </button>
            <button
              className="text-lg absolute left-1/2 transform -translate-x-1/2 font-bold"
            >
              {label}
            </button>
            <button
              onClick={() => {
              }}
            >
              Reset
            </button>
            </div>
                <div className="background-neutral-white flex flex-col rounded-lg p-1.5 gap-estilo3">
                  <div className="flex flex-row justify-center gap-2">
                    <input
                      type="checkbox"
                      checked={seleccionados.filter}
                      onChange={(e) =>
                        setSeleccionados({
                          ...seleccionados,
                          filter: !seleccionados.filter,
                        })
                      }
                    />{" "}
                    <label className="text-lg"> Filter by {label}</label>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <input
                    style={{ "-webkit-appearance": "none", margin: 0, "-moz-appearance": "textfield" }}
                      className="w-16 h-10 border rounded-lg border-neutral-950"
                      value={seleccionados.min}
                      min={0}
                      onChange={(e) =>
                        setSeleccionados({
                          ...seleccionados,
                          min: e.target.value,
                        })
                      }
                      type="number"
                      placeholder="min."
                    />
                    <span> - </span>
                    <input
                    style={{ "-webkit-appearance": "none", margin: 0, "-moz-appearance": "textfield" }}
                      className="w-16 h-10 border rounded-lg border-neutral-950"
                      value={seleccionados.max}
                      min={0}
                      onChange={(e) =>
                        setSeleccionados({
                          ...seleccionados,
                          max: e.target.value,
                        })
                      }
                      type="number"
                      placeholder="max."
                    />
                  </div>
                </div>
                </div>
                </BeatBottomSheet>
              )}
            </>
          </div>
        </div>
      );
    }
    return (
      <div ref={dropdownRef} type="button" id="dropdown">
        <div id="dropdown-content">
          <button onClick={() => handleDropdownClick()} type="button">
            {label}
          </button>
          <>
            {isDropdownOpen && (
              <div className="background-neutral-white absolute flex flex-col rounded-lg p-1.5">
                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    checked={seleccionados.filter}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        filter: !seleccionados.filter,
                      })
                    }
                  />{" "}
                  <label> Filter by {label}</label>
                </div>
                <div className="flex flex-row gap-2">
                  <input
                    className="w-16"
                    value={seleccionados.min}
                    min={0}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        min: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="min."
                  />
                  <span> - </span>
                  <input
                    className="w-16"
                    value={seleccionados.max}
                    min={0}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        max: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="max."
                  />
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    );
  }
  
  if (!type) {
    if (viewPort === "mobile") {
      return (
        <div ref={dropdownRef} id="dropdown">
          <div id="dropdown-content">
            <button
              onClick={() => handleDropdownClick()}
              type="button"
            ></button>
            <>
              {click && (
                <div
                  className="gap-estilo3 background-neutral-white flex flex-col rounded-lg"
                  id="dropdown-content"
                >
                  {valores.map((valor, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        value={valor.value}
                        checked={seleccionados === valor.value}
                        onChange={(e) => {
                          setSeleccionados(e.target.value);
                        }}
                      />
                      <label className="text-lg"> {valor.label}</label>
                      <br />
                    </div>
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      );
    }
    return (
      <div ref={dropdownRef} type="button" id="dropdown">
        <div id="dropdown-content">
          <button onClick={() => handleDropdownClick()} type="button">
            {seleccionados || label}
          </button>
          <>
            {isDropdownOpen && (
              <div
                className="background-neutral-white absolute rounded-lg p-1.5"
                id="dropdown-content"
              >
                {valores.map((valor, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      value={valor.value}
                      checked={seleccionados === valor.value}
                      onChange={(e) => {
                        setSeleccionados(e.target.value);
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
}

export default Select;
