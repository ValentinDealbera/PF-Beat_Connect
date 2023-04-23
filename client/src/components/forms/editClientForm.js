import { FormColumn, FormContainer, FormRow, Input } from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editClient } from "@/redux/slices/client";
import { useRouter } from "next/router";

export default function EditClientForm(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "user";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues = useSelector((state) => state.client.editClient) || {};
  const id = useSelector((state) => state.client.client._id);
  console.log("----------------", id);
  const mode = props.mode;

  console.log("defaultValues", defaultValues);

  const [form, setForm] = useState({
    username: `${mode === "edit" ? defaultValues.username : ""}`,
    firstName: `${mode === "edit" ? defaultValues.firstName : ""}`,
    lastName: `${mode === "edit" ? defaultValues.lastName : ""}`,
    image: "",
    email: `${mode === "edit" ? defaultValues.email : ""}`,
    password: `${mode === "edit" ? defaultValues.password : ""}`,
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
    const actionToDispatch = editClient;
    try {
      await handleSubmit({
        form: form,
        actionToDispatch: actionToDispatch,
        dispatch: dispatch,
        setErrors: setErrors,
        validateMode: validateMode,
        formRef: formRef.current,
      });
      router.push("/client");
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
            <Input
              id="bio"
              name="bio"
              label="Bio"
              placeholder="Bio:"
              defaultValue={mode === "edit" ? defaultValues.bio : ""}
              type="text"
              onChange={handleInput}
              error={error.bio}
            />
            <Input
              name="backImage"
              label="Cover Image"
              placeholder="Cover Image:"
              type="file"
              onChange={handleInput}
              error={error.backImage}
            />
          </FormColumn>
        </FormRow>
      </FormContainer>
      <button type="submit">Modificar</button>
    </form>
  );
}
