import React, { useState } from "react";

export default function SoftDeleteSwitch(props) {
  const [state, setState] = useState(props.state);
  const isInactive = state === "inactived";


  const handleOnButtonClick = (e) => {
    e.preventDefault();
    setState("actvived");
  };

  const handleOffButtonClick = (e) => {
    e.preventDefault();
    setState("inactived");
  };

  return (
    <label
      htmlFor={props.name}
      className="font-britanicaBold text-sm-medium flex min-w-0 flex-grow flex-col"
    >
      SoftDelete
      <div className="border-radius-estilo2 flex flex-row items-start justify-start gap-0 overflow-hidden">
        <button
          onClick={handleOnButtonClick}
          className={`border-radius-estilo2 text-sm-semibold border border-slate-200  px-4 py-2 ${
            isInactive
              ? "color-neutral-black-900 bg-white"
              : "background-primary-red-700 color-neutral-white"
          }
          `}
          style={{
            borderRadius: "0.75rem 0 0 0.75rem",
            borderWidth: "1px",
          }}
        >
          On
        </button>
        <button
          onClick={handleOffButtonClick}
          className={`border-radius-estilo2 text-sm-semibold border border-slate-200 px-4 py-2 ${
            isInactive
              ? "background-primary-red-700 color-neutral-white"
              : "color-neutral-black-900 bg-white"
          }`}
          style={{
            borderRadius: "0 0.75rem 0.75rem 0",
            borderWidth: "1px",
          }}
        >
          Off
        </button>
      </div>
    </label>
  );
}
