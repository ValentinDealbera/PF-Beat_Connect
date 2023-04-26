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
export default function EditClientForm(props) {
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
              label="Nombre"
              placeholder="Nombre"
              defaultValue={mode === "edit" ? defaultValues.firstName : ""}
              type="text"
              onChange={handleInput}
              error={error.firstName}
            />
            <Input
              name={"email"}
              label={"Email"}
              placeholder={"Email"}
              defaultValue={mode === "edit" ? defaultValues.email : ""}
              type={"email"}
              onChange={handleInput}
              error={error.email}
            />
            <Input
              name={"username"}
              label={"Nombre de usuario"}
              placeholder={"Nombre de usuario"}
              defaultValue={mode === "edit" ? defaultValues.userName : ""}
              type={"text"}
              onChange={handleInput}
              error={error.username}
            />
            <Input
              name="image"
              label="Imagen de perfil"
              placeholder="Imagen de perfil"
              type="file"
              onChange={handleInput}
              error={error.backImage}
            />
          </FormColumn>
          <FormColumn className="w-full">
            <Input
              name={"lastName"}
              id={"lastName"}
              label={"Apellido"}
              placeholder={"Apellido"}
              defaultValue={mode === "edit" ? defaultValues.lastName : ""}
              type={"text"}
              onChange={handleInput}
              error={error.lastName}
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
              label="Imagen de portada"
              placeholder="Imagen de portada"
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
          Guardar
        </button>
      </FormContainer>
    </form>
  );
}
