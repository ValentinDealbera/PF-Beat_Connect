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
  const client = useSelector(
    (state) => state.client.authSession.session.current
  );
  const { isLogged } = useSelector((state) => state.client.authSession.auth);

  useEffect(() => {}, [isDropdownOpen]);

  const handleDropdown = (state) => {
    setIsDropdownOpen(state);
  };

  return (
    <>
      <div className=" flex flex-row items-center justify-center gap-4 align-middle">
        <MiniCart />
        {isLogged ? (
          <div
            ref={dropdownRef}
            type="button"
            id={id}
            className="relative"
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
