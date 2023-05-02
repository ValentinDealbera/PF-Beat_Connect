import {
  SellerDashboardLayout,
  IslandDashboard,
  FormContainer,
  FormColumn,
  FormRow,
  Input,
  Select,
  SwitchForm,
  TextArea,
  AdminCreateUserForm,
  AdminCreateReviewForm,
  Head,
} from "@/components";

import {
  handleSelectChange,
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchGenres } from "@/redux/slices/filters";
import { useTranslation } from "react-i18next";

export default function SellerDashboardOverview() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "review";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const [t] = useTranslation("global");

  const [form, setForm] = useState({
    createdBy: "",
    beat: "",
    comment: "",
    title: "",
    rating: "",
    softDelete: false,
  });

  console.log("data para el form", form);


  const handleInput = (e) => {
    handleInputChange(
      e,
      fieldsToValidate,
      setFieldsToValidate,
      form,
      setForm,
      validateMode
    );
  };

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  const onSubmit = (e) => {
    console.log("onSubmit", e, validateMode);
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
  const childRef = useRef(null);

  const handleExternalSubmit = () => {
    childRef.current.submit();
  };


  return (
    <>
      <Head title="Crear rev" />
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
    </>
  );
}
