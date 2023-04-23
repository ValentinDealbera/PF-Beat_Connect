import React, { useState, useRef, useEffect } from "react";
import {
  MiniModalBox,
  ArrowLabel,
  CheckboxGroup,
  ModalBoxForNav,
  MiniCart,
  ClientImage,
} from "@/components";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function UserBoxNav({ children, id }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  console.log("hoverTimeout", hoverTimeout);
  console.log("isDropdownOpen", isDropdownOpen);
  console.log("dropdownRef", dropdownRef);

  // useEffect(() => {
  //   console.log("useEffect");
  //   if (dropdownRef.current === null) return;

  //   function handleMouseLeave() {
  //     if (dropdownRef.current === null) return;
  //     setHoverTimeout(
  //       setTimeout(() => {
  //         setIsDropdownOpen(false);
  //       }, 100) // Change this value to adjust the delay before closing the modal on hover leave
  //     );
  //   }
  //   function handleMouseEnter() {
  //     console.log("dropdownRef.current.id", dropdownRef.current.id);
  //     if (dropdownRef.current === null) return;
  //     if (hoverTimeout) {
  //       clearTimeout(hoverTimeout);
  //       setHoverTimeout(null);
  //     }
  //     //si estamos sobre el elemento que tiene el id recibido por props, debemos abrir el dropdown
  //     if (id === dropdownRef.current.id){ setIsDropdownOpen(true); console.log("abrimos")}
  //     else {console.log("no abrimos", id)}
  //   }
  //   if (dropdownRef.current === null) {console.log("dropdownRef.current === null"); return; }
  //   console.log("dropdownRef.current dif a null", dropdownRef.current);
  //   dropdownRef.current.addEventListener("mouseenter", handleMouseEnter);
  //   dropdownRef.current.addEventListener("mouseleave", handleMouseLeave);
  //   return () => {
  //     if (dropdownRef.current === null) {console.log("dropdownRef.current 2 === null"); return;}
  //     console.log("dropdownRef.current 2 dif a null", dropdownRef.current);
  //     dropdownRef.current.removeEventListener("mouseenter", handleMouseEnter);
  //     dropdownRef.current.removeEventListener("mouseleave", handleMouseLeave);
  //     if (hoverTimeout) {
  //       clearTimeout(hoverTimeout);
  //     }
  //   };
  // }, [dropdownRef, hoverTimeout]);

  const client = useSelector((state) => state.client.client);

  const { isLogged } = useSelector((state) => state.client);

  useEffect(() => {
    console.log("isLogged", isDropdownOpen);
  }, [isDropdownOpen]);

const handleDropdown = (state) => {
  setIsDropdownOpen(state);
}


  return (
    <>
      <div
        className=" flex flex-row items-center justify-center gap-4 align-middle"

      >
        <MiniCart />
        {isLogged ? (
          <div ref={dropdownRef} type="button" id={id} className="relative"
          onMouseEnter={() => handleDropdown(true)}
          onMouseLeave={() => handleDropdown(false)}
          >
            <div className="flex gap-2 rounded-full border bg-white pb-1 pl-1 pr-1 pt-1 lg:pr-4">
              <ClientImage client={client} height={35} width={35} />
              <div className="hidden lg:flex">
                <ArrowLabel
                  label={`${client.firstName}`}
                  iconStatus={false}
                  labelClass={"text-sm-regular text-black "}
                />
              </div>
            </div>
            {isDropdownOpen && <ModalBoxForNav>{children}</ModalBoxForNav>}
          </div>
        ) : (
          <Link href="/auth">
            <div className="flex gap-2 rounded-full bg-red-700 pb-2 pl-4 pr-4 pt-2 text-sm font-semibold text-white">
              <p>Iniciar sesión</p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
