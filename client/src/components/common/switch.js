import React, { useState } from "react";

export default function Switch(props) {
    const [state, setState] = useState(props.state);
    const isInactive = state === "inactive";
  
    console.log("switch", state);
  
    const handleOnButtonClick = () => {
      setState("active");      
    };
  
    const handleOffButtonClick = () => {
      setState("inactive");      
    };
  
    return (
        <label
        htmlFor={props.name}
        className="flex min-w-0 flex-grow flex-col font-britanicaBold text-sm-medium"
      >
        Active
        <div className="flex flex-row gap-0 overflow-hidden border-radius-estilo2 items-start justify-start">
        <button
          onClick={handleOnButtonClick}
          className={`px-4 py-2 border-radius-estilo2 text-sm-semibold  border border-slate-200 ${
            isInactive ? "bg-white color-neutral-black-900" : "background-primary-red-700 color-neutral-white"
          }
          `}
          style={{
            borderRadius: "0.75rem 0 0 0.75rem",
            borderWidth: "1px",
          }}
        >
          ON
        </button>
        <button
          onClick={handleOffButtonClick}
          className={`px-4 py-2 border-radius-estilo2 text-sm-semibold border border-slate-200 ${
            isInactive ? "background-primary-red-700 color-neutral-white" : "bg-white color-neutral-black-900"
          }`}
          style={{
            borderRadius: "0 0.75rem 0.75rem 0",
            borderWidth: "1px",
          }}
        >
          OFF
        </button>
        </div>
      </label>
    );
  }
  