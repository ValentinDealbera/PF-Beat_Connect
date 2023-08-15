"use client";
import {
  SellerDashboardLayout,
  IslandDashboard,
  AdminCreateReviewForm,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchGenres } from "@/redux/slices/filters";
import { useTranslation } from "react-i18next";

export default function SellerDashboardOverview() {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>();
  const validateMode = "review";
  const [fieldsToValidate, setFieldsToValidate] = useState([]) as any;
  const [error, setErrors] = useState({}) as any;
  const [t] = useTranslation("global");

  const [form, setForm] = useState({
    createdBy: "",
    beat: "",
    comment: "",
    title: "",
    rating: "",
    softDelete: false,
  });

  const handleInput = (e: any) => {
    handleInputChange(e, fieldsToValidate, setFieldsToValidate, form, setForm);
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  const onSubmit = (e: any) => {
    handleSubmit({
      form: form,
      //  dispatch: dispatch,
      //actionToDispatch: "user/create",
      setErrors: setErrors,
      validateMode: validateMode,
      formRef: formRef.current,
    });
  };

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: true,
          });
        },
      },
      {
        text: "No",
        active: !form.softDelete,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: false,
          });
        },
      },
    ],
  };
  //----------------------------
  const childRef = useRef<any>();

  const handleExternalSubmit = () => {
    childRef?.current?.submit();
  };

  return (
    <main>
      <SellerDashboardLayout
        topBarMode="action"
        topBarMessage={t("dashboardNav.createReview")}
        topBarButtonLabel={t("adminBeatsCreate.t1")}
        onClick={handleExternalSubmit}
      >
        <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
          <AdminCreateReviewForm mode="create" ref={childRef} />
        </IslandDashboard>
      </SellerDashboardLayout>
    </main>
  );
}
