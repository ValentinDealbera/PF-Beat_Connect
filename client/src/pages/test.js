import {
  Main,
  SellerDashboardLayout,
  IslandDashboard,
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
  AdminCreateUserForm,
  ClientDashboardEdit,
  UserEditForm,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPostUser } from "@/redux/slices/admin";
import { useRouter } from "next/router";

export default function Test(props) {
  const childRef = useRef(null);

  const handleExternalSubmit = () => {
    childRef.current.submit();
  };

  return (
    <Main>
      {/* <ClientDashboardEdit
        topBarMode="action"
        topBarMessage="Editar usuario"
        topBarButtonLabel="Guardar cambios"
        onClick={handleExternalSubmit}
      > */}
        <UserEditForm mode="edit" ref={childRef} />
      {/* </ClientDashboardEdit> */}
    </Main>
  );
}
