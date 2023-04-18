import React, { useState } from "react";

export default function SwitchForm(props) {
    const [state, setState] = useState(props.state);
    const isSeller = state === "seller";
  
    console.log("switch", state);
  
    const handleOnButtonClick = (e) => {
      e.preventDefault();
      setState("buyer");      
    };
  
    const handleOffButtonClick = (e) => {
      e.preventDefault();
      setState("seller");      
    };
  
    return (
        <label
        htmlFor={props.name}
        className="flex min-w-0 flex-grow flex-col font-britanicaBold text-sm-medium"
      >
        User
        <div className="flex flex-row gap-0 overflow-hidden border-radius-estilo2 items-start justify-start">
        <button
          onClick={handleOnButtonClick}
          className={`px-4 py-2 border-radius-estilo2 text-sm-semibold  border border-slate-200 ${
            isSeller ? "bg-white color-neutral-black-900" : "background-primary-red-700 color-neutral-white"
          }
          `}
          style={{
            borderRadius: "0.75rem 0 0 0.75rem",
            borderWidth: "1px",
          }}
        >
          Client
        </button>
        <button
          onClick={handleOffButtonClick}
          className={`px-4 py-2 border-radius-estilo2 text-sm-semibold border border-slate-200 ${
            isSeller ? "background-primary-red-700 color-neutral-white" : "bg-white color-neutral-black-900"
          }`}
          style={{
            borderRadius: "0 0.75rem 0.75rem 0",
            borderWidth: "1px",
          }}
        >
          Seller
        </button>
        </div>
      </label>
    );
  }
  