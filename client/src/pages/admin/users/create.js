import {
  SellerDashboardLayout,
  IslandDashboard,
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
  AdminCreateUserForm,
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
import { useTranslation } from "react-i18next";

export default function AdminUserCreate() {
  const [t] = useTranslation("global");
  const childRef = useRef(null);

  const handleExternalSubmit = () => {
    childRef.current.submit();
  };

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage={t("dashboardNav.createUser")}
          topBarButtonLabel={t("adminBeatsCreate.t1")}
          onClick={handleExternalSubmit}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <AdminCreateUserForm mode="create" ref={childRef} />
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
