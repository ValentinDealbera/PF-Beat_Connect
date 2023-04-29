import { FormColumn, FormContainer, FormRow, Input } from "@/components";
import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";
import { useState, useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClient } from "@/redux/slices/client/authSession";
import { useRouter } from "next/router";
import { validationEditUser } from "@/components/validation/client/editUser";
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

export default function EditClientForm(props) {
  const [t, i18n] = useTranslation("global");
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});

  const defaultValues =
    useSelector((state) => state.client.authSession.session.current) || {};
  const id = useSelector(
    (state) => state.client.authSession.session.current._id
  );

  const mode = props.mode;

  const [form, setForm] = useState({
    username: `${mode === "edit" ? defaultValues.userName : ""}`,
    firstName: `${mode === "edit" ? defaultValues.firstName : ""}`,
    lastName: `${mode === "edit" ? defaultValues.lastName : ""}`,
    image: "",
    email: `${mode === "edit" ? defaultValues.email : ""}`,
    password: "",
    id: id,
    bio: `${mode === "edit" ? defaultValues.bio : ""}`,
    backImage: "",
  });
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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formErrors = validationEditUser(form, "*");
      if (Object.keys(formErrors).length === 0) {
        console.log("DESPACHADO", form);
        await dispatch(editClient(form));
        formRef.current.reset();
        router.push("/client");
      } else {
        setErrors(formErrors);
        console.log("form Error", formErrors);
        throw new Error("Form Error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <FormContainer>
        <FormRow>
          <FormColumn className="w-full">
            <Input
              id="firstName"
              name="firstName"
              label={t("settingsClient.t1")}
              placeholder={t("settingsClient.t1")}
              defaultValue={mode === "edit" ? defaultValues.firstName : ""}
              type="text"
              onChange={handleInput}
              error={error.firstName}
            />
            <Input
              name={"email"}
              label={t("settingsClient.t2")}
              placeholder={t("settingsClient.t2")}
              defaultValue={mode === "edit" ? defaultValues.email : ""}
              type={"email"}
              onChange={handleInput}
              error={error.email}
            />
            <Input
              name={"username"}
              label={t("settingsClient.t3")}
              placeholder={t("settingsClient.t3")}
              defaultValue={mode === "edit" ? defaultValues.userName : ""}
              type={"text"}
              onChange={handleInput}
              error={error.username}
            />
            <Input
              name="image"
              label={t("settingsClient.t4")}
              placeholder={t("settingsClient.t4")}
              type="file"
              onChange={handleInput}
              error={error.backImage}
            />
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              name={"lastName"}
              id={"lastName"}
              label={t("settingsClient.t5")}
              placeholder={t("settingsClient.t5")}
              defaultValue={mode === "edit" ? defaultValues.lastName : ""}
              type={"text"}
              onChange={handleInput}
              error={error.lastName}
            />
            <Input
              id="bio"
              name="bio"
              label={t("settingsClient.t6")}
              placeholder={t("settingsClient.t6")}
              defaultValue={mode === "edit" ? defaultValues.bio : ""}
              type="text"
              onChange={handleInput}
              error={error.bio}
            />
            <Input
              name="backImage"
              label={t("settingsClient.t7")}
              placeholder={t("settingsClient.t7")}
              type="file"
              onChange={handleInput}
              error={error.backImage}
            />
          </FormColumn>
        </FormRow>
        <button
          type="submit"
          className="background-primary-red-700 color-neutral-white w-max rounded-full px-5 py-3 text-sm font-semibold"
        >
            {t("settingsClient.tosave")}
        </button>
      </FormContainer>
    </form>
  );
}
