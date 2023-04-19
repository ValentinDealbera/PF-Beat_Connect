import {
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

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminPostUser, adminEditUser } from "@/redux/slices/admin";
import { useRouter } from "next/router";

const AdminCreateUserForm = forwardRef((props, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues =
    useSelector((state) => state.admin.currentEditUser) || {};
  const mode = props.mode;

  console.log("defaultValues", defaultValues);

  try {
    const [form, setForm] = useState({
      username: `${mode === "edit" ? defaultValues.username : ""}`,
      firstName: `${mode === "edit" ? defaultValues.firstName : ""}`,
      lastName: `${mode === "edit" ? defaultValues.lastName : ""}`,
      image: "",
      email: `${mode === "edit" ? defaultValues.email : ""}`,
      password: `${mode === "edit" ? defaultValues.password : ""}`,
      id: `${mode === "edit" ? defaultValues._id : ""}`,
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
      console.log("onSubmit", e, validateMode);
      const actionToDispatch = mode === "edit" ? adminEditUser : adminPostUser;
      try {
        await handleSubmit({
          form: form,
          actionToDispatch: actionToDispatch,
          dispatch: dispatch,
          setErrors: setErrors,
          validateMode: validateMode,
          formRef: formRef.current,
        });
        router.push("/admin/users");
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      setErrors(validateForm(form, fieldsToValidate, validateMode));
    }, [form, fieldsToValidate]);

    useImperativeHandle(ref, () => ({
      submit: () => {
        // formRef.current.submit();
        onSubmit();
      },
    }));

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
  } catch (error) {
    console.error(error);
  }

  try {
    return (
      <form ref={formRef} onSubmit={onSubmit}>
        <FormContainer>
          <FormRow>
            <FormColumn className="w-full">
              <Input
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="First Name:"
                defaultValue={mode === "edit" ? defaultValues.firstName : ""}
                type="text"
                onChange={handleInput}
                error={error.firstName}
              />
              <Input
                name={"lastName"}
                id={"lastName"}
                label={"Last Name"}
                placeholder={"Last Name:"}
                defaultValue={mode === "edit" ? defaultValues.lastName : ""}
                type={"text"}
                onChange={handleInput}
                error={error.lastName}
              />
              <Input
                name={"username"}
                label={"UserName"}
                placeholder={"UserName:"}
                defaultValue={mode === "edit" ? defaultValues.username : ""}
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
                defaultValue={mode === "edit" ? defaultValues.password : ""}
                type={"password"}
                onChange={handleInput}
                error={error.password}
              />
              <Input
                name={"email"}
                label={"Email"}
                placeholder={"Email:"}
                defaultValue={mode === "edit" ? defaultValues.email : ""}
                type={"email"}
                onChange={handleInput}
                error={error.email}
              />
              <SwitchForm
                label="SoftDelete"
                name="softDelete"
                nameInput="softDelete"
                defaultValue={mode === "edit" ? defaultValues.softDelete : ""}
                onChange={handleInput}
                arrayButtons={arraySoftDelete.arrayButtons}
                error={error.softDelete}
              />
            </FormColumn>
          </FormRow>
        </FormContainer>
      </form>
    );
  } catch (error) {
    console.error(error);
  }
});

export default AdminCreateUserForm;
