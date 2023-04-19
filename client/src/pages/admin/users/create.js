import {
  SellerDashboardLayout,
  IslandDashboard,
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AdminUserCreate() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    password: "",
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

  const onSubmit = (e) => {
    console.log("onSubmit", e, validateMode);
    handleSubmit({
        form: form,
      //  dispatch: dispatch,
        //actionToDispatch: "user/create",
        setErrors: setErrors,
        validateMode: validateMode,
        formRef: formRef.current,
    }
    );
  };

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

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

  return (
    <>
      <main>
        <SellerDashboardLayout
          topBarMode="action"
          topBarMessage="Editar usuario"
          topBarButtonLabel="Guardar cambios"
          onClick={onSubmit}
        >
          <IslandDashboard className="flex flex-col gap-5 xl:gap-8 ">
            <form ref={formRef}>
              <FormContainer>
                <FormRow>
                  <FormColumn className="w-full">
                    <Input
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="First Name:"
                      // defaultValue={props.defaultValue}
                      type="text"
                      onChange={handleInput}
                      error={error.firstName}
                    />
                    <Input
                      name={"lastName"}
                      id={"lastName"}
                      label={"Last Name"}
                      placeholder={"Last Name:"}
                      // defaultValue={props.defaultValue}
                      type={"text"}
                      onChange={handleInput}
                      error={error.lastName}
                    />
                    <Input
                      name={"username"}
                      label={"UserName"}
                      placeholder={"UserName:"}
                      // defaultValue={props.defaultValue}
                      type={"text"}
                      onChange={handleInput}
                      error={error.username}
                    />
                  </FormColumn>
                  <FormColumn className="w-full">
                    <Input
                      name={"password"}
                      label={"password"}
                      placeholder={"password:"}
                      // defaultValue={props.defaultValue}
                      type={"password"}
                      onChange={handleInput}
                      error={error.password}
                    />
                    <Input
                      name={"email"}
                      label={"Email"}
                      placeholder={"Email:"}
                      // defaultValue={props.defaultValue}
                      type={"email"}
                      onChange={handleInput}
                      error={error.email}
                    />
                    <SwitchForm
                      label="SoftDelete"
                      name="softDelete"
                      nameInput="softDelete"
                      // defaultValue={false}
                      onChange={handleInput}
                      arrayButtons={arraySoftDelete.arrayButtons}
                      error={error.softDelete}
                    />
                  </FormColumn>
                </FormRow>
              </FormContainer>
            </form>
          </IslandDashboard>
        </SellerDashboardLayout>
      </main>
    </>
  );
}
